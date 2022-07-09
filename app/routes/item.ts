import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 创建项目
   */
  router.post('/v0/workspace/item/create', middleware.tokenHandler(), controller.item.create);

  /**
   * @desc 获取项目列表
   */
  router.get('/v0/workspace/item/list', middleware.tokenHandler(), controller.item.getItemList);

  /**
   * @desc 更新项目列表
   */
  router.put('/v0/workspace/item/update', middleware.tokenHandler(), controller.item.updateItem);

  /**
   * @desc 删除项目
   */
  router.delete('/v0/workspace/item/delete', middleware.tokenHandler(), controller.item.deleteItem);

  /**
   * @desc 获取项目详情
   */
  router.get('/v0/workspace/item/detail', middleware.tokenHandler(), controller.item.getItemDetail);
}