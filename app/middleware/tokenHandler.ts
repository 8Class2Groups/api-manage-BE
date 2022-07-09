import { Context } from "egg"

export default () => {
  return async function tokenHandler(ctx: Context<any>, next) {
    const token = <string>ctx.request.header['x-auth-token'];

    if (token) {
      try {
        const userInfo = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        ctx.userInfo = userInfo;
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          msg: '令牌过期, 请重新登录'
        };
        return;
      }
      await next();
    }
    ctx.status = 401;
    ctx.body = {
      msg: '没有token, 尝试重新登录'
    };
    return;
  }
}