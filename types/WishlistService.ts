import axios from 'axios';
import { ITypes } from './UserDetails';

interface IWishlistItem {
    id: number;
    productId: number;
}  

export class WishlistService {
  private static readonly WISHLIST_API_BASE_URL = 'https://642ec45a8ca0fe3352d85666.mockapi.io/wishlist';

  public static async getWishlist(): Promise<ITypes[]> {
    const response = await axios.get<IWishlistItem[]>(this.WISHLIST_API_BASE_URL);
    const wishlistItemIds = response.data.map(item => item.productId);
    const products = await Promise.all(wishlistItemIds.map(id => this.getProductById(id)));
    return products;
  }

  public static async addToWishlist(productId: number): Promise<void> {
    const newItem: IWishlistItem = {
        productId,
        id: 0
    };
    const response = await axios.post<IWishlistItem>(this.WISHLIST_API_BASE_URL, newItem);
    newItem.id = response.data.id; 
  }
  

  public static async removeFromWishlist(productId: number): Promise<void> {
    const response = await axios.get<IWishlistItem[]>(`${this.WISHLIST_API_BASE_URL}?productId=${productId}`);
    const itemToDelete = response.data[0];
    if (!itemToDelete) {
      throw new Error(`Product with ID ${productId} is not in the wishlist`);
    }
    await axios.delete(`${this.WISHLIST_API_BASE_URL}/${itemToDelete.id}`);
  }

  public static async getProductById(id: number): Promise<ITypes> {
    const response = await axios.get<{ products: ITypes }>(`https://dummyjson.com/products/${id}`);
    return response.data.products;
  }
}
