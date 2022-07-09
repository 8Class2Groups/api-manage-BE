export const vCreate = () => {
  return {
    name: { type: 'string', required: true },
    workspaceId: { type: 'string', required: true }
  }
}
export const vGetList = () => {
  return {
    workspaceId: { type: 'string', required: true }
  }
}

export const vGetDetail = () => {
  return {
    itemId: { type: 'string', required: true }
  }
}

export const vDelete = () => {
  return {
    itemId: { type: 'string', required: true }
  }
}

export const vUpdate = () => {
  return {
    itemId: { type: 'string', required: true },
    name: { type: 'string', required: true }
  }
}