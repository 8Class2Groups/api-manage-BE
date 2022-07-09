import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // config.mongoose = {
  //   client: {
  //     url: 'mongodb://127.0.0.1:27017/serve',
  //     options: {}
  //   }
  // }

  return config;
};
