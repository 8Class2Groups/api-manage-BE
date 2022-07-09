export default (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema
  
    /**
     * 接口请求参数-Query
     */
    const ReqSchema = new Schema({
      // Headers
      req_headers_name: { // 参数名称
        type: String,
        required: false
      },
      req_headers_value: { // 参数值
        type: String,
        required: false
      },
      req_headers_required: { // 是否必须（1：必须；0：不必须）
        type: String,
        required: false
      },
      req_headers_example: { // 示例
        type: String,
        required: false
      },
      req_headers_desc: { // 备注
        type: String,
        required: false
      },
      // Query
      req_query_name: { // 参数名称
        type: String,
        required: false
      },
      req_query_required: { // 是否必须（1：必须；0：不必须）
        type: String,
        required: false
      },
      req_query_example: { // 示例
        type: String,
        required: false
      },
      req_query_desc: { // 备注
        type: String,
        required: false
      },
      //Body
      req_body_name: { // 参数名称
        type: String,
        required: false
      },
      req_body_type: { // 参数类型
        type: String,
        required: false
      },
      req_body_required: { // 是否必须（1：必须；0：不必须）
        type: String,
        required: false
      },
      req_body_example: { // 示例
        type: String,
        required: false
      },
      req_body_desc: { // 备注
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
  
    return mongoose.model('Req', ReqSchema)
  }