import axios from 'axios';
import { ITypes } from './UserDetails';

export class UserService {
  private static readonly BASE_URL = 'https://dummyjson.com/products';

  public static async getAllProducts(): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(this.BASE_URL);
    
    return response.data.products;
  }

  public static async getProductById(id: number): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(`${this.BASE_URL}/${id}`);
    return response.data.products;
  }

  public static async getProductsByRating(rating: number): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(`${this.BASE_URL}?rating=${rating}`);
    return response.data.products;
  }

  public static async getProductsByCategory(category: string): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(`${this.BASE_URL}?category=${category}`);
    return response.data.products;
  }
}
