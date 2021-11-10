import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CustomExceptionsFilter} from './filters/http-exception.filter'
import * as momentTimezone from 'moment-timezone'
import {LoggingInterceptor }from './interceptors/logging.interceptor'
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new LoggingInterceptor,
    new TimeoutInterceptor)
  
  app.useGlobalFilters(new CustomExceptionsFilter())
  
  Date.prototype.toJSON = function(): any{
    return momentTimezone(this)
    .tz('America/Sao_Paulo')
    .format('YYY-MM-DD HH:mm:ss.SSS')
  } 

  await app.listen(8090);
}
bootstrap();
