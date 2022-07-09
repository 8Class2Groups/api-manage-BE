import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // config.mongoose = {
  //   client: {
  //     url: 'mongodb://127.0.0.1:27017/serve',
  //     options: {}
  //   }
  // }

  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: "127.0.0.1",
  //     password: '',
  //     db: 0
  //   }
  // }

  // config.mongoose = {
  //   client: {
  //     url: 'mongodb://127.0.0.1:27017/admin',
  //     options: {
  //       user: 'admin',
  //       pass: '123456',
  //       useUnifiedTopology: true//避免出现warning
  //     },
  //   }
  // }

  return config;
};
