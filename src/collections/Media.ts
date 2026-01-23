import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { t } from "@/i18n/t";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  labels: {
    singular: t("collections.media.singular"),
    plural: t("collections.media.plural"),
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: t("fields.alt"),
      required: true,
    },
  ],
};
