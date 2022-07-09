/**
 * @desc 生成邮件验证码
 * @returns 1234
 */
 export function generatorEmailCode(): string {
  return Math.random().toString().slice(2, 6);
};