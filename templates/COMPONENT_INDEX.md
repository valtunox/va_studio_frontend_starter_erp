# VA Studio Component Index

For AI/vibe coding: discover existing components to reuse instead of recreating.

## Shared UI (shadcn/ui)

| Path | Description |
|------|-------------|
| `src/components/ui/button.jsx` | Button with variants: default, destructive, outline, secondary, ghost, link |
| `src/components/ui/card.jsx` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `src/components/ui/input.jsx` | Text input with focus styles |
| `src/components/ui/label.jsx` | Form label |
| `src/components/ui/dialog.jsx` | Modal dialog (Radix) |

## Auth (ready-to-use)

| Path | Description |
|------|-------------|
| `src/components/auth/LoginForm.jsx` | Login – email, password, OAuth (Google, GitHub, Microsoft), forgot link |
| `src/components/auth/RegisterForm.jsx` | Register – name, email, password, OAuth, terms checkbox |
| `src/components/auth/ResetPasswordForm.jsx` | Reset password – new password + confirm |
| `src/components/auth/RequestResetForm.jsx` | Request reset link – email input |
| `src/components/auth/OAuthButtons.jsx` | Social login buttons – Google, GitHub, Microsoft |
| `src/components/auth/AuthModals.jsx` | All-in-one modal – switch between login/register/reset |

## Shared Utils

| Path | Description |
|------|-------------|
| `src/lib/utils.js` | `cn()` – merges Tailwind classes |

## Portfolio Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | Main layout – Hero, About, Skills, Projects, Contact |
| Uses | Lucide (Menu, Github, Linkedin, Mail), Headless UI (Menu), Button, Card |


## E-commerce Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | Store layout – Nav, Hero, Product grid, Cart |
| Uses | Lucide (ShoppingCart, Search, Star), Headless UI (Menu), Button, Card, Input |

## Blog Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | Blog layout – Nav, Hero, Post list, tags, search |
| Uses | Lucide (Calendar, User, Tag, Search, ArrowRight), Headless UI (Menu), Button, Card, Input |

## CRM Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | CRM layout – Sidebar, Contacts table, stats, filter |
| Uses | Lucide (Users, Phone, Mail, Building2), Headless UI (Menu), Button, Card, Input |

## ERP Template

| Path | Description |
|------|-------------|
| `src/App.jsx` | ERP layout – Sidebar (Inventory, Procurement, Orders, Finance), metrics, alerts |
| Uses | Lucide (Package, Truck, DollarSign, Warehouse), Headless UI (Menu), Button, Card |

## Dependencies

- **Tailwind CSS** – base styling
- **shadcn/ui** – Button, Card, Input (Radix primitives)
- **Headless UI** – Menu, Dialog (accessible dropdowns, modals)
- **Lucide React** – Icons
