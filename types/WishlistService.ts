import axios from 'axios';
import { ITypes } from './UserDetails';

interface IWishlistItem {
  id: number;
  productId: number;
}

export class WishlistService {
  public static readonly WISHLIST_API_BASE_URL = 'https://642ec45a8ca0fe3352d85666.mockapi.io/wishlist';

  public static async getWishlist(): Promise<ITypes[]> {
    const response = await axios.get<IWishlistItem[]>(this.WISHLIST_API_BASE_URL);
    const wishlistItemIds = response.data.map(item => item.productId);
    const products = await Promise.all(wishlistItemIds.map(id => this.getProductById(id)));
    return products;
  }

  public static async addToWishlist(productId: number): Promise<IWishlistItem> {
    const newItem: IWishlistItem = {
      productId,
      id: 0
    };
    const response = await axios.post<IWishlistItem>(this.WISHLIST_API_BASE_URL, newItem);
    newItem.id = response.data.id;
    return newItem;
  }

  public static async removeFromWishlist(id: number): Promise<void> {
    await axios.delete(`${this.WISHLIST_API_BASE_URL}/${id}`);
  }

  public static async getProductById(id: number): Promise<ITypes> {
    const response = await axios.get<{ products: ITypes }>(`https://dummyjson.com/products/${id}`);
    return response.data.products;
  }
}
