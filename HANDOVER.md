# Payload CMS Project Handover - adrlab-payload

**Datum**: 22 januari 2026  
**Project**: ADR Lab - Topverhalen CMS  
**Status**: ✅ Volledig werkend volgens Payload best practices

## 🎯 Project Overzicht

Dit is een **Payload CMS 3.0** project gebouwd met **Next.js 15** (App Router), **TypeScript**, **PostgreSQL** (Neon), en **Tailwind CSS**. Het systeem beheert "topverhalen" met een live preview functionaliteit.

### Tech Stack

- **Framework**: Next.js 15.4.10 (App Router)
- **CMS**: Payload CMS 3.x
- **Database**: PostgreSQL via Neon
- **Styling**: Tailwind CSS + Custom CSS
- **Rich Text**: Lexical Editor
- **Deployment**: Development (poort 3000)

---

## 📁 Project Structuur

```
src/
├── app/
│   ├── (frontend)/              # Publieke frontend
│   │   ├── layout.tsx          # Root layout met Tailwind CSS
│   │   ├── page.tsx            # Homepage
│   │   └── topverhalen/
│   │       ├── layout.tsx      # Topverhalen metadata
│   │       └── [slug]/
│   │           └── page.tsx    # Dynamische artikel pagina
│   └── (payload)/              # Payload admin routes
│
├── collections/                # Payload collections
│   ├── Users.ts               # Auth + RBAC (admin, editor, author, widgetCreator)
│   ├── Media.ts               # Upload collectie met image sizes
│   ├── Topverhalen.ts         # Hoofdcollectie met drafts & versions
│   └── Widgets.ts             # Widget upload collectie
│
├── globals/                   # Payload globals
│   └── Homepage.ts           # Homepage global met live preview
│
├── blocks/                    # Content blocks
│   ├── Hero.ts               # Hero block met media + custom title
│   ├── Image.ts              # Image block met caption
│   └── Text.ts               # Rich text block met intro optie
│
├── components/
│   ├── RenderBlocks.tsx      # Frontend block renderer
│   ├── LogoutButton/         # Custom logout component
│   ├── MediaUsageList/       # UI field: toont waar media gebruikt wordt
│   └── LivePreview/
│       ├── RefreshRouteOnSave.tsx    # Live preview refresh
│       └── LivePreviewListener.tsx   # (niet in gebruik)
│
├── fields/
│   ├── HeroTitle/            # Custom field voor hero titel
│   └── PreviewButton/        # Preview button field
│
├── access/
│   └── index.ts              # Access control patterns
│
├── i18n/                     # Internationalisatie (NL + EN)
│   ├── en/
│   ├── nl/
│   └── t.ts                  # Translation helper
│
└── payload.config.ts         # Hoofdconfiguratie
```

---

## ✅ Geïmplementeerde Features

### 1. Collections

#### **Users** (`src/collections/Users.ts`)

- ✅ Authentication enabled
- ✅ Roles: `admin`, `editor`, `author`, `widgetCreator`
- ✅ `saveToJWT: true` voor roles (performance)
- ✅ Virtual field: `fullName`
- ✅ Field-level access control op role field

#### **Topverhalen** (`src/collections/Topverhalen.ts`)

- ✅ Drafts met autosave (2 seconden interval)
- ✅ Scheduled publishing
- ✅ Version history (max 50 per document)
- ✅ Document locking (300 seconden / 5 minuten)
- ✅ Live preview configuratie
- ✅ Custom validation: max 1 intro block
- ✅ Hook: alleen editors/admins kunnen publishen
- ✅ Access control: publiek ziet alleen published content
- ✅ Blocks: Hero, Text, Image

#### **Media** (`src/collections/Media.ts`)

- ✅ Upload collectie met image optimization
- ✅ Image sizes: thumbnail (400x300), card (768x1024), tablet (1024xauto)
- ✅ Alt tekst verplicht
- ✅ Custom UI field: MediaUsageList (toont waar media gebruikt wordt)

#### **Widgets** (`src/collections/Widgets.ts`)

- ✅ Upload collectie voor widgets
- ✅ Custom UI field voor usage tracking

### 2. Globals

#### **Homepage** (`src/globals/Homepage.ts`)

- ✅ Titel + Rich text content
- ✅ Document locking (300 seconden / 5 minuten)
- ✅ Live preview met breakpoints
- ✅ Access: iedereen kan lezen, alleen admin/editor kan bewerken

