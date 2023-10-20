import { getBearerToken } from "src/shared/lib/getBearerToken"
import { axiosInstance } from "../axiosInstance"


export async function updateFetcher(
  [url, id]: any,
  {arg: data}: { arg: any }
) {
  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value: string) => (
            formData.append(`${key}[]`, value)
          ))
        } else {
          formData.append(key, data[key])
        }
      }
    }
    const response = await axiosInstance.post(`${url}/${id}`, formData, {
      headers: {
        Authorization: getBearerToken()
      },
    })

return response.data
  } catch (e) {
    throw e
  }
}
