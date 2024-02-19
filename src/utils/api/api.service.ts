import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { config } from '@/config'

import type { APIError } from './models/Error'
import type { Either } from './models/Result'
import { left, right } from './models/Result'

const axiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: config.api_base_url,
  })
}

const client = axiosInstance()

export abstract class APIService {
  protected static async request<Response, Request = unknown>(
    options: AxiosRequestConfig<Request>
  ): Promise<Either<APIError, Response>> {
    try {
      const response = await client<Response>(options)
      return right(response.data)
    } catch (error: any) {
      return left(error.response.data)
    }
  }
}
