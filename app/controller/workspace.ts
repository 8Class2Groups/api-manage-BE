import { Controller } from 'egg';
import { v4 as uuid } from 'uuid';

class Workspace extends Controller {

  public async create() {
    const { ctx } = this;

    try {
      const params = ctx.requestValue
      params.ownerUid = params.uid;
      delete params.uid

      params.workspaceId = uuid(params.ownerUid);

      const workspaceInfo = await ctx.service.workspace.create(params);

      if (workspaceInfo) {
        ctx.body = {
          msg: '工作区创建成功',
          data: {
            workspaceId: workspaceInfo.workspaceId,
            remark: workspaceInfo.remark
          }
        };

        return
      }
      ctx.body = {
        msg: '工作区创建失败'
      }
    } catch (error) {
      console.log('工作区创建接口出错', error);
      ctx.body = {
        msg: '服务器异常，创建工作区'
      }
    }
  }

  /**
   * @desc 目前因为还不存在共享工作区功能，所以获取工作区还是来自于个人创建的
   */
  public async getWorkspaceList() {
    const { ctx } = this;

    try {
      const workspaceList = await ctx.service.workspace.getList(ctx.requestValue);

      if (!workspaceList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取工作区列表成功',
          data: {
            workspaceList: (workspaceList as any[]).map(item => {
              return {
                workspaceId: item.workspaceId,
                ownerUid: item.ownerUid,
                uid: [],
                private: item.private,
                name: item.name,
                remark: item.remark
              }
            })
          }
        };

        return;
      }

      ctx.body = {
        msg: '获取工作区列表失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器异常，获取工作区列表'
      }
    }
  }

  /**
   * @desc 删除workspace，暂时不用考虑权限
   */
  public async deleteWorkspace() {
    const { ctx } = this;
    try {
      let results = await ctx.service.workspace.delete(ctx.requestValue);
      ctx.body = {
        msg: '删除工作区成功',
        results
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器异常，删除工作区'
      }
    }
  }

  /**
   * @desc 更新工作区
   */
  public async updateWorkspace() {
    const { ctx } = this;
    try {
      await ctx.service.workspace.update(ctx.requestValue);
      ctx.body = {
        msg: `更新工作区${ctx.requestValue.name}成功`,
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器异常，更新工作区'
      }
    }
  }
};

export default Workspace;