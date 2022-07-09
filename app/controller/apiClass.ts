import { Controller } from 'egg';
import { vClass, vDelete, vGet, vUpdate } from '../chore/validates/apiClass';
class ApiClass extends Controller {

  private async checkData(params) {
    const { ctx } = this;
    // 校验工作区
    const dbWorkspace = await ctx.service.workspace.getWorkspace(params);
    if (dbWorkspace?.hasOwnProperty('code') || !dbWorkspace) {
      return ctx.body = {
        msg: '工作区不存在'
      }
    }

    // 校验项目
    const itemParams = { itemId: params.itemId, workspaceId: params.workspaceId };
    const dbItem = await ctx.service.item.getDetail(itemParams);
    if (dbItem?.hasOwnProperty('code') || !dbItem) {
      return ctx.body = {
        msg: '项目不存在'
      }
    }

    // 如果存在父级id 校验父级是否存在
    if (params.parentClassId) {
      const checkParams = {
        itemId: params.itemId,
        workspaceId: params.workspaceId,
        _id: params.parentClassId
      }
      const dbClass = await ctx.service.apiClass.getClass(checkParams);
      console.log(dbClass)
      if (dbClass?.hasOwnProperty('code') || !dbClass) {
        return ctx.body = {
          msg: '接口分类不存在'
        }
      }
    }

    return false;
  }

  public async create() {
    const { ctx } = this;
    try {
      const params = ctx.request.body;
      ctx.validate(vClass(), params);

      // 后续抽成中间件
      const data = await this.checkData(params);
      if (data) {
        return;
      }

      const dbClass = await ctx.service.apiClass.createApiClass(params);
      if (dbClass && !dbClass?.hasOwnProperty('code')) {
        const data = {
          className: dbClass.className,
          classRemark: dbClass.classRemark,
          classId: dbClass._id
        }

        return ctx.body = {
          msg: '创建成功',
          data
        }
      }
      ctx.body = {
        msg: '创建失败'
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        msg: 'create api class error'
      }
    }
  }

  public async delete() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(vDelete(), params);

      // 后续抽成中间件
      const data = await this.checkData(params);
      if (data) {
        return;
      }

      const dbClass = await ctx.service.apiClass.deleteApiClass(params);

      if (dbClass) {
        return ctx.body = {
          msg: '删除接口分类成功'
        }
      }

      ctx.body = {
        msg: '删除接口分类失败'
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        msg: 'delete api class error'
      }
    }
  }

  public async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(vUpdate(), params);

      // 后续抽成中间件
      const data = await this.checkData(params);
      if (data) {
        return;
      }

      const updateInfo = {};
      Reflect.ownKeys(params).forEach(item => {
        if (item === 'className') {
          updateInfo['className'] = params[item];
        };

        if (item === 'classRemark') {
          updateInfo['classRemark'] = params[item];
        }
      })
      const dbClass = await ctx.service.apiClass.updateApiClass(params, updateInfo);
      if (dbClass) {
        return ctx.body = {
          msg: '更新接口分类成功',
          data: {
            ...updateInfo
          }
        }
      }

      ctx.body = {
        msg: '更新接口分类失败'
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        msg: 'update api class error'
      }
    }
  }

  public async getClassInfo() {
    const { ctx } = this;
    const params = { ...ctx.request.query };
    try {
      ctx.validate(vGet(), params);

      // 后续抽成中间件
      const data = await this.checkData(params);
      if (data) {
        return;
      }

      /**
       * @desc 两种方案
       * 1. 一次性把该类别的相关的所有数据全部查出来，然后再根据数据进行组装
       * 优点：只需要查询2次数据库 一次查询该项目下面的所有类别，一次查询该项目下的所有接口
       * 缺点：逻辑耦合，无法进行拆分和复用
       * 2. 先把所有的类别查出来，再依据类别查询对应的接口
       * 优点：逻辑拆分，可以进行复用
       * 缺点：有多少类别就需要查询多少次接口的数据库需要查询1 + n次数据库 或者 n + n次
       */
      const itemId = { itemId: params.itemId }
      // 使用项目id获取该分类下的所有文件和文件夹
      const [classData, apiData] = await Promise.all([
        ctx.service.apiClass.getClassList(params),
        ctx.service.api.getList(itemId)
      ]);

      const map = { '': { children: [] } };
      (<any>classData).forEach(item => {
        const { _id: classId } = item;

        map[classId] = {
          workspaceId: item.workspaceId,
          itemId: item.itemId,
          parentClassId: item.parentClassId,
          className: item.className,
          classRemark: item.classRemark,
          createAt: item.createAt,
          updateAt: item.updateAt,
          children: []
        };
      });

      (<any>apiData).forEach(api => {
        const { classId } = api;
        if (map[classId]) {
          map[classId].children.push(api)
        }
      });
      Reflect.ownKeys(map).forEach(key => {
        if (key) {
          const { parentClassId } = <any>map[key];
          map[parentClassId].children.push(map[key]);
        }
      });

      ctx.body = {
        data: map[''],
        code: 0
      }

    } catch (error) {

    }
  }

  /**
   * @desc 删除分类，暂时不考虑权限
   */
  public async deleteItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      // ctx.validate(this.vDelete(), params);
      // console.log('params69:',params)
      let results = await ctx.service.apiClass.delete(params);
      // console.log('apiClass-results111:',results)
      ctx.body = {
        msg: '删除api成功',
        code: 0,
        results
      }
      // results['deletedCount']=parseInt(results['deletedCount'])
      // console.log('results111:',results['deletedCount'])
      // // 这里为什么报错呢？error TS2339: Property 'deletedCount' does not exist on type '({ ok?: number | undefined; n?: number | undefined; } & { deletedCount?: number | undefined; }) | { code: number; msg: string; }'. Property 'deletedCount' does not exist on type '{ code: number; msg: string; }'.
      // if(results&&results['deletedCount']&&results['deletedCount']=='0'){
      //   // ctx.body = {
      //   //   msg: '删除api失败，可能是所传数据错误',
      //   //   code:40006
      //   // }
      //   console.log('r0:',results['deletedCount'])
      // }else{
      //   // ctx.body = {
      //   //   msg: '删除api成功',
      //   //   code:0
      //   // }
      //   console.log('r1:',results['deletedCount'])
      // }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误',
        error: error
      }
    }
  }
}

export default ApiClass;