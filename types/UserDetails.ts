// export interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   email: string;
//   phone: string;
//   username: string;
//   password: string;
//   image: string;
//   address: {
//     address: string;
//     city: string;
//     coordinates: {
//       lat: number;
//       lng: number;
//     };
//     postalCode: string;
//     state: string;
//   };
//   bank: {
//     cardExpire: string;
//     cardNumber: string;
//     cardType: string;
//     currency: string;
//     iban: string;
//   };
//   company: {
//     address: {
//       address: string;
//       city: string;
//       coordinates: {
//         lat: number;
//         lng: number;
//       };
//       postalCode: string;
//       state: string;
//     };
//     department: string;
//     name: string;
//     title: string;
//   };
// }

export interface ITypes {
  productId: number;
  sold: any;
  data: any;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: (string)[] | null;
}


export interface User {
  id: number;
  firstName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  address: Address;
  company: Company;
  image: string;  
}
export interface Address {
  address: string;
  city: string;
  postalCode: string;
  state: string;
}
export interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}
