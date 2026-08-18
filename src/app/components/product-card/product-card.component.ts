import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BankingProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: BankingProduct;
  @Output() action = new EventEmitter<BankingProduct>();

  get statusClass(): string {
    return `status status--${this.product.status.toLowerCase()}`;
  }

  onAction(): void {
    this.action.emit(this.product);
  }
}
