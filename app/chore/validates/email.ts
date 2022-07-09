export const vEmail = () => {
  return {
    email: { type: 'email', required: true },
    username: { type: 'string', required: true },
    type: { type: 'string', required: true }
  }
}