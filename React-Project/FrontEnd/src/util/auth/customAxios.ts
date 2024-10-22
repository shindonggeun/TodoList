/* eslint-disable */
// http-commons.ts
import axios from 'axios'

const { VITE_REACT_API_URL } = import.meta.env

// Axios 인스턴스 생성 함수
const createAxiosInstance = (baseURL?: string) => {

  const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL ?? '',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })

  // TODO: 추후에 토큰 사용 시 인터셉터 설정

  return instance
}

// 설정된 API URL을 사용하는 Axios 인스턴스
const customAxios = createAxiosInstance(VITE_REACT_API_URL)

export { customAxios }