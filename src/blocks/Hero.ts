import type { Block } from "payload";
import { t } from "@/i18n/t";

/**
 * Hero Block
 *
 * Een full-width hero sectie met:
 * - Achtergrondafbeelding
 * - Title en subtitle overlay
 * - Configureerbare overlay opacity
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
      label: t("blocks.hero.fields.title.label"),
      admin: {
        description: t("blocks.hero.fields.title.description"),
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: t("blocks.hero.fields.subtitle.label"),
      admin: {
        description: t("blocks.hero.fields.subtitle.description"),
      },
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
      label: t("blocks.hero.fields.media.label"),
      admin: {
        description: t("blocks.hero.fields.media.description"),
      },
    },
    {
      name: "overlayOpacity",
      type: "number",
      label: t("blocks.hero.fields.overlayOpacity.label"),
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        step: 5,
        description: t("blocks.hero.fields.overlayOpacity.description"),
      },
    },
  ],
  labels: {
    singular: t("blocks.hero.singular"),
    plural: t("blocks.hero.plural"),
  },
};
  },
};
