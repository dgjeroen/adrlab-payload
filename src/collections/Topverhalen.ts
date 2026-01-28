import type { CollectionConfig } from "payload";
import { admins, adminsAndEditors, contentCreators } from "@/access";
import { t } from "@/i18n/t";
import { Hero, Text, Image } from "@/blocks";

export const Topverhalen: CollectionConfig = {
  slug: "topverhalen",
  labels: {
    singular: t("collections.topverhalen.singular"),
    plural: t("collections.topverhalen.plural"),
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "publishedAt"],
    livePreview: {
      url: ({ data }: { data: any }) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          process.env.PAYLOAD_PUBLIC_SERVER_URL ||
          "http://localhost:3000";
        return `${baseUrl}/topverhalen/${data.slug}`;
      },
      breakpoints: [
        {
          name: "mobile",
          label: "Mobile",
          width: 375,
          height: 667,
        },
        {
          name: "tablet",
          label: "Tablet",
          width: 768,
          height: 1024,
        },
        {
          name: "desktop",
          label: "Desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  access: {
    create: contentCreators,
    read: ({ req: { user } }) => {
      if (!user) return { _status: { equals: "published" } };
      if (user.role === "admin" || user.role === "editor") return true;
      return { _status: { equals: "published" } };
    },
    update: contentCreators,
    delete: admins,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 2000, // 2 seconds
      },
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: t("fields.title"),
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: t("fields.slug"),
      unique: true,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "intro",
      type: "textarea",
      label: t("fields.intro"),
      maxLength: 300,
    },
    {
      name: "featuredImage",
      type: "relationship",
      relationTo: "media",
      label: t("fields.featuredImage"),
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "blocks",
      type: "blocks",
      label: t("fields.blocks"),
      blocks: [
        // Alle blocks zijn nu geïmporteerd van /src/blocks/
        Hero,
        Text,
        Image,
      ],
    },
    {
      name: "_status",
      type: "select",
      label: t("fields.status"),
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      access: {
        update: ({ req: { user } }) =>
          user?.role === "admin" || user?.role === "editor",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Published At",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          // Validate: max 1 intro block
          const introBlocks =
            data.blocks?.filter(
              (block: any) => block.blockType === "text" && block.isIntro,
            ) || [];

          if (introBlocks.length > 1) {
            throw new Error("Maximum 1 intro block allowed");
          }
        }
        return data;
      },
    ],
  },
};
