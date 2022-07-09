export default (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema

  /**
   * 接口请求参数-Query
   */
  const ResSchema = new Schema({
    // 基础设置
    title: { // 参数名称
      type: String,
      Resuired: false
    },
    type: { // 类型
      type: String,
      required: false
    },
    mock: { // mock
      type: String,
      required: false
    },
    description: { // 备注
      type: String,
      required: false
    },
    required: { // 是否必须（1：必须；0：不必须）
      type: String,
      required: false
    },
    // 高级设置
    default: { // 默认值
      type: String,
      required: false
    },
    exclusiveMinimum: { // 开启后，数据必须大于最小值
      type: String,
      required: false
    },
    exclusiveMaximum: { // 开启后，数据必须小于最大值
      type: String,
      required: false
    },
    minimum: { // 最小值
      type: String,
      required: false
    },
    maximum: { // 最大值
      type: String,
      required: false
    },
    enum: { // 枚举
      type: Array,
      required: false
    },
    enumDesc: { // 枚举备注
      type: String,
      required: false
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
  

  return mongoose.model('Res', ResSchema)
}