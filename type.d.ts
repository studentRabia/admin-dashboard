// export interface Order {
//     id?: string;
//     _createdAt?: string;
//     firstName: string;
//     lastName: string;
//     address: string;
//     city: string;
//     zipCode: string;
//     phone: string;
//     email: string;
//     discount: number;
//     subTotal: number;
//     totalAmount: number;
//     products: ProductInOrder[];
//     customer?: CustomerReference;
//     orderDate: string; // ISO datetime format
//     status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
//     cartItems: CartItem[];
//   }
  
//   export interface ProductInOrder {
//     product: ProductReference;
//     quantity: number;
//     price: number;
//   }
  
//   export interface CartItem {
//     product: ProductReference;
//      title: string;
//      image?: any;
//     quantity: number;
//     price: number;
//   }
  
//   export interface ProductReference {
//     _ref: string;
//     _type: 'reference';
//   }
  
//   export interface CustomerReference {
//     _ref: string;
//     _type: 'reference';
//   }
  






  





export interface Category {
  _id: string;               // Sanity document ID
  _createdAt: string;        // Document creation timestamp
  title: string;             // Category Title
  image?: {                  // Optional, since image might not be present
      _type: 'image';
      asset: {
          _ref: string;
          _type: 'reference';
      };
  };
  products: number;          // Number of Products
}


export interface Order {
  _id: string;         
  _createdAt: string;        // Document creation timestamp
  firstName: string;         // Customer's first name
  lastName: string;          // Customer's last name
  address: string;           // Shipping address
  city: string;              // City
  zipCode: string;           // Postal code
  phone: string;             // Contact number
  email: string;             // Email address
  discount: number;          // Applied discount
  subTotal: number;          // Subtotal before discount
  totalAmount: number;       // Final amount after discount
  products: ProductItem[];   // List of products in the order
  customer: {
    _ref: string;            // Reference to the customer document
    _type: 'reference';
  };
  orderDate: string;         // Order date in ISO format
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'; // Order status
  cartItems: CartItem[];     // Items in the cart
}

export interface ProductItem {
  product: {
    _ref: string;            // Reference to the product document
    _type: 'reference';
  };
  quantity: number;          // Quantity of the product
  price: number;             // Price of the product
}

export interface CartItem {
  product: {
    _ref: string;            // Reference to the product document
    _type: 'reference';
  };
  quantity: number;          // Quantity of the item
  price: number;            // Price of the item
  title: string; 
  image?: {                  // Product Image (optional)
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}


export interface Product {
  _id: string;               // Sanity document ID
  _createdAt: string;        // Document creation timestamp
  title: string;             // Product Title
  price: number;             // Discounted Price
  priceWithoutDiscount: number; // Original Price without Discount
  badge?: string;            // Badge (optional)
  image?: {                  // Product Image (optional)
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  category: {
    _ref: string;            // Reference to the category document
    _type: 'reference';
  };
  description: string;       // Product Description
  inventory: number;         // Inventory Management
  tags?: ('featured' | 'instagram' | 'gallery')[]; // Optional tags with predefined values
}


export interface User {
  _id: string;               // Sanity document ID
  _createdAt: string;        // Document creation timestamp
  name: string;              // User's Name
  email: string;             // User's Email
  phone: string;             // User's Phone Number
}