### 3. Live Preview

**Status**: ✅ Volledig werkend met custom UI

**Implementatie**:

- `RefreshRouteOnSave` in frontend layout → refresht route bij save
- **Custom minimal preview** in admin panel: 375x750px (mobiel formaat), geen controls
- **"Open in nieuw venster" knop** naast preview toggle
- Nieuw venster toont volledig responsive preview met alle frontend styling
- Live preview URL gebruikt `NEXT_PUBLIC_SERVER_URL` environment variabele
- Breakpoints: Mobiel (375x667), Tablet (768x1024), Desktop (1440x900)
- Server Component pattern met `draft: true` voor laatste versie

**Custom Components**:

- `CustomLivePreview` - Verbergt preview controls via CSS, forceert 375x750px
- `OpenPreviewButton` - Button om preview in nieuw venster te openen

**Configuratie**:

```typescript
// Topverhalen: src/collections/Topverhalen.ts
livePreview: {
  url: ({ data }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ||
                    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
                    'http://localhost:3000'
    return `${baseUrl}/topverhalen/${data.slug}`
  },
  breakpoints: [...]
}
```

### 4. Access Control Patterns

**Bestand**: `src/access/index.ts`

Geïmplementeerde patronen:

- ✅ `anyone` - Publieke toegang
- ✅ `authenticated` - Alleen ingelogde users
- ✅ `admins` - Alleen admin role
- ✅ `adminsAndEditors` - Admin of editor
- ✅ `contentCreators` - Admin, editor of author
- ✅ `widgetCreators` - Admin of widgetCreator
- ✅ `adminsOrSelf` - Admin ziet alles, anderen alleen eigen content

**BELANGRIJK**: Alle access control volgt best practices:

- Row-level security met query constraints waar mogelijk
- Field-level access retourneert alleen boolean
- Roles opgeslagen in JWT (`saveToJWT: true`)

### 5. Frontend Rendering

**RenderBlocks Component** (`src/components/RenderBlocks.tsx`)

- ✅ Rendert Hero, Text, en Image blocks
- ✅ Hero: toont customTitle of page title, label, source, achtergrondafbeelding
- ✅ Text: intro styling (grotere tekst), Lexical RichText rendering
- ✅ Image: Next.js Image component met optimization
- ✅ Fallback voor onbekende block types
- ✅ Page title wordt doorgegeven aan Hero blocks

### 6. Custom Components

**LogoutButton** (`src/components/LogoutButton/`)

- ✅ Client component met custom styling
- ✅ Gebruikt Payload useLocale hook voor i18n

**MediaUsageList** (`src/components/MediaUsageList/`)

- ✅ Server component
- ✅ Toont welke topverhalen een media bestand gebruiken
- ✅ Zoekt in hero blocks en image blocks
- ✅ Links naar edit view van artikelen

**HeroTitleComponent** (`src/fields/HeroTitle/`)

- ✅ Client component met TextInput
- ✅ Toont fallback naar artikel titel
- ✅ Real-time preview van huidige titel

### 7. Internationalisatie

**Status**: ✅ NL + EN volledig geïmplementeerd

**Structuur**:

- `src/i18n/en/index.ts` - Engelse vertalingen
- `src/i18n/nl/index.ts` - Nederlandse vertalingen
- `src/i18n/t.ts` - Helper functie voor type-safe translations

**Gebruik**:

```typescript
import { t } from '@/i18n/t'

labels: {
  singular: t('collections.topverhalen.singular'),
  plural: t('collections.topverhalen.plural'),
}
```

---

## 🔧 Environment Variabelen

**Bestand**: `.env`

