import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {

    private readonly logger = new Logger(CustomExceptionsFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const request = context.getRequest()
        const response = context.getResponse()

        const status = 
        exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

        const message = 
        exception instanceof HttpException
        ? exception.getResponse()
        : exception

        this.logger.error(`Http Status: ${status} Erro Message: ${JSON.stringify(message)}`)
 
        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        })
    }

}