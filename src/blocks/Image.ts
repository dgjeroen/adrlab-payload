import type { Block } from "payload";
import en from "@/i18n/en";
import nl from "@/i18n/nl";

/**
 * Image Block
 *
 * Een afbeelding block met:
 * - Upload field naar Media collection
 * - Focus point voor responsive cropping
 * - Caption (optioneel bijschrift)
 * - Alt text (verplicht voor toegankelijkheid)
 *
 * Focus Point:
 * Het focus point bepaalt welk deel van de afbeelding altijd zichtbaar
 * blijft bij responsive cropping. Handig voor gezichten, logo's, of
 * andere belangrijke elementen.
 */
export const Image: Block = {
  slug: "image",
  interfaceName: "ImageBlock",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: {
        en: en.blocks.image.fields.image.label,
        nl: nl.blocks.image.fields.image.label,
      },
      admin: {
        description: {
          en: en.blocks.image.fields.image.description,
          nl: nl.blocks.image.fields.image.description,
        },
      },
    },
    {
      name: "focusPoint",
      type: "point",
      label: {
        en: en.blocks.image.fields.focusPoint.label,
        nl: nl.blocks.image.fields.focusPoint.label,
      },
      admin: {
        description: {
          en: en.blocks.image.fields.focusPoint.description,
          nl: nl.blocks.image.fields.focusPoint.description,
        },
      },
    },
    {
      name: "caption",
      type: "text",
      label: {
        en: en.blocks.image.fields.caption.label,
        nl: nl.blocks.image.fields.caption.label,
      },
      admin: {
        description: {
          en: en.blocks.image.fields.caption.description,
          nl: nl.blocks.image.fields.caption.description,
        },
      },
    },
    {
      name: "alt",
      type: "text",
      label: {
        en: en.blocks.image.fields.alt.label,
        nl: nl.blocks.image.fields.alt.label,
      },
      required: true,
      admin: {
        description: {
          en: en.blocks.image.fields.alt.description,
          nl: nl.blocks.image.fields.alt.description,
        },
      },
    },
  ],
  labels: {
    singular: {
      en: en.blocks.image.singular,
      nl: nl.blocks.image.singular,
    },
    plural: {
      en: en.blocks.image.plural,
      nl: nl.blocks.image.plural,
    },
  },
};
      required: true,
      admin: {
        description: t("blocks.image.fields.alt.description"),
      },
    },
  ],
  labels: {
    singular: t("blocks.image.singular"),
    plural: t("blocks.image.plural"),
  },
};