```env
# Database (PostgreSQL via Neon)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Payload
PAYLOAD_SECRET=your-secret-here

# Live Preview (BELANGRIJK!)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**KRITISCH**: `NEXT_PUBLIC_SERVER_URL` moet correct zijn voor live preview!

---

## 🚀 Development Workflow

### Starten

```bash
pnpm dev
# Server start op http://localhost:3000
# Admin panel: http://localhost:3000/admin
```

### TypeScript Validatie

```bash
pnpm tsc --noEmit
# Moet zonder errors draaien
```

### Type Generatie

```bash
pnpm payload generate:types
# Genereert src/payload-types.ts
# Run na elke schema wijziging!
```

### Import Map

```bash
pnpm payload generate:importmap
# Genereert component import mappings
# Run na toevoegen/verwijderen van custom components
```

---

## 🔒 Document Locking

**Status**: ✅ Geïmplementeerd voor Topverhalen & Homepage

Document locking zorgt ervoor dat slechts één gebruiker tegelijk een document kan bewerken, waardoor data conflicten en overschrijvingen worden voorkomen.

### Hoe het werkt

1. **Automatisch vergrendelen**: Wanneer een gebruiker een verhaal of de homepage opent in de editor, wordt het document automatisch vergrendeld voor die gebruiker.

2. **Melding voor andere gebruikers**: Als een tweede gebruiker hetzelfde verhaal probeert te openen, krijgt deze drie opties:
   - **View in Read-Only**: Het document bekijken zonder te kunnen bewerken
   - **Take Over**: Het bewerken overnemen (originele gebruiker krijgt melding)
   - **Return to Dashboard**: Terug naar het dashboard

3. **Automatisch ontgrendelen**: De lock verloopt automatisch na 5 minuten inactiviteit (configureerbaar).

### Wat gebeurt er bij lock expiry?

**Belangrijk voor UX**: Wanneer de lock na 5 minuten inactiviteit verloopt:

- De **originele gebruiker** blijft gewoon in de edit view en kan doorwerken
- De lock wordt stilzwijgend vernieuwd bij de volgende save actie
- Er wordt **geen waarschuwing** getoond aan de originele gebruiker
- **Andere gebruikers** kunnen het document nu ook openen en bewerken

**Let op**: Dit betekent dat als beide gebruikers tegelijk onbewust werken na lock expiry, de laatst opgeslagen versie wint. Daarom is het belangrijk:

- De autosave interval kort te houden (2 seconden bij Topverhalen)
- Gebruikers te instrueren om regelmatig te saven
- Bij langere pauzes de editor te sluiten

### Configuratie

```typescript
// src/collections/Topverhalen.ts
lockDocuments: {
  duration: 300, // 5 minuten (300 seconden) inactiviteit
}
```

### API Impact

Document locking werkt ook via de Local API en REST API:

```typescript
// Enfore lock bij update/delete
await payload.update({
  collection: 'topverhalen',
  id: '123',
  data: { title: 'Nieuwe titel' },
  overrideLock: false, // Respecteer document lock (standaard: true)
})
```

**Standaard gedrag**: `overrideLock` is `true`, wat betekent dat API operaties locks negeren. Zet op `false` voor strikte lock enforcement.

---

## ⚠️ Belangrijke Best Practices (GEVOLGD)

### 1. ✅ Security Patterns

- Local API calls zijn server-side (geen `overrideAccess` nodig)
- Roles in JWT voor snelle access checks
- Query constraints voor row-level security
- Field-level access alleen boolean returns

### 2. ✅ Type Safety

- Alle code compileert zonder TypeScript errors
- Generated types in `src/payload-types.ts`
- Proper typing voor components

### 3. ✅ Live Preview

- Environment variabele gebruikt (geen hardcoded URLs)
- RefreshRouteOnSave pattern (simpel & betrouwbaar)
- Server Components met `draft: true`

### 4. ✅ Component Patterns

- Server Components als default
- Client Components alleen waar nodig (`'use client'`)
- Component paths in config via importMap
- Named exports met `#ExportName` syntax

### 5. ✅ Styling

- Tailwind CSS correct geïmporteerd in frontend layout
- Prose classes voor rich text styling
- Inline styles als fallback waar nodig

---

## 🐛 Bekende Issues & Oplossingen

### Issue: Live Preview toont geen content

**Oorzaak**: CSS niet geladen in preview  
**Oplossing**: ✅ Opgelost door `import '../globals.css'` in frontend layout

### Issue: TextBlocks niet zichtbaar

**Oorzaak**: Tailwind styles niet geladen  
**Oplossing**: ✅ Opgelost met globals.css import + inline style fallbacks

### Issue: Hero label/source niet zichtbaar

**Oorzaak**: Props niet gedefinieerd in HeroBlock component  
**Oplossing**: ✅ Toegevoegd aan component interface en rendering

### Issue: Page title niet in Hero

**Oorzaak**: Title niet doorgegeven van page naar RenderBlocks  
**Oplossing**: ✅ Title prop toegevoegd aan RenderBlocks

