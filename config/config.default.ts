import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653295602527_9613';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  /* 自定义 token 的加密条件字符串 */
  config.jwt = {
    secret: 'test-egg-serve-jwt'
  }

  /* 邮件配置 */
  config.email = {
    host: 'smtp.qq.com', //邮件host
    name: '1375883312@qq.com', // 邮件名
    password: 'rqauvgkkcjzahgce',  //  vcamessage@163.com Vca123456  ,授权码登录
    // to:'184336166@qq.com,xxx@163.com' //发送给谁
  };

  config.redis = {
    client: {
      port: 6379,
      host:"127.0.0.1",
      //host: "1.15.174.68",
      password: '',
      db: 0
    }
  }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      //url: 'mongodb://1.15.174.68:27017/admin',
      options: {
        user: 'admin',
        pass: '123456',
        useUnifiedTopology: true//避免出现warning
      },
    }
  }

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  config.cluster = {
    listen: {
      port: 12222,
      hostname: '0.0.0.0',
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
