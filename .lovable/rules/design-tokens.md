# Design Tokens

Token reference for **Bonlife Design System**. Use utility classes and CSS variables — never raw values.

## Colors

Apply with any color utility: `bg-<name>`, `text-<name>`, `border-<name>`, `ring-<name>`, `divide-<name>`, etc.

| Name | CSS variable |
|---|---|
| `navy-900` | `--navy-900` |
| `coral-500` | `--coral-500` |
| `coral-600` | `--coral-600` |
| `coral-100` | `--coral-100` |
| `mint-400` | `--mint-400` |
| `category-funeral` | `--category-funeral` |
| `category-life` | `--category-life` |
| `category-savings` | `--category-savings` |
| `category-accident` | `--category-accident` |
| `state-error` | `--state-error` |
| `state-success` | `--state-success` |
| `surface-white` | `--surface-white` |
| `surface-tint` | `--surface-tint` |
| `surface-muted` | `--surface-muted` |
| `border-hairline` | `--border-hairline` |
| `navy-700` | `--navy-700` |
| `navy-500` | `--navy-500` |
| `navy-300` | `--navy-300` |
| `navy-100` | `--navy-100` |
| `primary-foreground` | `--primary-foreground` |
| `destructive-foreground` | `--destructive-foreground` |

Standard Tailwind color ramps (gray) are available at steps 50–950 — apply with `bg-<hue>-<step>`, `text-<hue>-<step>`, etc.

## Typography

Typography classes (`font-*` for families, `text-*` for sizes):

| Class | CSS variable |
|---|---|
| `font-display` | `--font-display` |
| `font-body` | `--font-body` |

## Spacing

Apply with any spacing utility: `p-<name>`, `m-<name>`, `gap-<name>`, `space-<name>`, `w-<name>`, `h-<name>`, etc.

| Name | CSS variable |
|---|---|
| `1` | `--space-1` |
| `2` | `--space-2` |
| `3` | `--space-3` |
| `4` | `--space-4` |
| `5` | `--space-5` |
| `6` | `--space-6` |
| `8` | `--space-8` |
| `10` | `--space-10` |
| `12` | `--space-12` |
| `16` | `--space-16` |
| `20` | `--space-20` |
| `24` | `--space-24` |

## Border Radius

Border-radius classes:

| Class | CSS variable |
|---|---|
| `rounded-sm` | `--radius-sm` |
| `rounded-md` | `--radius-md` |
| `rounded-lg` | `--radius-lg` |
| `rounded-xl` | `--radius-xl` |
| `rounded-pill` | `--radius-pill` |
| `rounded` | `--radius` |

## Shadows

Box-shadow classes:

| Class | CSS variable |
|---|---|
| `shadow-sm` | `--shadow-sm` |
| `shadow-md` | `--shadow-md` |
| `shadow-lg` | `--shadow-lg` |

## Other

Reference via `var(--name)` in inline styles or CSS.

| CSS variable |
|---|
| `--motion-duration-instant` |
| `--motion-duration-fast` |
| `--motion-duration-base` |
| `--motion-duration-slow` |
| `--motion-ease-out` |
| `--motion-ease-in` |
| `--motion-ease-in-out` |
| `--motion-ease-spring` |
| `--motion-rise` |
| `--motion-rise-lg` |
| `--motion-scale-in` |
| `--motion-press-scale` |

