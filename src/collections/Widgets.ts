import type { CollectionConfig } from "payload";
import { admins, widgetCreators } from "@/access";
import { t } from "@/i18n/t";

export const Widgets: CollectionConfig = {
  slug: "widgets",
  labels: {
    singular: t("collections.widgets.singular"),
    plural: t("collections.widgets.plural"),
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "createdBy"],
  },
  access: {
    create: widgetCreators,
    read: widgetCreators,
    update: ({ req: { user }, data }) => {
      // Only creator or admin can update
      if (user?.role === "admin") return true;
      return user?.id === data.createdBy;
    },
    delete: admins,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: t("fields.name"),
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: t("fields.description"),
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: [
        { label: "Interactive", value: "interactive" },
        { label: "Visualization", value: "visualization" },
        { label: "Embed", value: "embed" },
        { label: "Custom", value: "custom" },
      ],
    },
    {
      name: "files",
      type: "array",
      label: "Files",
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          label: "Widget File",
          required: true,
        },
        {
          name: "fileType",
          type: "select",
          label: "File Type",
          options: [
            { label: "JavaScript", value: "js" },
            { label: "CSS", value: "css" },
            { label: "HTML", value: "html" },
            { label: "Image", value: "image" },
          ],
        },
      ],
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      label: "Created By",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          async ({ req, data }) => {
            if (!data) return req.user?.id;
            return data;
          },
        ],
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
