# Banking Products Dashboard

A single-screen unified dashboard showing savings, credit card, loan, and wealth products for a customer.

## Tech Stack

- **Angular 17** (standalone components — no NgModules)
- **TypeScript**
- **RxJS** for the mocked data stream
- Plain CSS (component-scoped) — no external UI library, to keep the exercise dependency-free and easy to review

## How to Run

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

## Architecture / Design Decisions

- **Data vs UI separation**: `ProductService` is the single source of truth for product data. It exposes `getProducts(): Observable<BankingProduct[]>`, simulating a real `HttpClient.get('/api/products')` call (including a network delay) so swapping in a real backend later only means changing the service, not any component.
- **Component split**:
  - `DashboardComponent` — owns state (all products, selected category, search term), does filtering, renders the layout.
  - `ProductCardComponent` — a "dumb"/presentational component. Takes a `product` as `@Input`, emits an `action` event on CTA click. Reused across all 4 product types since they share the same shape (`name`, `category`, `status`, `metrics[]`, CTA).
- **Unified shape**: Every product type (savings, credit card, loan, wealth) is normalized into one `BankingProduct` interface with a generic `metrics: {label, value}[]` array. This is what lets one card component render all categories without per-type branching — savings shows interest rate/balance, credit card shows limit/due date, etc., but the component itself doesn't know the difference.
- **Filtering**: category tabs + a live search box are combined client-side via a `filteredProducts` getter — simple and sufficient for a hard-coded/small dataset. For a real paginated backend this would move server-side.
- **Status styling**: `status` drives a CSS class (`status--active`, `status--overdue`, etc.) so risk states (e.g. an overdue card) are visually distinct at a glance.
- **Loading/empty states**: handled explicitly (`isLoading`, empty-filter message) since the service returns an Observable, not synchronous data.

## What I'd add with more time

- Route to a real product-details page per category instead of an `alert()` stub
- Unit tests for `DashboardComponent` filtering logic and `ProductCardComponent` rendering
- Debounce on the search input
- Real HTTP client + loading/error handling for network failures
- Accessibility pass (ARIA roles for tabs, focus management)
