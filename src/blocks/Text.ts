import type { Block } from "payload";
import { t } from "@/i18n/t";

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
      label: t("blocks.text.fields.content.label"),
      admin: {
        description: t("blocks.text.fields.content.description"),
      },
      // Je kunt hier later custom Lexical features toevoegen:
      // editor: lexicalEditor({
      //   features: ({ defaultFeatures }) => [...defaultFeatures, customFeature()]
      // })
    },
    {
      name: "isIntro",
      type: "checkbox",
      defaultValue: false,
      label: t("blocks.text.fields.isIntro.label"),
      admin: {
        description: t("blocks.text.fields.isIntro.description"),
      },
    },
  ],
  labels: {
    singular: t("blocks.text.singular"),
    plural: t("blocks.text.plural"),
  },
};
