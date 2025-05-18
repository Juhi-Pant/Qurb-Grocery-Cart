import axios from 'axios'
import type {Product} from '../types/type'

export async function fetchProducts(): Promise<Product[]> {
   try {
    const response = await axios.get (
        'https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all'
    );
    return response.data;

   } catch (error) {
    console.error('Error fetching products', error)
    return []
   }
}