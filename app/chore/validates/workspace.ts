export const vCreate = () => {
  return {
    name: { type: 'string', required: true },
    private: { type: 'number', required: true },
    uid: { type: 'string', required: true },
    remark: { type: 'string', required: false }
  }
}

export const vGetList = () => {
  return {
    uid: { type: 'string', required: true }
  }
}

export const vDelete = () => {
  return {
    workspaceId: {
      type: 'string', required: true
    }
  }
}

export const vUpdate = () => {
  return {
    workspaceId: {
      type: 'string', required: true
    },
    name: {
      type: 'string', required: false
    }
  }
}