export const vClass = () => {
  return {
    workspaceId: { type: 'string', required: true },
    itemId: { type: 'string', required: true },
    parentClassId: { type: 'string', required: false },
    className: { type: 'string', required: true },
    classRemark: { type: 'string', required: false }
  }
}

export const vDelete = () => {
  return {
    workspaceId: { type: 'string', required: true },
    itemId: { type: 'string', required: true },
    classId: { type: 'string', required: true }
  }
}

export const vUpdate = () => {
  return {
    workspaceId: { type: 'string', required: true },
    itemId: { type: 'string', required: true },
    classId: { type: 'string', required: true },
    className: { type: 'string', required: false },
    classRemark: { type: 'string', required: false }
  }
}

export const vGet = () => {
  return {
    workspaceId: { type: 'string', required: true },
    itemId: { type: 'string', required: true },
    // classId: { type: 'string', required: true },
  }
}