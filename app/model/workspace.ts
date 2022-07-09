export default (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema

  /**
   * 工作区关联用户
   * 后续是否增加工作区成员
   */
  const WorkspaceSchema = new Schema({
    ownerUid: { // 创建用户唯一标识
      type: String,
      required: true
    },
    private: { // 是否私有
      type: Number,
      required: true
    },
    name: { // 工作区名称
      type: String,
      required: true
    },
    remark: { // 工作区备注
      type: String,
      required: false,
    },
    workspaceId: { // 工作区唯一标识
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

  return mongoose.model('Workspace', WorkspaceSchema)
}