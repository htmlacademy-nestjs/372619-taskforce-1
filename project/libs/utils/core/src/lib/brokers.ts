import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnection } from './helpers';

export const getRabbitMqOptions = () => ({
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    exchanges: [
      {
        name: config.get<string>('rabbitMq.exchange'),
        type: 'direct',
      },
    ],
    uri: getRabbitMQConnection({
      host: config.get<string>('rabbitMq.host'),
      password: config.get<string>('rabbitMq.password'),
      user: config.get<string>('rabbitMq.user'),
      port: config.get<string>('rabbitMq.port'),
    }),
    connectionInitOptions: { wait: true },
    enableControllerDiscovery: true,
  }),
});
