import { defineType, defineField } from 'sanity'
import { lookbookType } from './lookbookType'

const salonInfo = defineType({
  name: 'salonInfo',
  title: 'Salon Informatie',
  type: 'document',
  
  // Hiermee dwingen we de naam "Salon Informatie" af in de zijbalk
  preview: {
    prepare() {
      return {
        title: 'Salon Informatie'
      }
    }
  },

  // Hier definiëren we de tabbladen
  groups: [
    { name: 'tijden', title: 'Openingstijden', default: true },
    { name: 'fotos', title: "Lookbook & Foto's" }
  ],

  fields: [
    // --- OPENINGSTIJDEN ---
    defineField({ name: 'maandag', title: 'Maandag', type: 'string', group: 'tijden' }),
    defineField({ name: 'dinsdag', title: 'Dinsdag', type: 'string', group: 'tijden' }),
    defineField({ name: 'woensdag', title: 'Woensdag', type: 'string', group: 'tijden' }),
    defineField({ name: 'donderdag', title: 'Donderdag', type: 'string', group: 'tijden' }),
    defineField({ name: 'vrijdag', title: 'Vrijdag', type: 'string', group: 'tijden' }),
    defineField({ name: 'zaterdag', title: 'Zaterdag', type: 'string', group: 'tijden' }),
    defineField({ name: 'zondag', title: 'Zondag', type: 'string', group: 'tijden' }),

    // --- FOTO GALERIJ ---
    defineField({
      name: 'galerij',
      title: 'Lookbook Foto\'s',
      type: 'array',
      group: 'fotos',
      of: [{ 
        type: 'image',
        options: { hotspot: true }
      }]
    })
  ]
})

const dienstType = defineType({
  name: 'dienst',
  title: 'Dienst',
  type: 'document',
  fields: [
    { name: 'naam', title: 'Dienst naam', type: 'string', validation: Rule => Rule.required() },
    { name: 'prijs', title: 'Prijs', type: 'string', validation: Rule => Rule.required() },
    { name: 'volgorde', title: 'Volgorde', type: 'number', initialValue: 1 },
    { name: 'highlight', title: 'Uitgelicht', type: 'boolean', initialValue: false }
  ],
  preview: {
    select: { title: 'naam', prijs: 'prijs', volgorde: 'volgorde' },
    prepare(selection) {
      const { title, prijs, volgorde } = selection
      return {
        title: title || 'Naamloze dienst',
        subtitle: `EUR ${prijs || '-'} | Volgorde: ${volgorde ?? '-'}`,
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
})

const openingstijdType = defineType({
  name: 'openingstijd',
  title: 'Openingstijd',
  type: 'document',
  fields: [
    {
      name: 'dag',
      title: 'Dag',
      type: 'string',
      options: {
        list: [
          { title: 'Maandag', value: 'Maandag' },
          { title: 'Dinsdag', value: 'Dinsdag' },
          { title: 'Woensdag', value: 'Woensdag' },
          { title: 'Donderdag', value: 'Donderdag' },
          { title: 'Vrijdag', value: 'Vrijdag' },
          { title: 'Zaterdag', value: 'Zaterdag' },
          { title: 'Zondag', value: 'Zondag' }
        ]
      },
      validation: Rule => Rule.required()
    },
    { name: 'tijd', title: 'Tijd', type: 'string', validation: Rule => Rule.required() },
    { name: 'volgorde', title: 'Volgorde', type: 'number', initialValue: 1 }
  ],
  preview: {
    select: { title: 'dag', subtitle: 'tijd' }
  },
  orderings: [
    {
      title: 'Volgorde (laag naar hoog)',
      name: 'volgordeAsc',
      by: [{ field: 'volgorde', direction: 'asc' }]
    }
  ]
})

export const schemaTypes = [salonInfo, dienstType, lookbookType, openingstijdType]