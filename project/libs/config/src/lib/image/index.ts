import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getServeStaticOptions } from './get-serve-static-options';
import { default as appConfig } from './config/app.config';
import { default as dbConfig } from './config/db.config';
import { default as jwtConfig } from './config/jwt.config';

const ENV_IMAGE_FILE_PATH = 'apps/image/.image.env';

export { appConfig, dbConfig, getServeStaticOptions };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig],
      envFilePath: ENV_IMAGE_FILE_PATH,
    }),
  ],
})
export class ImageConfigModule {}
