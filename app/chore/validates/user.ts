export const vUser = () => {
  return {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true }
  }
}

export const vRegister = () => {
  return {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    email: { type: 'string', required: true }
  }
}