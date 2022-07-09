export const vCreate = () => {
  return {
    title: { type: 'string', required: true },
    itemId: { type: 'string', required: true },
    classId: { type: 'string', required: true },
    method: { type: 'string', required: true },
    path: { type: 'string', required: true }
  }
}
export const vGetList = () => {
  return {
    itemId: { type: 'string', required: true },
    classId: { type: 'string', required: true },
  }
}
export const vGetDetail = () => {
  return {
    _id: { type: 'string', required: true }
  }
}
export const vUpdate = () => {
  return {
    _id: { type: 'string', required: true }
  }
}