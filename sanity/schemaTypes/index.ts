import { type SchemaTypeDefinition } from 'sanity'
import order from './order'
import { categorySchema } from './categories'
import user from './user'
import { productSchema } from './products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types:  [productSchema, user, order, categorySchema],
}
