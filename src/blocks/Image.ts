import type { Block } from "payload";
import { t } from "@/i18n/t";

export const Image: Block = {
  slug: "image",
  interfaceName: "ImageBlock",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: t("blocks.image.fields.image.label"),
      admin: {
        description: t("blocks.image.fields.image.description"),
      },
    },
    {
      name: "caption",
      type: "text",
      label: t("blocks.image.fields.caption.label"),
      admin: {
        description: t("blocks.image.fields.caption.description"),
      },
    },
    {
      name: "alt",
      type: "text",
      label: t("blocks.image.fields.alt.label"),
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
