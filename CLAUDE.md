# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application for a Japanese dictionary preface/postscript database (辞書序跋データベース). The application provides full-text search functionality for dictionary documents stored in Supabase with search highlighting.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting and formatting (uses Biome)
npm run lint
npm run format
```

## Tech Stack

- **Framework**: Next.js 16 with App Router and React 19
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 4 + daisyUI
- **Database**: Supabase (PostgreSQL with full-text search RPC)
- **Linting/Formatting**: Biome (not ESLint/Prettier)
- **Build Features**: React Compiler enabled

## Architecture

### Supabase Integration

The app uses two distinct Supabase client patterns depending on the execution context:

1. **Server Components/API Routes** ([src/lib/supabase/server.ts](src/lib/supabase/server.ts))
   - Uses `createServerClient` from `@supabase/ssr`
   - Manages cookies for server-side auth state
   - Exported as async `createClient()` function

2. **Client Components** ([src/lib/supabase/client.ts](src/lib/supabase/client.ts))
   - Uses `createBrowserClient` from `@supabase/ssr`
   - Simpler setup without cookie management
   - Exported as sync `createClient()` function

**Important**: Both files export a function named `createClient()`, so always import from the correct path:
- `@/lib/supabase/server` for server-side code
- `@/lib/supabase/client` for client-side code

### Database Layer

[src/lib/db.ts](src/lib/db.ts) provides database query functions:
- `searchJyobatsuRawText(keyword)`: Calls the `search_jyobatsu_raw_text` RPC function in Supabase
- Database table: `jyobatsu_raw_text` with columns `id` and `text`

### Search Flow

1. User enters query in [SearchPage](src/components/search-panel.tsx) (client component)
2. Form submits to [/api/search](src/app/api/search/route.ts) API route with query parameter `q`
3. API route calls Supabase RPC `search_jyobatsu_raw_text`
4. Results include highlighted snippets (HTML) rendered with `dangerouslySetInnerHTML`
5. Each result links to `/documents/[documentId]`

### Document Display

[src/app/documents/[documentId]/page.tsx](src/app/documents/[documentId]/page.tsx) displays individual documents:
- Fetches from `jyobatsu_raw_text` table by ID
- Server component using dynamic params
- Displays raw text in `<pre>` tag

## Path Aliases

TypeScript path alias `@/*` maps to `./src/*`

## Code Style

- Uses Biome for linting/formatting (configured in [biome.json](biome.json))
- 2-space indentation
- React Compiler enabled (no manual memo/callback optimization needed)
- Non-null assertions allowed (`noNonNullAssertion: off`)
- `dangerouslySetInnerHTML` allowed for search snippets

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase publishable key (note: server.ts uses this, not a different key)
