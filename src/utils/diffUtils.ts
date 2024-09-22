import { create, diff } from 'jsondiffpatch';

export const compareJson = (left: string, right: string): any => {
  try {
    const leftObj = JSON.parse(left);
    const rightObj = JSON.parse(right);
    const diffPatcher = create();
    return diff(leftObj, rightObj);
  } catch (error) {
    throw new Error('无效的 JSON 格式');
  }
};