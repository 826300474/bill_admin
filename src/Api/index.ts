import { request } from 'umi';

export async function addRecord(
    params?: { [key: string]: any },
    options?: { [key: string]: any },
  ) {
    return request('http://localhost:3000/api/index', {
      method: 'POST',
      data: {
        ...params,
      },
      ...(options || {}),
    });
  }

export async function getRecord(options?: { [key: string]: any }) {
  return request('http://localhost:3000/api/index', {
    method: 'GET',
    ...(options || {}),
  });
}
