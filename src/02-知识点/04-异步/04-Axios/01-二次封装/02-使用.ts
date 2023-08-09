import { http } from './01-封装'

export const apiService = {
  getExample() {
    return http.httpRequestGet('/v1.0/getData')
  }
}
