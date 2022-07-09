import { Service } from 'egg';

/**
 * Test Service api class
 */
class ApiClass extends Service {
  public async createApiClass(params) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Class.create(Object.assign({}, params));
      return result;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error)
      }
    }
  }

  public async deleteApiClass(params) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Class.deleteOne({ _id: params.classId });
      return result;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error)
      }
    }
  }

  public async updateApiClass(params, updateInfo) {
    const { ctx } = this;
    try {
      const result = await ctx.model.Class.updateOne({ _id: params.classId }, { $set: { ...updateInfo, updateAt: Date.now() } });
      return result;
    } catch (error) {
      return {
        code: 500,
        msg: JSON.stringify(error)
      }
    }
  }
  // 获取项目下的分类列表
  public async getClassList(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Class.find({ itemId: params.itemId });
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

  public async getClass(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.Class.findOne(params);
      return results;
    } catch (err) {
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
      // console.log('params24:',params)
      // const results = await ctx.model.Class.deleteOne({ _id: params._id });
      const results = await ctx.model.Class.deleteMany(params);
      // const results = await ctx.model.Class.deleteMany({ _id: '629db42806686b23d8b2d4d1'},{ _id: '629dbf74f0f86c7fa53692ec'});
      // console.log('results24:',results)
      return results;
    } catch (err) {
      return {
        code: 500,
        msg: JSON.stringify(err),
      };
    }
  }

}

export default ApiClass;