import axios from "axios";
import { ITypes } from "./UserDetails";

export class UserService {
  private static readonly BASE_URL = "https://dummyjson.com/products";

  public static async getAllProducts(limit: number): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(
      `${this.BASE_URL}?limit=${limit}`
    );
    return response.data.products;
  }

  public static async getProductById(id: string): Promise<ITypes> {
  const response = await axios.get<ITypes>(
    `${this.BASE_URL}/${id}`
  );
  return response.data;
}

  public static async getProductsByRating(
    rating: number,
    limit: number
  ): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(
      `${this.BASE_URL}?limit=${limit}&rating=${rating}`
    );
    const products = response.data.products;
    const sortedProducts = products.sort((a, b) => b.rating - a.rating);
    const filteredProducts = sortedProducts.filter(
      (product) => product.rating === rating
    );
    return filteredProducts;
  }

  public static async getProductsByCategory(
    category: string
  ): Promise<ITypes[]> {
    const response = await axios.get<{ products: ITypes[] }>(
      `${this.BASE_URL}?category=${category}`
    );
    return response.data.products;
  }
}
