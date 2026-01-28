export default {
  collections: {
    users: {
      singular: "Gebruiker",
      plural: "Gebruikers",
    },
    media: {
      singular: "Media",
      plural: "Media",
    },
    topverhalen: {
      singular: "Topverhaal",
      plural: "Topverhalen",
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
      plural: "Hero's",
      fields: {
        title: {
          label: "Titel",
          description: "Hoofdtitel die over de media wordt getoond",
        },
        subtitle: {
          label: "Ondertitel",
          description: "Optionele ondertitel onder de hoofdtitel",
        },
        mediaType: {
          label: "Media Type",
          description: "Kies tussen een afbeelding of video",
          options: {
            image: "Afbeelding",
            video: "Video",
          },
        },
        mediaImage: {
          label: "Achtergrondafbeelding",
          description: "Upload een afbeelding als hero achtergrond",
        },
        focusPoint: {
          label: "Focus Punt",
          description:
            "Klik op het belangrijkste punt in de afbeelding (bijv. gezicht). Dit blijft altijd zichtbaar bij cropping.",
        },
        videoUrl: {
          label: "Video URL (HLS)",
          description: "HLS stream URL van de video (bijv. https://.../.m3u8)",
        },
        overlayOpacity: {
          label: "Overlay Transparantie (%)",
          description:
            "Donkere overlay over de media (0 = geen, 100 = volledig zwart)",
        },
      },
    },
    text: {
      singular: "Tekst",
      plural: "Tekst Blokken",
      fields: {
        content: {
          label: "Inhoud",
          description: "De tekstinhoud van dit block",
        },
        isIntro: {
          label: "Is intro paragraaf",
          description:
            "Toon deze tekst groter en dikker (voor lead paragraphs)",
        },
      },
    },
    image: {
      singular: "Afbeelding",
      plural: "Afbeeldingen",
      fields: {
        image: {
          label: "Afbeelding",
          description: "De afbeelding die getoond wordt",
        },
        focusPoint: {
          label: "Focus Punt",
          description:
            "Klik op het belangrijkste punt in de afbeelding. Dit blijft altijd zichtbaar bij cropping.",
        },
        caption: {
          label: "Bijschrift",
          description: "Optioneel bijschrift onder de afbeelding",
        },
        alt: {
          label: "Alt tekst",
          description:
            "Beschrijving van de afbeelding voor toegankelijkheid en SEO",
        },
      },
    },
  },
  fields: {
    role: "Rol",
    fullName: "Volledige Naam",
    alt: "Alt Tekst",
    title: "Titel",
    slug: "Slug",
    content: "Inhoud",
    blocks: "Blokken",
    intro: "Introductie",
    description: "Beschrijving",
    name: "Naam",
    image: "Afbeelding",
    featuredImage: "Uitgelichte Afbeelding",
    status: "Status",
  },
};
