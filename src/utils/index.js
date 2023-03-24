/*
 * @Author: Mx
 * @Date: 2023-03-24 11:49:15
 * @Description: 
 */
export const successResponseWrap = (data) => {
    return {
      data,
      status: 'ok',
      msg: '请求成功',
      code: 200,
    };
  };