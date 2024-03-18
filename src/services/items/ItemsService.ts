import { handleAuthError, userFetch } from "../ServiceUtil";
import { RegisterRensponse } from "../auth/types";


export async function updateItem(data: FormData): Promise<boolean> {
    try {
        const token = localStorage.getItem('accessToken')
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
  
        const response = await userFetch.put(`/item/`, data, { headers });
  
        const success = response.data.success;
  
        return success ? true : false;
    } catch (error) {
        // Handle error
        return false;
    }
  }
  
  export async function createItem(formData: FormData): Promise<any> {
    try {
      const response = await userFetch.post<RegisterRensponse>('/item', formData);
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
  }

  export async function getItems(): Promise<any> {
    try {
      const response = await userFetch.get<RegisterRensponse>('/item');
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
  }