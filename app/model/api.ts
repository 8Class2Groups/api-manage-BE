export default (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema
  
    /**
     * 接口
     */
    const ApiSchema = new Schema({
      title: { // 接口名称
        type: String,
        required: true
      },
    //   apiId: { // 接口唯一标识
    //     type: String,
    //     required: true
    //   },
      itemId: { // 所属项目唯一标识
        type: String,
        required: true
      },
      classId: { // 所属分类唯一标识
        type: String,
        required: true
      },
      method: { // 请求方法
        type: String,
        required: true
        // default: 'get'
      },
      path: { // 请求路径
        type: String,
        required: true
      },
      status: { // 接口的状态
        type: String,
        // required: true,
        default: '未完成'
      },
      tag: { // 接口的状态
        type: Array,
        // required: true,
        // default: []
      },
      createdAt: { // 创建时间
        type: Date,
        default: Date.now
      },
      updatedAt: { // 更新时间
        type: Date,
        default: Date.now
      }
    })
  
    return mongoose.model('Api', ApiSchema)
  }