import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const logger: Logger = new Logger('Swagger');

  const options = new DocumentBuilder()
    .setTitle('Base example')
    .setDescription('The Base API description')
    .setVersion('1.0')
    .addTag('nest')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  logger.log(`Added swagger on endpoint /api`);
};
