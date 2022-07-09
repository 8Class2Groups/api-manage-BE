import { Context } from "egg"

export default () => {
  return async function tokenHandler(ctx: Context<any>, next) {
    const token = <string>ctx.request.header['x-auth-token'];
    if (token) {
      try {
        ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        ctx.userInfo = await ctx.service.dbRedis.get(token);
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          msg: '令牌过期, 请重新登录'
        };
        return;
      }
    }
    if (!token || (!ctx.userInfo)) {
      ctx.status = 401;
      ctx.body = {
        msg: '没有token, 尝试重新登录'
      };
      return;
    }

    await next()
  }
}