import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  security: {
    enable: false
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
