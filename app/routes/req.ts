import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, middleware } = app;

  /**
   * @desc 创建req
   */
   router.post('/v0/item/api/req', middleware.tokenHandler(), controller.req.create);
  // router.post('/v0/req/create', middleware.tokenHandler(), controller.req.create);
  // /**
  //  * @desc 获取api列表
  //  */
  // router.get('/v0/item/api/list', middleware.tokenHandler(), controller.api.getList);

  // /**
  //  * @desc 删除api
  //  */
  // router.delete('/v0/item/api/delete', middleware.tokenHandler(), controller.api.deleteItem);

  // /**
  // * @desc 更新api
  // */
  // router.put('/v0/item/api/update', middleware.tokenHandler(), controller.api.update);

}