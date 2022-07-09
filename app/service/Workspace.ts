import { Service } from 'egg'

class WorkspaceService extends Service {

  // 获取工作区信息
  public async getWorkspace(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.findOne({ workspaceId: params.workspaceId });
      return results;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error),
      };
    }
  }

  // 创建工作区
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.create(Object.assign({}, params));
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取工作区列表
  public async getList(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.find({ ownerUid: params.uid });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 删除工作区
  public async delete(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.deleteOne({ workspaceId: params.workspaceId });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  private updateHelper(params) {
    const updateParams = {};
    Object.keys(params).forEach(key => {
      if (key === 'name') {
        updateParams['name'] = params[key];
      };

      if (Object.keys(updateParams).length > 0) {
        updateParams['updateAt'] = Date.now();
      }
    });

    return updateParams;
  }

  // 更新工作区
  public async update(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Workspace.updateOne({ workspaceId: params.workspaceId }, {
        $set: this.updateHelper(params)
      });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
}
export default WorkspaceService;