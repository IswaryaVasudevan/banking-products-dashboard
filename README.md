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
- Product Details Modal — displayed within DashboardComponent when the user selects "View Details". It keeps the interaction on the same screen and can be closed using the close button or Escape key.
- **Unified shape**: Every product type (savings, credit card, loan, wealth) is normalized into one `BankingProduct` interface with a generic `metrics: {label, value}[]` array. This is what lets one card component render all categories without per-type branching — savings shows interest rate/balance, credit card shows limit/due date, etc., but the component itself doesn't know the difference.
- **Filtering**: category tabs + a live search box are combined client-side via a filteredProducts getter. Search matches product name, category, and status.
- **Status styling**: `status` drives a CSS class (`status--active`, `status--overdue`, etc.) so risk states (e.g. an overdue card) are visually distinct at a glance.
- **Loading/empty states**: handled explicitly (`isLoading`, empty-filter message) since the service returns an Observable, not synchronous data.

## What I'd add with more time

- Route to a dedicated product-details page if the application grows beyond the single-screen scope
- Unit tests for `DashboardComponent` filtering logic and `ProductCardComponent` rendering
- Debounce on the search input
- Real HTTP client + loading/error handling for network failures
- Further accessibility improvements such as semantic tab roles, focus trapping within the modal, and enhanced keyboard navigation
