import axios from 'axios'
import { apiUrl } from '#utils/app.infos'

export default class BaseApiService {
  protected static client () {
    return axios.create({
      baseURL: apiUrl
    })
  }

  protected static async get<T> (url: string): Promise<T> {
    const response = await this.client().get(url)
    return response.data
  }

  protected static async post<T> (url: string, data: any): Promise<T> {
    const response = await this.client().post(url, data)
    return response.data
  }

  protected static async put<T> (url: string, data: any): Promise<T> {
    const response = await this.client().put(url, data)
    return response.data
  }

  protected static async delete<T> (url: string): Promise<T> {
    const response = await this.client().delete(url)
    return response.data
  }
}
