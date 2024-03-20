import { handleAuthError, userFetch } from "../ServiceUtil";
import { RegisterRensponse } from "../auth/types";
import { Comment } from './types'

export async function createComment(formData: FormData): Promise<any> {
    try {
      const response = await userFetch.post<RegisterRensponse>('/comment', formData);
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
}

export async function getCommentsByItem(id: string): Promise<Comment[]> {
  try {
    const response = await userFetch.get(`/comment/by_item/${id}`);
    return response.data;
  } catch (error) {
    handleAuthError(error);
    return []

  }
}