---

## 📝 Code Patterns

### Access Control Voorbeeld

```typescript
// Row-level security met query constraint
export const adminsOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true

  return {
    id: { equals: user.id },
  }
}
```

### Hook Voorbeeld

```typescript
hooks: {
  beforeChange: [
    async ({ req, data, operation }) => {
      if (data._status === 'published' && operation === 'update') {
        const user = req.user
        if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
          throw new Error('Only admins and editors can publish')
        }
      }
      return data
    },
  ],
}
```

### Frontend Rendering

```typescript
// src/app/(frontend)/topverhalen/[slug]/page.tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'topverhalen',
    where: { slug: { equals: slug } },
    draft: true,  // BELANGRIJK voor preview!
    depth: 2,
  })

  const page = pages.docs[0]
  if (!page) return notFound()

  return <RenderBlocks blocks={page.blocks} title={page.title || undefined} />
}
```

---

## 🎨 UI/UX Details

### Blocks Styling

- **Hero**: Full-width, min 50vh, achtergrondafbeelding met opacity 50%
- **Text (intro)**: Grotere tekst (1.25rem), medium font weight
- **Text (normaal)**: Standaard prose styling (1rem)
- **Image**: Next.js Image component, rounded, shadow

### Responsive Design

- Alle blocks responsive door Tailwind utilities
- Live preview breakpoints: 375px, 768px, 1440px

---

## 📚 Belangrijke Documentatie

- **Payload Docs**: https://payloadcms.com/docs
- **AGENTS.md**: Uitgebreide Payload best practices in project root
- **Next.js App Router**: https://nextjs.org/docs/app
- **Lexical Editor**: Voor rich text customization

---

## ✅ Code Review Status

**Laatste check**: 22 januari 2026

- ✅ TypeScript compileert zonder errors
- ✅ Alle collections volgen best practices
- ✅ Access control correct geïmplementeerd
- ✅ Live preview volledig werkend
- ✅ Frontend rendering compleet
- ✅ Internationalisatie werkend
- ✅ Custom components correct geïmplementeerd
- ✅ Environment variabelen correct gebruikt
- ✅ Styling volledig geladen

---

## � Deployment & Database

### Neon PostgreSQL Database

- **Production Branch**: `production` (main database)
- **Development Branch**: `development` (auto-synced nightly at 4:05 AM UTC)
- **Project ID**: `square-pine-01384233`

### GitHub Actions Workflows

#### Daily Sync (`sync-dev-database.yml`)
- Runs nightly at 4:05 AM UTC
- Deletes old development branch
- Creates fresh clone from production branch
- Updates Vercel environment variables
- Triggers redeploy

#### Manual Clone (`manual-clone-dev-branch.yml`)
- Manual trigger from GitHub Actions UI
- Same process as daily sync
- Use for on-demand development database refresh

### Development Workflow

1. **Feature Development**:
   - Branch from `development`
   - Use local `.env.local` with development database
   - Test new collections/blocks locally
   - Commit small, logical changes

2. **Schema Changes**:
   - Test locally with development database
   - Payload auto-applies schema changes locally
   - Push to `main` → Vercel deploy → Payload runs migrations on production
   - Next night: development database gets updated schema automatically

3. **Database Branches**:
   - Development database = disposable (reset nightly)
   - Production database = source of truth
   - Schema changes flow: Code → Production → Development (via nightly sync)

### Vercel Deployment

- **Production**: Linked to `main` branch
- **Preview**: Auto-deploy from feature branches
- Environment variables updated via GitHub Actions

---

## 🔄 Voor Volgende Sessie

### Potentiële Verbeteringen

1. SEO fields toevoegen aan Topverhalen (meta description, OG image)
2. Breadcrumbs component voor navigatie
3. Related articles functionaliteit
4. Search functionaliteit
5. Analytics integratie
6. Image focal point UI voor hero images
7. Category/tag systeem voor Topverhalen

### Maintenance

- Types regenereren na schema changes: `pnpm payload generate:types`
- Import map updaten na component changes: `pnpm payload generate:importmap`
- TypeScript valideren: `pnpm tsc --noEmit`

---

**Laatste Update**: 28 januari 2026 | Neon workflows werkend ✅  
**Einde Handover** | Alle code volgt officiële Payload CMS 3 best practices ✅
