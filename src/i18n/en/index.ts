export default {
  collections: {
    users: {
      singular: "User",
      plural: "Users",
    },
    media: {
      singular: "Media",
      plural: "Media",
    },
    topverhalen: {
      singular: "Story",
      plural: "Stories",
    },
    widgets: {
      singular: "Widget",
      plural: "Widgets",
    },
  },
  globals: {
    homepage: {
      label: "Homepage",
    },
  },
  blocks: {
    hero: {
      singular: "Hero",
      plural: "Heroes",
      fields: {
        title: {
          label: "Title",
          description: "Main title displayed over the media",
        },
        subtitle: {
          label: "Subtitle",
          description: "Optional subtitle below the main title",
        },
        mediaType: {
          label: "Media Type",
          description: "Choose between an image or video",
          options: {
            image: "Image",
            video: "Video",
          },
        },
        mediaImage: {
          label: "Background Image",
          description: "Upload an image as hero background",
        },
        focusPoint: {
          label: "Focus Point",
          description:
            "Click on the most important part of the image (e.g. face). This area will always remain visible when cropped.",
        },
        videoUrl: {
          label: "Video URL (HLS)",
          description: "HLS stream URL of the video (e.g. https://.../.m3u8)",
        },
        overlayOpacity: {
          label: "Overlay Opacity (%)",
          description:
            "Dark overlay over the media (0 = none, 100 = fully black)",
        },
      },
    },
    text: {
      singular: "Text",
      plural: "Text Blocks",
      fields: {
        content: {
          label: "Content",
          description: "The text content of this block",
        },
        isIntro: {
          label: "Is intro paragraph",
          description:
            "Display this text larger and bolder (for lead paragraphs)",
        },
      },
    },
    image: {
      singular: "Image",
      plural: "Images",
      fields: {
        image: {
          label: "Image",
          description: "The image to display",
        },
        focusPoint: {
          label: "Focus Point",
          description:
            "Click on the most important part of the image. This area will always remain visible when cropped.",
        },
        caption: {
          label: "Caption",
          description: "Optional caption below the image",
        },
        alt: {
          label: "Alt text",
          description: "Image description for accessibility and SEO",
        },
      },
    },
  },
  fields: {
    role: "Role",
    fullName: "Full Name",
    alt: "Alt Text",
    title: "Title",
    slug: "Slug",
    content: "Content",
    blocks: "Blocks",
    intro: "Intro",
    description: "Description",
    name: "Name",
    image: "Image",
    featuredImage: "Featured Image",
    status: "Status",
  },
};
