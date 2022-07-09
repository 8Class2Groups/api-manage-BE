import { Service } from 'egg'

class ApiService extends Service {

  // 创建接口
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Api.create(Object.assign({}, params));
      return results;
    } catch (err) {
      console.log('err:',err)
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取接口列表
  public async getList(params) {
    // console.log('params22:',params)
    const { ctx } = this;
    try {
      const results = await ctx.model.Api.find(params);
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

  // 删除api
  public async delete(params) {
    const { ctx } = this;
    try {
      // console.log('apiparams24:',params)
      // const results = await ctx.model.Api.deleteOne({ _id: params._id });
      const results = await ctx.model.Api.deleteMany(params);
      // console.log('rapiesults24:',results)
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  // 获取api详情
  public async getDetail(params) {
    console.log('53:',params)
    const { ctx } = this;
    try {
      const results = await ctx.model.Api.findOne(params);
      console.log('57:',results)
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
      if (key === 'classId') {
        updateParams['classId'] = params[key];
      };
      if (key === 'method') {
        updateParams['method'] = params[key];
      };
      if (key === 'path') {
        updateParams['path'] = params[key];
      };
      if (key === 'tag') {
        // console.log('params83:',params[key])
        updateParams['tag'] = params[key];
      };
      if (key === 'status') {
        updateParams['status'] = params[key];
      };
      if (Object.keys(updateParams).length > 0) {
        updateParams['updateAt'] = Date.now();
      }
    });
    return updateParams;
  }

   // 更新api
   public async update(params) {
    const { ctx } = this;
    try {
      // console.log('params100:',params)
      const results = await ctx.model.Api.updateOne({ _id: params._id }, {
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
export default ApiService;