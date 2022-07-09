import { Application } from "egg";
import { EMAIL_REDIS_KEY_TYPE } from '../chore/constants/email.constant';
import { vRegister, vUser } from '../chore/validates/user';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const { emailCodeCheck, validate } = middleware;

  /**
  * @desc 注册
  */
  router.post(
    '/v0/user/register',
    emailCodeCheck(EMAIL_REDIS_KEY_TYPE.register),
    validate({
      check: vRegister(),
      msg: '注册'
    }),
    controller.user.register
  );

  /**
   * @desc 登录
   */
  router.get(
    '/v0/user/login',
    validate({
      check: vUser(),
      msg: '登录'
    }),
    controller.user.login
  );

  /**
   * @desc 忘记密码
   */
  router.put(
    '/v0/user/forget',
    emailCodeCheck(EMAIL_REDIS_KEY_TYPE.forget),
    validate({
      check: vRegister(),
      msg: '忘记密码'
    }),
    controller.user.forget
  );
}