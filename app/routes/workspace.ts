import { Application } from "egg";
import { vCreate, vUpdate, vGetList, vDelete } from '../chore/validates/workspace';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const { tokenHandler, validate } = middleware;
  // validate

  /**
   * @desc 创建工作区
   */
  router.post(
    '/v0/workspace/create',
    tokenHandler(),
    validate({
      check: vCreate(),
      msg: '创建工作区'
    }),
    controller.workspace.create
  );

  /**
   * @desc 获取工作区列表
   */
  router.get(
    '/v0/workspace/list',
    tokenHandler(),
    validate({
      check: vGetList(),
      msg: '获取工作区列表'
    }),
    controller.workspace.getWorkspaceList
  );

  /**
   * @desc 删除工作区
   */
  router.delete(
    '/v0/workspace/delete',
    tokenHandler(),
    validate({
      check: vDelete(),
      msg: '删除工作区'
    }),
    controller.workspace.deleteWorkspace
  );

  /**
   * @desc 更新工作区
   */
  router.put(
    '/v0/workspace/update',
    tokenHandler(),
    validate({
      check: vUpdate(),
      msg: '更新工作区'
    }),
    controller.workspace.updateWorkspace
  );
}