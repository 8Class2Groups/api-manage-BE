/**
 * @desc 生成邮件验证码
 * @returns 1234
 */
export function generatorEmailCode(): string {
  return Math.random().toString().slice(2, 6);
};

/**
 * @desc 并行任务，成功与失败合集
 */
export async function allTask(task) {
  const rejectHandler = reason => ({ status: 'rejected', reason });
  const resolveHandler = value => ({ status: 'fulfilled', value });
  const convertedPromises = task.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
  return Promise.all(convertedPromises);
}