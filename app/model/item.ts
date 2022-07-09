export default (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema

  /**
   * 项目
   */
  const ItemSchema = new Schema({
    name: { // 项目名称
      type: String,
      required: true
    },
    workspaceId: { // 所属工作区唯一标识
      type: String,
      required: true
    },
    defaultPath: { // 基本路径
      type: String,
      // required: true
    },
    desc: { // 描述
      type: String,
      // required: true
    },
    itemId: { // 项目唯一标识
      type: String,
      required: true
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

  return mongoose.model('Item', ItemSchema)
}