import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {CustomExceptionsFilter} from './common/filters/http-exception.filter'
import {LoggingInterceptor }from './common/interceptors/logging.interceptor'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new LoggingInterceptor,
    new TimeoutInterceptor)
  
  app.useGlobalFilters(new CustomExceptionsFilter())
  
  await app.listen(8090);
}
bootstrap();
