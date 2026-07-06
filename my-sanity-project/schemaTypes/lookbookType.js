export const lookbookType = {
  name: 'lookbook',
  title: 'Lookbook (Foto Galerij)',
  type: 'document',
  fields: [
    {
      name: 'volgorde',
      title: 'Volgorde',
      type: 'number',
      initialValue: 1,
      description: 'Lagere waarde = eerder in de lijst en op de website'
    },
    {
      name: 'title',
      title: 'Titel van de foto',
      type: 'string',
      description: 'Bijvoorbeeld: Modern kapsel of heren coupe (optioneel)'
    },
    {
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {
        hotspot: true // Hiermee kan de kapper de foto mooi uitsnijden in Sanity
      },
      validation: Rule => Rule.required() // Een foto is verplicht
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      volgorde: 'volgorde'
    },
    prepare(selection) {
      const { title, media, volgorde } = selection
      return {
        title: title || 'Lookbook foto',
        subtitle: `Volgorde: ${volgorde ?? '-'}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Volgorde (laag naar hoog)',
      name: 'volgordeAsc',
      by: [{ field: 'volgorde', direction: 'asc' }]
    }
  ]
}