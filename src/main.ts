import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ipWhiteListMiddleWare } from './common/middlewares/ip-whitelist.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(ipWhiteListMiddleWare);

  const config = new DocumentBuilder()
    .setTitle('MMFonts')
    .setDescription('MMFonts api documentation!')
    .setVersion('1.0')
    .addBearerAuth()

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors();
  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
