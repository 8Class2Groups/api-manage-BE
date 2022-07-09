import { Controller } from 'egg';
import { USERINFO_EXPIRED_TIME } from '../chore/constants/redis.constant';

class UserController extends Controller {

  /**
   * 用户注册
   */
  public async register() {
    const { ctx, app } = this;
    const params = ctx.requestValue;

    try {
      const userInfo = await ctx.service.user.findEmail(params);
      if (userInfo) {
        ctx.body = {
          msg: '邮箱已经被注册'
        }
        return
      }
      // 判断用户名是否重复
      const user = await ctx.service.user.find(params);
      if (user) {
        ctx.status = 401;
        ctx.body = {
          msg: '邮箱已被注册'
        };
        return;
      };

      const dbUser = await ctx.service.user.create(params);

      const token = app.jwt.sign(
        { uid: dbUser._id },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      )
      // 用户信息存入redis
      await ctx.service.dbRedis.set(token, { uid: dbUser._id }, USERINFO_EXPIRED_TIME);

      ctx.body = {
        msg: '注册成功', data: {
          userInfo: {
            token,
            username: dbUser.username,
            uid: dbUser._id
          }
        }
      };
    } catch (error) {
      ctx.body = { msg: '服务器错误, 注册' }
    }

  }

  /**
   * 用户登录
   */
  public async login() {
    const { ctx, app } = this;
    const params = ctx.requestValue;
    try {
      const dbUser = await ctx.service.user.find(params);

      if (!dbUser) {
        ctx.body = { msg: '用户不存在' };
        return;
      }
      if (dbUser.password !== params.password) {
        ctx.body = { msg: '登录密码错误' };
        return;
      }

      const token = app.jwt.sign(
        { uid: dbUser.uid },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      );

      // 用户信息存入redis
      await ctx.service.dbRedis.set(token, { uid: dbUser._id }, USERINFO_EXPIRED_TIME);

      ctx.body = {
        msg: '登录成功', data: {
          userInfo: {
            token,
            username: dbUser.username,
            uid: dbUser._id
          }
        }
      };
    } catch (error) {
      ctx.body = { msg: '服务器错误，登录' }
    }
  }

  /**
   * 忘记密码
   */
  public async forget() {
    const { ctx, app } = this;
    const params = ctx.requestValue;
    try {
      await ctx.service.user.updatePass(params);
      const dbUser = await ctx.service.user.find(params);

      if (!dbUser) {
        return ctx.body = {
          msg: '服务器异常'
        }
      }

      if (dbUser.password !== params.password) {
        return ctx.body = {
          msg: '重置密码失败'
        }
      }

      const token = app.jwt.sign(
        { uid: dbUser._id },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      );
      // 用户信息存入redis
      await ctx.service.dbRedis.set(token, { uid: dbUser._id }, USERINFO_EXPIRED_TIME);

      ctx.body = {
        msg: '重置密码成功', data: {
          userInfo: {
            token,
            username: dbUser.username,
            uid: dbUser._id
          }
        }
      };
    } catch (error) {
      ctx.body = { msg: '服务器异常，忘记密码' }
    }
  }
}

export default UserController;