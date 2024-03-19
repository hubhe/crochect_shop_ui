import { handleAuthError, userFetch } from "../ServiceUtil";
import { RegisterRensponse } from "../auth/types";
import { BaseItem } from "./types";


export async function updateItem(data: FormData): Promise<boolean> {
    try {
        const token = localStorage.getItem('accessToken')
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
  
        const response = await userFetch.put(`/items/`, data, { headers });
  
        const success = response.data.success;
  
        return success ? true : false;
    } catch (error) {
        // Handle error
        return false;
    }
  }
  
  export async function createItem(formData: FormData): Promise<any> {
    try {
      const response = await userFetch.post('/items', formData);
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
  }

  export async function getItemById(_id:string): Promise<any> {
    try {
      const response = await userFetch.get<RegisterRensponse>(`/item/${_id}`);
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
  }

  export async function getAllItems(): Promise<BaseItem[]> {
    try {
      const res = await userFetch.get('/items');
      return res.data;
    } catch (error) {
      handleAuthError(error);
      return [];
    }

  }
 
  export async function getAllUploaders(items: string[]): Promise<Record<string, string>> {
    try {
        const res = await userFetch.get('/items/uploaders', {
            params: { items }
        });
        return res.data;
    } catch (error) {
        handleAuthError(error);
        return {};
    }
}

 