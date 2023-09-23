import { BASE_URL } from "../common/config";

export interface ResData<T> {
  code: number;
  msg: string;
  data: T;
}

export interface PageData<T> {
  total: number
  page: number
  page_size: number
  data: T
}

export const fetchData = async <T>(
  path: string,
  query: { [key: string]: unknown }
): Promise<T> => {
  const queryItemArr = [];
  for (const key in query) {
    queryItemArr.push(`${key}=${query[key]}`);
  }

  const url = `${BASE_URL}${path}?${queryItemArr.join("&")}`;
  const response = await fetch(url);
  const resData: ResData<T> = await response.json();

  return resData.data;
};
