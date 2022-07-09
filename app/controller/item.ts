import { Controller } from 'egg';
import { v4 as uuid } from 'uuid';
import { vCreate, vUpdate, vGetList, vGetDetail, vDelete } from '../chore/validates/item';

class Item extends Controller {

  public async create() {
    const { ctx } = this;
    try {
      ctx.userInfo.ownerUid = ctx.userInfo.uid;
      delete ctx.userInfo.uid
      const params = { ...ctx.request.body, ...ctx.userInfo };
      ctx.validate(vCreate(), params);

      params.itemId = uuid(params.ownerUid);

      const itemInfo = await ctx.service.item.create(params);

      if (itemInfo) {
        ctx.body = {
          code: 0,
          msg: '项目创建成功',
          data: {
            itemId: itemInfo.itemId
          }
        };

        return
      }
      ctx.body = {
        msg: '项目创建失败'
      }
    } catch (error) {
      console.log('项目创建接口出错', error);
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 获取项目列表
   */
  public async getItemList() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      // console.log('params24:',query)
      ctx.validate(vGetList(), query);
      const itemList = await ctx.service.item.getList(query);
      if (!itemList.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取项目列表成功',
          code: 0,
          data: {
            itemList: (itemList as any[]).map(item => {
              return {
                itemId: item.itemId,
                name: item.name,
                item: item
              }
            })
          }
        };
        return;
      }
      ctx.body = {
        msg: '获取项目列表失败',
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 获取项目详情
   */
  public async getItemDetail() {
    const { ctx } = this;
    try {
      const query = ctx.request.query;
      ctx.validate(vGetDetail(), query);
      // console.log('params24:',query)
      const itemDetail = await ctx.service.item.getDetail(query);
      const ClassList = await ctx.service.apiClass.getClassList(query);
      // const apiList = await ctx.service.api.getList({classId:query._id,itemId:query.itemId});
      // console.log('apiList:',apiList)
      // const classList= await ctx.service.item.getDetail(query);

      // let apiList=[]
      // let apiList
      if (!itemDetail.hasOwnProperty('code')) {
        ctx.body = {
          msg: '获取项目详情成功',
          code: 0,
          data: {
            itemDetail: {
              workspaceId: itemDetail.workspaceId,
              itemId: itemDetail.itemId,
              name: itemDetail.name,
              itemDetail:itemDetail
            },
            list: await Promise.all((ClassList as any[]).map(async item => {
              let apiList = await ctx.service.api.getList({ classId: item._id, itemId: item.itemId })
              // console.log('apiList---:',apiList);
              // console.log('item---:',item)
              item.apiList = apiList;
              return {
                classId: item._id,
                workspaceId: item.workspaceId,
                itemId: item.itemId,
                className: item.className,
                classRemark: item.classRemark,
                apiList: item.apiList
              }
              // return(async ()=>{

              // })();

            }))

            // list: (ClassList as any[]).map(  item => {
            //   console.log('{classId:item._id,itemId:item.itemId}:',{classId:item._id,itemId:item.itemId})
            //   // let apiList = await ctx.service.api.getList({classId:item._id,itemId:item.itemId}).then(res => {
            //     item.insert({sex:'男'})
            //   console.log('item---:',item)
            //     // item.apiList = {}
            //     // item.apiList = res
            //     arrayNew.push(Object.assign(item,{sex:'男'}))
            //     // const results = await ctx.model.Api.create(Object.assign({}, params));
            //     console.log('arrayNew---:',arrayNew)
            //     // return Object.assign(item,{apiList: 1})
            //     // return 1

            //     // console.log('item---:',item)
            //     //   return {
            //     //   classId: item._id,
            //     //   workspaceId: item.workspaceId,
            //     //   itemId:item.itemId,
            //     //   className: item.className,
            //     //   classRemark: item.classRemark,
            //     //   apiList:item.apiList
            //     // }
            //   // });
            //   // item.apiList=apiList
            //   // resolve(1)
            //   // return 1
            //   // return {
            //   //   classId: item._id,
            //   //   workspaceId: item.workspaceId,
            //   //   itemId:item.itemId,
            //   //   className: item.className,
            //   //   classRemark: item.classRemark,
            //   //   apiList:[]
            //   // }
            // })

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
  public async updateItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.userInfo, ...ctx.request.body };
      ctx.validate(vUpdate(), params);
      await ctx.service.item.update(params);
      // console.log('newItem:',newItem)
      ctx.body = {
        msg: `更新项目${params.name}成功`,
        code: 0,
        itemId: params.itemId
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }

  /**
   * @desc 删除项目，暂时不考虑权限
   */
  public async deleteItem() {
    const { ctx } = this;
    try {
      const params = { ...ctx.request.body };
      ctx.validate(vDelete(), params);

      let resultsItem = await ctx.service.item.delete(params);
      // console.log('item-results111:',resultsItem)
      let resultsApiClass = await ctx.service.apiClass.delete(params);
      // console.log('apiClass-results111:',resultsApiClass)
      let resultsApi = await ctx.service.api.delete(params);
      // console.log('apiClass-results111:',resultsApi)
      ctx.body = {
        msg: '删除项目成功',
        code: 0,
        resultsItem,
        resultsApiClass,
        resultsApi
      }
    } catch (error) {
      ctx.body = {
        msg: '服务器错误'
      }
    }
  }


}

export default Item;