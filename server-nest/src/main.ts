import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { knex } from 'knex';
import { AppModule } from './app.module';

const pg = knex({
    client: 'pg',
    connection: {
        host: 'se2-e.compute.dtu.dk',
        port: 5432,
        user: 'lira',
        password: 'lira',
        database: 'liradb',
    },
    searchPath: ['knex', 'public', 'lira'],
});

pg.raw('SELECT 1')
    .then(() => {
        console.log('PostgreSQL connected');
    })
    .catch((e) => {
        console.log('PostgreSQL not connected');
        console.error(e);
    });

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('LiRA API')
        .setDescription('The LiRA API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3002);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
