import { handleAuthError, userFetch } from "../ServiceUtil";
import { RegisterRensponse } from "../auth/types";
import { BaseItem } from "./types";


export async function updateItem(_id: string, formData: FormData): Promise<any> {
  try {
    const response = await userFetch.put(`/items/item/${_id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
    return response;
  } catch (error) {
    return handleAuthError(error);
  }
  }
  
  export async function createItem(formData: FormData): Promise<any> {
    try {
      const response = await userFetch.post('/items', formData, {headers: {'Content-Type': 'multipart/form-data'}});
      return response;
    } catch (error) {
      return handleAuthError(error);
    }
  }

  export async function getItemById(_id:string): Promise<any> {
    try {
      const response = await userFetch.get<RegisterRensponse>(`/items/item/${_id}`);
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

  export async function getAllUserItems(): Promise<BaseItem[]> {
    try {
      const res = await userFetch.get('/items/my_items');
      return res.data;
    } catch (error) {
      console.log(handleAuthError(error));
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

 