import { defineType } from "sanity";

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
      { name: 'description', type: 'text', title: 'Description', validation: (Rule) => Rule.required() },
      { name: 'price', type: 'number', title: 'Price', validation: (Rule) => Rule.required() },
      {
        name: 'productImage',
        type: 'image',
        title: 'Product Image',
        validation: (Rule) => Rule.required(),
      },
      { name: 'tags', type: 'array', title: 'Tags', of: [{ type: 'string' }] },
      { name: 'discountPercentage', type: 'number', title: 'Discount Percentage' },
      { name: 'isNew', type: 'boolean', title: 'New Badge' },
    ],
  });
  
