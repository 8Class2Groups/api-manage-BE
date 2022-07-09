import { Application } from 'egg';
import routes from './routes';

export default (app: Application) => {
  const { controller, router } = app;

  /**
   * @desc 发送邮件
   */
  router.get('/v0/email', controller.email.sendEmail);

  /**
   * @desc 业务接口拆分
   */
  routes(app);
};

