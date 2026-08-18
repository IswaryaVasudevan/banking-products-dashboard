import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BankingProduct } from '../models/product.model';

/**
 * In a real app this would call an HTTP endpoint (HttpClient.get<BankingProduct[]>('/api/products')).
 * Here the data is hard-coded but returned through an Observable with a simulated
 * network delay, so the component consumes it exactly the way it would consume a
 * real API response (async pipe / subscribe, loading state, etc.).
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly mockProducts: BankingProduct[] = [
    {
      id: 'sav-001',
      name: 'Everyday Savings Account',
      category: 'Savings',
      status: 'Active',
      metrics: [
        { label: 'Interest Rate', value: '3.25% p.a.' },
        { label: 'Balance', value: '₹1,24,500' }
      ],
      ctaLabel: 'View Details'
    },
    {
      id: 'sav-002',
      name: 'High-Yield Savings Plus',
      category: 'Savings',
      status: 'Pending',
      metrics: [
        { label: 'Interest Rate', value: '5.10% p.a.' },
        { label: 'Min. Balance', value: '₹25,000' }
      ],
      ctaLabel: 'Apply'
    },
    {
      id: 'cc-001',
      name: 'Platinum Rewards Credit Card',
      category: 'Credit Card',
      status: 'Active',
      metrics: [
        { label: 'Available Limit', value: '₹85,000' },
        { label: 'Due Date', value: '28 Aug 2026' }
      ],
      ctaLabel: 'View Details'
    },
    {
      id: 'cc-002',
      name: 'Cashback Credit Card',
      category: 'Credit Card',
      status: 'Overdue',
      metrics: [
        { label: 'Amount Due', value: '₹6,320' },
        { label: 'Due Date', value: '10 Aug 2026' }
      ],
      ctaLabel: 'View Details'
    },
    {
      id: 'ln-001',
      name: 'Home Loan',
      category: 'Loan',
      status: 'Active',
      metrics: [
        { label: 'Outstanding', value: '₹32,45,000' },
        { label: 'Next EMI Date', value: '5 Sep 2026' }
      ],
      ctaLabel: 'View Details'
    },
    {
      id: 'ln-002',
      name: 'Personal Loan',
      category: 'Loan',
      status: 'Closed',
      metrics: [
        { label: 'Outstanding', value: '₹0' },
        { label: 'Closed On', value: '12 Jun 2026' }
      ],
      ctaLabel: 'View Details'
    },
    {
      id: 'wl-001',
      name: 'Mutual Fund SIP Portfolio',
      category: 'Wealth',
      status: 'Active',
      metrics: [
        { label: 'Current Value', value: '₹4,58,900' },
        { label: 'Returns (1Y)', value: '+12.4%' }
      ],
      ctaLabel: 'View Details'
    },
    {
      id: 'wl-002',
      name: 'Fixed Deposit',
      category: 'Wealth',
      status: 'Active',
      metrics: [
        { label: 'Maturity Value', value: '₹1,10,000' },
        { label: 'Maturity Date', value: '15 Jan 2027' }
      ],
      ctaLabel: 'View Details'
    }
  ];

  /** Simulates GET /api/products */
  getProducts(): Observable<BankingProduct[]> {
    return of(this.mockProducts).pipe(delay(400));
  }
}
