export default (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema

  const ClassSchema = new Schema({
    workspaceId: { // 工作区唯一标识
      type: String,
      required: true
    },
    itemId: { // 项目唯一标识
      type: String,
      required: true
    },
    parentClassId: { // 接口分类唯一标识，创建嵌套接口分类
      type: String,
      // select: false, // 查询中不包含该字段
      required: false
    },
    className: { // 接口分类名称
      type: String,
      required: true
    },
    classRemark: { // 接口分类备注
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

  return mongoose.model('Class', ClassSchema)
}