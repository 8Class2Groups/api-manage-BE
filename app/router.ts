import { Application } from 'egg';
import { EMAIL_REDIS_KEY_TYPE } from './chore/email.constant';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 发送邮件
   */
  router.get('/email', controller.email.sendEmail);

  /**
   * @desc 注册
   */
  router.post('/register', middleware.emailCodeCheck(EMAIL_REDIS_KEY_TYPE.register), controller.user.register);

  /**
   * @desc 登录
   */
  router.post('/login', controller.user.login);

  /**
   * @desc 忘记密码
   */
  router.put('/forget', middleware.emailCodeCheck(EMAIL_REDIS_KEY_TYPE.forget), controller.user.forget);
};

