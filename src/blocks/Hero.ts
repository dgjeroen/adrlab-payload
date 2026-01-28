import type { Block } from "payload";
import en from "@/i18n/en";
import nl from "@/i18n/nl";

/**
 * Hero Block
 *
 * Een full-width hero sectie met:
 * - Achtergrondafbeelding OF video (HLS)
 * - Focus point voor afbeeldingen (voor smart cropping)
 * - Title en subtitle overlay
 * - Configureerbare overlay opacity
 *
 * Media Types:
 * - Image: Upload met focus point voor responsive cropping
 * - Video: HLS stream URL (.m3u8)
 *
 * Focus Point:
 * Het focus point (375x750px viewport) bepaalt welk deel van de afbeelding
 * altijd zichtbaar blijft bij responsive cropping. Handig voor gezichten,
 * logo's, of andere belangrijke elementen.
 *
 * Gebruik: Voor het openen van artikelen met een visuele impact
 */
export const Hero: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: en.blocks.hero.fields.title.label,
        nl: nl.blocks.hero.fields.title.label,
      },
      admin: {
        description: {
          en: en.blocks.hero.fields.title.description,
          nl: nl.blocks.hero.fields.title.description,
        },
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: {
        en: en.blocks.hero.fields.subtitle.label,
        nl: nl.blocks.hero.fields.subtitle.label,
      },
      admin: {
        description: {
          en: en.blocks.hero.fields.subtitle.description,
          nl: nl.blocks.hero.fields.subtitle.description,
        },
      },
    },
    {
      name: "mediaType",
      type: "radio",
      required: true,
      defaultValue: "image",
      label: {
        en: en.blocks.hero.fields.mediaType.label,
        nl: nl.blocks.hero.fields.mediaType.label,
      },
      admin: {
        description: {
          en: en.blocks.hero.fields.mediaType.description,
          nl: nl.blocks.hero.fields.mediaType.description,
        },
        layout: "horizontal",
      },
      options: [
        {
          label: {
            en: en.blocks.hero.fields.mediaType.options.image,
            nl: nl.blocks.hero.fields.mediaType.options.image,
          },
          value: "image",
        },
        {
          label: {
            en: en.blocks.hero.fields.mediaType.options.video,
            nl: nl.blocks.hero.fields.mediaType.options.video,
          },
          value: "video",
        },
      ],
    },
    {
      name: "mediaImage",
      type: "upload",
      relationTo: "media",
      label: {
        en: en.blocks.hero.fields.mediaImage.label,
        nl: nl.blocks.hero.fields.mediaImage.label,
      },
      admin: {
        description: {
          en: en.blocks.hero.fields.mediaImage.description,
          nl: nl.blocks.hero.fields.mediaImage.description,
        },
        // Conditional: alleen tonen als mediaType === "image"
        condition: (data, siblingData) => siblingData?.mediaType === "image",
      },
    },
    {
      name: "focusPoint",
      type: "point",
      label: {
        en: en.blocks.hero.fields.focusPoint.label,
        nl: nl.blocks.hero.fields.focusPoint.label,
      },
      admin: {
        description: {
          en: en.blocks.hero.fields.focusPoint.description,
          nl: nl.blocks.hero.fields.focusPoint.description,
        },
        // Conditional: alleen tonen als mediaType === "image"
        condition: (data, siblingData) => siblingData?.mediaType === "image",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      label: {
        en: en.blocks.hero.fields.videoUrl.label,
        nl: nl.blocks.hero.fields.videoUrl.label,
      },
      admin: {
        description: {
          en: en.blocks.hero.fields.videoUrl.description,
          nl: nl.blocks.hero.fields.videoUrl.description,
        },
        placeholder: "https://example.com/video.m3u8",
        // Conditional: alleen tonen als mediaType === "video"
        condition: (data, siblingData) => siblingData?.mediaType === "video",
      },
    },
    {
      name: "overlayOpacity",
      type: "number",
      label: {
        en: en.blocks.hero.fields.overlayOpacity.label,
        nl: nl.blocks.hero.fields.overlayOpacity.label,
      },
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        step: 5,
        description: {
          en: en.blocks.hero.fields.overlayOpacity.description,
          nl: nl.blocks.hero.fields.overlayOpacity.description,
        },
      },
    },
  ],
  labels: {
    singular: {
      en: en.blocks.hero.singular,
      nl: nl.blocks.hero.singular,
    },
    plural: {
      en: en.blocks.hero.plural,
      nl: nl.blocks.hero.plural,
    },
  },
};
