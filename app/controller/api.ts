import { Controller } from 'egg';
// import { vCreate, vGetDetail, vGetList, vUpdate } from '../chore/validates/api';
import { vCreate, vGetDetail,  vUpdate } from '../chore/validates/api';

class Api extends Controller {

  public async create() {
    const { ctx } = this;
    try {
      ctx.userInfo.ownerUid = ctx.userInfo.uid;
      delete ctx.userInfo.uid
      const params = { ...ctx.request.body, ...ctx.userInfo };
      ctx.validate(vCreate(), params);
      //   console.log('params24:',params)
      const apiInfo = await ctx.service.api.create(params);
      //   console.log('apiInfo:',apiInfo)
      if (apiInfo) {
        ctx.body = {
          msg: '接口创建成功',
          code: 0,
          data: {
            apiId: apiInfo._id,
            title: apiInfo.title,
            classId: apiInfo.classId,
            itemId: apiInfo.itemId,
            method: apiInfo.method,
            path: apiInfo.path,
            status: apiInfo.status,
            tag: apiInfo.tag,
            createdAt: apiInfo.createdAt,
            updatedAt: apiInfo.updatedAt,
          }
        };

        return
      }
      ctx.body = {
        msg: '接口创建失败'
      }
    } catch (error) {
      console.log('接口创建接口出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 获取接口列表
   */
  public async getList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('params24:',query)
      // ctx.validate(vGetList(), query);
      const apiList = await ctx.service.api.getList(query);
      // console.log('apiList:',apiList)
      if (!apiList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取接口列表成功',
          code: 0,
          data: { apiList }
        };
        return;
      }
      ctx.body = {
        msg: '获取接口列表失败',
      }
    } catch (error) {
      console.log('error70:',error)
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 删除api，暂时不考虑权限
   */
  public async deleteItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      // ctx.validate(params);
      console.log('params111:',params)
      let results = await ctx.service.api.delete(params);
      // console.log('results111:',results)
      ctx.body = {
        msg: '删除api成功',
        code: 0,
        results
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误',
        error: error
      }
    }
  }

  /**
   * @desc 获取api详情
   */
  public async getDetail() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('query111:',query)
      ctx.validate(vGetDetail(), query);
      const apiDetail = await ctx.service.api.getDetail(query);
      if (!apiDetail.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取api详情成功',
          code: 0,
          data: {
            apiDetail
          }
        };
        return;
      }
      ctx.body = {
        msg: '获取项目详情失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }
  /**
   * @desc 更新项目
   */
  public async update() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      ctx.validate(vUpdate(), params);
      let results = await ctx.service.api.update(params);
      // console.log('results:',results)
      ctx.body = {
        msg: `更新api成功`,
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
}

export default Api;