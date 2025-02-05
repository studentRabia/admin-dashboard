// schemas/user.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "user",
  type: "document",
  title: "User",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
  ],
});
