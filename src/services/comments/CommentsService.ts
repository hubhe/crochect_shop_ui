import { handleAuthError, userFetch } from "../ServiceUtil";
import { RegisterRensponse } from "../auth/types";

export async function createComment(formData: FormData): Promise<any> {
    try {
      const response = await userFetch.post<RegisterRensponse>('/comment', formData);
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
}

export async function getCommentsByItem(id: string): Promise<any> {
  try {
    const response = await userFetch.get<RegisterRensponse>(`/comment/by_item/${id}`);
    return response;
  } catch (error) {
    return handleAuthError(error);
  }
}