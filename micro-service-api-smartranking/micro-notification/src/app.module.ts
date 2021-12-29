import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxymqModule } from './proxymq/proxymq.module';

@Module({
  imports: [ProxymqModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '381cc20f657f2f',
          pass: '1178bdd6397b93'
        }

      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
