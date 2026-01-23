import type { CollectionConfig } from "payload";
import { admins, adminsOrSelf } from "@/access";
import { t } from "@/i18n/t";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  labels: {
    singular: t("collections.users.singular"),
    plural: t("collections.users.plural"),
  },
  access: {
    create: admins,
    read: adminsOrSelf,
    update: adminsOrSelf,
    delete: admins,
  },
  fields: [
    {
      name: "role",
      type: "select",
      label: t("fields.role"),
      required: true,
      defaultValue: "author",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Author",
          value: "author",
        },
        {
          label: "Widget Creator",
          value: "widgetCreator",
        },
      ],
      saveToJWT: true,
      access: {
        update: admins,
      },
    },
    {
      name: "fullName",
      type: "text",
      label: t("fields.fullName"),
      virtual: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data?.email) {
              return data.email.split("@")[0];
            }
            return "Unknown";
          },
        ],
      },
    },
  ],
};
