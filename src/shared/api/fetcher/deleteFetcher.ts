import { getBearerToken } from "src/shared/lib/getBearerToken";
import { axiosInstance } from "../axiosInstance";

export async function deleteFetcher (url: string, {arg}: {arg: number}) {
  try {
    const response = await axiosInstance.delete(`${url}/${arg}`, {
      headers: {
        Authorization: getBearerToken()
      },
    })

return response.data
  } catch (e) {
    throw e
  }
}
