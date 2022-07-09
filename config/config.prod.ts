import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

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
      host: "1.15.174.68",
      password: '',
      db: 0
    }
  }

  config.mongoose = {
    client: {
      url: 'mongodb://1.15.174.68:27017/admin',
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

  return config;
};
