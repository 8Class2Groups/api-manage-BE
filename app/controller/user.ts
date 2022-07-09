import { Controller } from 'egg';

class UserController extends Controller {

  private vUser() {
    return {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    }
  };

  private vRegister() {
    return {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      email: { type: 'string', required: true }
    }
  };

  /**
   * 用户注册
   */
  public async register() {
    const { ctx, app } = this;

    // 接收校验参数
    try {
      const params = ctx.request.body;
      ctx.validate(this.vRegister(), params);

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
      console.log('dbUser', dbUser);

      const token = app.jwt.sign(
        { username: params.username },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      )

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
      ctx.body = { code: 40001 }
    }

  }

  /**
   * 用户登录
   */
  public async login() {
    const { ctx, app } = this;

    try {
      const params = ctx.request.body;
      ctx.validate(this.vUser(), params);
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
        { username: params.username },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      )

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
      ctx.body = { msg: '登录失败' }
    }
  }

  /**
   * 忘记密码
   */
  public async forget() {
    const { ctx, app } = this;

    try {
      const params = ctx.request.body;
      ctx.validate(this.vRegister(), params);

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
        { username: params.username },
        app.config.jwt.secret,
        { expiresIn: '24h' }
      )

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
      ctx.body = { msg: '登录失败' }
    }
  }
}

export default UserController;