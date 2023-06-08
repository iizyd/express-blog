import { TOKEN_NAME } from '@/constant'
import utils from '@/utils'
import axios, { AxiosRequestConfig } from 'axios'

interface ResBody {
	code: number
	data: any
	msg: string
}

const http = axios.create({
	baseURL: 'http://127.0.0.1:9000/',
	timeout: 10000,
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem(TOKEN_NAME) || ''
	}
})

http.interceptors.response.use(
	function (response) {
		return response.data as ResBody
	},
	function (error) {
		if (error && error.response) {
			switch (error.response.status) {
				case 401:
					utils.logout()
			}
		}
		return Promise.resolve(error.response)
	}
)

export const Get = (url: string, params: Record<string, any>): Promise<ResBody> => {
	return http.get(url, {
		params
	})
}

export const Post = (
	url: string,
	data: Record<string, any>,
	config: AxiosRequestConfig = {}
): Promise<ResBody> => {
	return http.post(url, data, config)
}

export const Put = (url: string, data: Record<string, any>): Promise<ResBody> => {
	return http.put(url, data)
}

export const Del = (url: string, data: Record<string, any>): Promise<ResBody> => {
	return http.delete(url, {
		data
	})
}
export default http
