import { Controller } from 'egg';
import { vCreate,vGetList,vUpdate,vDelete} from '../chore/validates/res';

class Res extends Controller {
  /**
   * @desc 创建接口返回数据
   */
  public async create() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body};
      ctx.validate(vCreate(), params);
        // console.log('params24:',params)
      const resInfo = await ctx.service.res.create(params);
        // console.log('resInfo:',resInfo)
      if (resInfo) {
        ctx.body = {
          msg: '接口返回数据创建成功',
          code: 0,
          data: {
            resInfo
          }
        };

        return
      }
      ctx.body = {
        msg: '接口返回数据创建失败'
      }
    } catch (error) {
      console.log('接口返回数据出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


  /**
   * @desc 获取接口返回数据
   */
   public async getList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('params24:',query)
      ctx.validate(vGetList(), query);
      const resList = await ctx.service.res.getList(query);
      // console.log('resList:',resList)
      if (!resList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取接口返回数据成功',
          code: 0,
          data: { resList }
        };
        return;
      }
      ctx.body = {
        msg: '获取接口返回数据失败',
      }
    } catch (error) {
      console.log('error70:',error)
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


  /**
   * @desc 更新接口返回数据
   */
   public async update() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      ctx.validate(vUpdate(), params);
      let results = await ctx.service.res.update(params);
      // console.log('results:',results)
      ctx.body = {
        msg: `更新接口返回数据成功`,
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
   * @desc 删除接口返回数据，暂时不考虑权限
   */
   public async deleteItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      // ctx.validate(params);
      ctx.validate(vDelete(), params);
      // console.log('params111:',params)
      let results = await ctx.service.res.delete(params);
      // console.log('results111:',results)
      ctx.body = {
        msg: '删除接口返回数据成功',
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

export default Res;