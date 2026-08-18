export type ProductCategory = 'Savings' | 'Credit Card' | 'Loan' | 'Wealth';

export type ProductStatus = 'Active' | 'Pending' | 'Overdue' | 'Closed';

export interface ProductMetric {
  label: string;
  value: string;
}

export interface BankingProduct {
  id: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  metrics: ProductMetric[];
  ctaLabel: 'View Details' | 'Apply';
}
