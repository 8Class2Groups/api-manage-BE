import { Context } from 'egg';

export default (params?) => {
  return async function validate(ctx: Context<any>, next) {
    const { check, msg } = params || {};
    let value = ctx.request.body;
    if (ctx.method === "GET") {
      value = ctx.request.query;
    }
    // 不需要校验
    if (!check) {
      ctx.requestValue = value;
      return await next();
    };

    if (ctx.userInfo) {
      value = { ...value, ...ctx.userInfo };
    };

    try {
      ctx.validate(check, value);
      ctx.requestValue = value;
      await next();
    } catch (error) {
      ctx.body = {
        msg: `${msg}参数错误`
      }
    }
  }
}