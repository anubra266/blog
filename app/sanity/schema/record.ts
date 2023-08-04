import { ComposeIcon, ThListIcon } from '@sanity/icons'
import { Disc } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const recordType = defineType({
  name: 'record',
  title: 'Record',
  type: 'document',
  icon: Disc,
  fieldsets: [
    {
      name: 'rating',
      title: 'Rating',
      description: 'These fields are written to from the Remix front end',
      options: { columns: 2 },
    },
  ],
  groups: [
    {
      name: 'details',
      title: 'Details',
      icon: ThListIcon,
    },
    {
      name: 'editorial',
      title: 'Editorial',
      icon: ComposeIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'details',
    }),
    defineField({
      name: 'date',
      type: 'date',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean',
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [{ type: 'record' }],
                  },
                ],
              },
            ],
          },
        },
        { type: 'code' },
        { type: 'image' },
      ],
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        // subtitle: artist,
        media,
      }
    },
  },
})
