import { Service } from 'egg'

class ResService extends Service {

  // 创建接口返回数据
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Res.create(Object.assign({}, params));
      // console.log('results:',results)
      return results;
    } catch (err) {
      console.log('err:',err)
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }


  // 获取接口返回数据
  public async getList(params) {
    // console.log('params22:',params)
    const { ctx } = this;
    try {
      const results = await ctx.model.Res.find(params);
      // console.log('results:',results)
      return results;
    } catch (err) {
      console.log('err:',err)
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 删除接口返回数据
  public async delete(params) {
    const { ctx } = this;
    try {
      // console.log('apiparams24:',params)
      // const results = await ctx.model.Api.deleteOne({ _id: params._id });
      const results = await ctx.model.Res.deleteMany(params);
      // console.log('rapiesults24:',results)
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
      if (key === 'title') {
        updateParams['title'] = params[key];
      };
      if (key === 'type') {
        updateParams['type'] = params[key];
      };
      if (key === 'mock') {
        updateParams['mock'] = params[key];
      };
      if (key === 'description') {
        updateParams['description'] = params[key];
      };
      if (key === 'required') {
        updateParams['required'] = params[key];
      };
      if (key === 'default') {
        updateParams['default'] = params[key];
      };
      if (key === 'exclusiveMinimum') {
        updateParams['exclusiveMinimum'] = params[key];
      };
      if (key === 'exclusiveMaximum') {
        updateParams['exclusiveMaximum'] = params[key];
      };
      if (key === 'minimum') {
        updateParams['minimum'] = params[key];
      };
      if (key === 'maximum') {
        updateParams['maximum'] = params[key];
      };
      if (key === 'enum') {
        updateParams['enum'] = params[key];
      };
      if (key === 'enumDesc') {
        updateParams['enumDesc'] = params[key];
      };
      if (Object.keys(updateParams).length > 0) {
        updateParams['updateAt'] = Date.now();
      }
    });
    return updateParams;
  }

   // 更新接口返回数据
   public async update(params) {
    const { ctx } = this;
    try {
      // console.log('params100:',params)
      const results = await ctx.model.Res.updateOne({ _id: params._id }, {
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
export default ResService;