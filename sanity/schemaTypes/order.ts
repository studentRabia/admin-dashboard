import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  type: "document",
  title: "Order",
  initialValue: () => ({
    orderDate: new Date().toISOString(), // ✅ Auto-set current date
    status: "Pending",                   // ✅ Default status
  }),
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "zipCode",
      title: "Zip Code",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "subTotal",
      title: "Sub Total",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    // ✅ Products in Order
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "product", title: "Product", type: "reference", to: [{ type: "products" }] },
            { name: "quantity", title: "Quantity", type: "number", validation: (Rule) => Rule.min(1) },
            { name: "price", title: "Price", type: "number", validation: (Rule) => Rule.min(0) },
          ],
        },
      ],
    }),

    // ✅ Customer Reference
    defineField({
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "user" }], // Make sure 'user' schema exists
    }),

    // ✅ Order Date
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
    }),

    // ✅ Single Status Field
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "Pending" },
          { title: "Processing", value: "Processing" },
          { title: "Shipped", value: "Shipped" },
          { title: "Delivered", value: "Delivered" },
          { title: "Cancelled", value: "Cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "Pending",
    }),

    defineField({
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",  // ✅ Wrapping in object
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "products" }], // Make sure 'products' schema exists
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.min(1),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) => Rule.min(0),
            },
          ],
        },
      ],
    })
    

    
    
  ],
});
