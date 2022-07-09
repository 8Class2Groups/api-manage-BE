import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 创建接口分类
   */
  router.post('/v0/workspace/item/class/create', middleware.tokenHandler(), controller.apiClass.create);

  /**
   * @desc 删除接口分类
   */
  router.delete('/v0/workspace/item/class/delete', middleware.tokenHandler(), controller.apiClass.delete);

  /**
   * @desc 修改接口分类接口
   */
  router.put('/v0/workspace/item/class/update', middleware.tokenHandler(), controller.apiClass.update);

  /**
   * @desc 查询接口分类和接口信息
   */
  router.get('/v0/workspace/item/class/list', middleware.tokenHandler(), controller.apiClass.getClassInfo);
}