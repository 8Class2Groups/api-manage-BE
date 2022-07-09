import { Controller } from 'egg';
import { vCreate,vGetList,vUpdate,vDelete} from '../chore/validates/req';

class Req extends Controller {
  /**
   * @desc 创建接口请求参数
   */
  public async create() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body};
      ctx.validate(vCreate(), params);
        // console.log('params24:',params)
      const reqInfo = await ctx.service.req.create(params);
        // console.log('reqInfo:',reqInfo)
      if (reqInfo) {
        ctx.body = {
          msg: '接口请求参数创建成功',
          code: 0,
          data: {
            reqInfo
          }
        };

        return
      }
      ctx.body = {
        msg: '接口请求参数创建失败'
      }
    } catch (error) {
      console.log('接口请求参数出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


  /**
   * @desc 获取接口请求参数
   */
   public async getList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('params24:',query)
      ctx.validate(vGetList(), query);
      const reqList = await ctx.service.req.getList(query);
      // console.log('reqList:',reqList)
      if (!reqList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取接口请求参数成功',
          code: 0,
          data: { reqList }
        };
        return;
      }
      ctx.body = {
        msg: '获取接口请求参数失败',
      }
    } catch (error) {
      console.log('error70:',error)
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


  /**
   * @desc 更新接口请求参数
   */
   public async update() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      ctx.validate(vUpdate(), params);
      let results = await ctx.service.req.update(params);
      // console.log('results:',results)
      ctx.body = {
        msg: `更新接口请求参数成功`,
        code: 0,
        _id: params._id,
        results: results
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


  /**
   * @desc 删除接口请求参数，暂时不考虑权限
   */
   public async deleteItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      // ctx.validate(params);
      ctx.validate(vDelete(), params);
      // console.log('params111:',params)
      let results = await ctx.service.req.delete(params);
      // console.log('results111:',results)
      ctx.body = {
        msg: '删除接口请求参数成功',
        code: 0,
        results: results
      }
    } catch (error) {
      console.log('error:',error)
      ctx.body = {
        msg: '服务器错误',
        error: error
      }
    }
  }

}

export default Req;