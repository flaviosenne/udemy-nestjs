import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CustomExceptionsFilter } from './common/filters/http.exception.filter'

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new CustomExceptionsFilter())
  
  await app.listen(8080)
}
bootstrap();
