import { Service } from 'egg'

class ItemService extends Service {

  // 创建项目
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Item.create(Object.assign({}, params));
      return results;
    } catch (err) {
      console.log('err:',err)
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取项目列表
  public async getList(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Item.find(params);
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取项目详情
  public async getDetail(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Item.findOne(params);
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }
  

  // 删除项目
  public async delete(params) {
    const { ctx } = this;
    try {
      // console.log('params24:',params)
      const results = await ctx.model.Item.deleteMany(params);
      // console.log('results24:',results)
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
      if (key === 'defaultPath') {
        updateParams['defaultPath'] = params[key];
      };
      if (key === 'desc') {
        updateParams['desc'] = params[key];
      };

      if (Object.keys(updateParams).length > 0) {
        updateParams['updateAt'] = Date.now();
      }
    });
    return updateParams;
  }

  // 更新项目
  public async update(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Item.updateOne({ itemId: params.itemId }, {
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
export default ItemService;