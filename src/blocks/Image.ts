import type { Block } from 'payload'

export const Image: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Afbeelding',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bijschrift',
      admin: {
        description: 'Optioneel bijschrift onder de afbeelding',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt tekst',
      required: true,
      admin: {
        description: 'Beschrijving van de afbeelding voor toegankelijkheid',
      },
    },
  ],
  labels: {
    singular: 'Afbeelding',
    plural: 'Afbeeldingen',
  },
}
