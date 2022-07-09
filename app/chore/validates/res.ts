export const vCreate = () => {
  return {
    title: { type: 'string', required: false },
    type: { type: 'string', required: false },
    mock: { type: 'string', required: false },
    description: { type: 'string', required: false },
    required: { type: 'string', required: false },
    default: { type: 'string', required: false },
    exclusiveMinimum: { type: 'string', required: false },
    exclusiveMaximum: { type: 'string', required: false },
    minimum: { type: 'string', required: false },
    maximum: { type: 'string', required: false },
    enum: { type: 'array', required: false },
    enumDesc: { type: 'string', required: false },
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