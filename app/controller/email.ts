import { Controller } from 'egg';
import { EMIAL_EXPRIED_TIME, EMAIL_REDIS_KEY_TYPE } from '../chore/email.constant';

class EmailController extends Controller {

  private vEmail() {
    return {
      email: { type: 'string', required: true },
      username: { type: 'string', required: true },
      type: { type: 'string', required: true }
    }
  };

  public async sendEmail() {
    const { ctx } = this;

    try {
      const query = ctx.request.query;
      ctx.validate(this.vEmail(), query);
      const userInfo = await ctx.service.user.findEmail(query);
      const type = EMAIL_REDIS_KEY_TYPE[query.type] === 0;
      if (type) {
        this.register(userInfo);
      } else {
        this.forget(userInfo);
      };

      const code = ctx.helper.generatorEmailCode();
      await this.service.dbRedis.set<number>(`${query.username}${EMAIL_REDIS_KEY_TYPE[query.type]}`, code, EMIAL_EXPRIED_TIME);

      const sendEmailRes = await ctx.service.email.sendMail(
        query.email,
        type ? '注册' : '忘记密码',
        {
          username: query.username,
          code
        });

      if (sendEmailRes) {
        ctx.body = { code: 0 }
      } else {
        ctx.body = { msg: '发送邮件失败，请重试' }
      }
    } catch (error) {
      console.log('获取邮箱验证码接口出错', error);
      ctx.body = { msg: '邮件服务异常' }
    }
  }

  private register(userInfo) {
    const { ctx } = this;
    if (userInfo) {
      ctx.body = {
        msg: '邮箱已经被注册'
      }
      return
    }
  };

  private forget(userInfo) {
    const { ctx } = this;
    if (!userInfo) {
      ctx.body = {
        msg: '用户未注册'
      }
      return
    }
  }
}

export default EmailController;