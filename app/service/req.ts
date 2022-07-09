import { Service } from 'egg'

class ReqService extends Service {

  // 创建接口请求参数
  public async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Req.create(Object.assign({}, params));
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


  // 获取接口请求参数
  public async getList(params) {
    // console.log('params22:',params)
    const { ctx } = this;
    try {
      const results = await ctx.model.Req.find(params);
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

  // 删除接口请求参数
  public async delete(params) {
    const { ctx } = this;
    try {
      // console.log('apiparams24:',params)
      // const results = await ctx.model.Api.deleteOne({ _id: params._id });
      const results = await ctx.model.Req.deleteMany(params);
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
      if (key === 'req_headers_name') {
        updateParams['req_headers_name'] = params[key];
      };
      if (key === 'req_headers_value') {
        updateParams['req_headers_value'] = params[key];
      };
      if (key === 'req_headers_required') {
        updateParams['req_headers_required'] = params[key];
      };
      if (key === 'req_headers_example') {
        updateParams['req_headers_example'] = params[key];
      };
      if (key === 'req_headers_desc') {
        updateParams['req_headers_desc'] = params[key];
      };
      if (key === 'req_query_name') {
        updateParams['req_query_name'] = params[key];
      };
      if (key === 'req_query_required') {
        updateParams['req_query_required'] = params[key];
      };
      if (key === 'req_query_example') {
        updateParams['req_query_example'] = params[key];
      };
      if (key === 'req_query_desc') {
        updateParams['req_query_desc'] = params[key];
      };
      if (key === 'req_body_name') {
        updateParams['req_body_name'] = params[key];
      };
      if (key === 'req_body_type') {
        updateParams['req_body_type'] = params[key];
      };
      if (key === 'req_body_required') {
        updateParams['req_body_required'] = params[key];
      };
      if (key === 'req_body_example') {
        updateParams['req_body_example'] = params[key];
      };
      if (key === 'req_body_desc') {
        updateParams['req_body_desc'] = params[key];
      };
      if (Object.keys(updateParams).length > 0) {
        updateParams['updateAt'] = Date.now();
      }
    });
    return updateParams;
  }

   // 更新接口请求参数
   public async update(params) {
    const { ctx } = this;
    try {
      // console.log('params100:',params)
      const results = await ctx.model.Req.updateOne({ _id: params._id }, {
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
export default ReqService;