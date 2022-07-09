import { EMAIL_REDIS_KEY_TYPE } from '../chore/email.constant';
import { Context } from 'egg';

export default (type: EMAIL_REDIS_KEY_TYPE) => {
  return async function emailCodeCheck(ctx: Context<any>, next) {
    const params = ctx.request.body;
    const code = await ctx.service.dbRedis.get(`${params.username}${type}`);

    if (!params.hasOwnProperty('code')) {
      ctx.body = {
        msg: '验证码不存在'
      }
    }

    if (!code) {
      ctx.body = {
        msg: '验证码已过期'
      }
      return
    }

    if (code !== params.code) {
      ctx.body = {
        msg: '验证码错误'
      }
      return;
    }

    await next();
  }
}