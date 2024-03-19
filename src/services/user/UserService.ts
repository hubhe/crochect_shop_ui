import { handleAuthError, userFetch } from "../ServiceUtil";
import { RegisterRensponse } from "../auth/types";
import { IUser } from "./types"

export async function getUserNameById(id: string): Promise<any> {
    try {
      const response = await userFetch.get<IUser>(`/user/${id}`);
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
}