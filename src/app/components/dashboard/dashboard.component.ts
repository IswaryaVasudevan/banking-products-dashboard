import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankingProduct, ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

type CategoryFilter = ProductCategory | 'All';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allProducts: BankingProduct[] = [];
  isLoading = true;

  readonly categories: CategoryFilter[] = [
    'All',
    'Savings',
    'Credit Card',
    'Loan',
    'Wealth'
  ];

  selectedCategory: CategoryFilter = 'All';
  searchTerm = '';

  selectedProduct: BankingProduct | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.isLoading = false;
    });
  }

  get filteredProducts(): BankingProduct[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.allProducts.filter((product) => {
      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.status.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory = category;
  }

  onProductAction(product: BankingProduct): void {
    if (product.ctaLabel === 'View Details') {
      this.selectedProduct = product;
    } else {
      alert(`Application started for ${product.name}`);
    }
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.selectedProduct) {
      this.closeDetails();
    }
  }

  trackByProductId(_index: number, product: BankingProduct): string {
    return product.id;
  }
}