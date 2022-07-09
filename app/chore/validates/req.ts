export const vCreate = () => {
  return {
    req_headers_name: { type: 'string', required: false },
    req_headers_value: { type: 'string', required: false },
    req_headers_required: { type: 'string', required: false },
    req_headers_example: { type: 'string', required: false },
    req_headers_desc: { type: 'string', required: false },
    req_query_name: { type: 'string', required: false },
    req_query_required: { type: 'string', required: false },
    req_query_example: { type: 'string', required: false },
    req_query_desc: { type: 'string', required: false },
    req_body_name: { type: 'string', required: false },
    req_body_type: { type: 'string', required: false },
    req_body_required: { type: 'string', required: false },
    req_body_example: { type: 'string', required: false },
    req_body_desc: { type: 'string', required: false },
  }
}
export const vGetList = () => {
  return {
    _id: { type: 'string', required: true },
  }
}
export const vUpdate = () => {
  return {
    _id: { type: 'string', required: true }
  }
}
export const vDelete = () => {
  return {
    _id: { type: 'string', required: true },
  }
}