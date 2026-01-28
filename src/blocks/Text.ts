import type { Block } from "payload";
import en from "@/i18n/en";
import nl from "@/i18n/nl";

/**
 * Text Block
 *
 * Een tekst block met rich text editor (Lexical).
 *
 * Features:
 * - Bold, italic, links, lijsten
 * - "Intro" mode voor grotere, opvallende tekst (bijv. lead paragraph)
 * - Standaard mode voor normale body tekst
 *
 * Gebruik:
 * - Intro checkbox AAN → Lead paragraph (groter, dikker)
 * - Intro checkbox UIT → Normale body tekst
 */
export const Text: Block = {
  slug: "text",
  interfaceName: "TextBlock",
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
      label: {
        en: en.blocks.text.fields.content.label,
        nl: nl.blocks.text.fields.content.label,
      },
      admin: {
        description: {
          en: en.blocks.text.fields.content.description,
          nl: nl.blocks.text.fields.content.description,
        },
      },
    },
    {
      name: "isIntro",
      type: "checkbox",
      defaultValue: false,
      label: {
        en: en.blocks.text.fields.isIntro.label,
        nl: nl.blocks.text.fields.isIntro.label,
      },
      admin: {
        description: {
          en: en.blocks.text.fields.isIntro.description,
          nl: nl.blocks.text.fields.isIntro.description,
        },
      },
    },
  ],
  labels: {
    singular: {
      en: en.blocks.text.singular,
      nl: nl.blocks.text.singular,
    },
    plural: {
      en: en.blocks.text.plural,
      nl: nl.blocks.text.plural,
    },
  },
};
