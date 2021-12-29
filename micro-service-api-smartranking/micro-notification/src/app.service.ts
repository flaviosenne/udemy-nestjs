import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Challenge } from './interface/challenge.interface';
import { Player } from './interface/player.interface';
import { ClientProxySmartRanking } from './proxymq/client-proxy';
import { HTML_NOTIFICATION } from './static/html-notification-player';

@Injectable()
export class AppService {

  constructor(private readonly proxy: ClientProxySmartRanking,
    private readonly mailService: MailerService){}

  private readonly logger = new Logger(AppService.name)
  private readonly proxyAdminBackend = this.proxy.getClientProxyAdminBackEndInstance()

  async sendEmail(data: Challenge): Promise<void> {
    try{

      let playerId = ''

      data.players.forEach(player => {
        if(player != data.requester){
          playerId = player
        }
      })

      const playerAdversary: Player = await this.proxyAdminBackend.send('get-players',playerId).toPromise()

      const playerRequester: Player = await this.proxyAdminBackend.send('get-players',data.requester).toPromise()

      const markup = HTML_NOTIFICATION
      .replace(/#NAME_ADVERSARY/g, playerAdversary.name)
      .replace(/#NAME_REQUESTER/g, playerRequester.name)

      this.mailService.sendMail({
        to: playerAdversary.email,
        from: `"SMART RANKING" <api.smartranking@gmail.com>`,
        subject: 'Notificação de Desafio',
        html: markup
      })
      .then(result => this.logger.log(`send email: ${JSON.stringify(result)}`))
      .catch(error => this.logger.error(`error: ${JSON.stringify(error.message)}`))



    }catch(error){
      this.logger.error(`error: ${JSON.stringify(error.message)}`)
      throw new RpcException(error.msg)
    }
  }
}
