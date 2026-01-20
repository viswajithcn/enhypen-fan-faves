import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCard } from './components/product-card/product-card';
import { NavbarComponent } from './components/navbar/navbar';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ProductCard, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('EnFans App');

  // Inject SupabaseService
  private supabaseService = inject(SupabaseService);

  // Signal to store all products and filtered products
  private allProducts = signal<any[]>([]);
  protected filteredProducts = signal<any[]>([]);
  protected loading = signal(true);
  protected error = signal<string | null>(null);
  protected activeFilterId = signal<number | null>(null);

  async ngOnInit() {
    try {
      this.loading.set(true);
      const data = await this.supabaseService.getProducts();

      if (data) {
        this.allProducts.set(data);
        this.filteredProducts.set(data);
        this.error.set(null);
      } else {
        this.error.set('Failed to load products');
      }
    } catch (err) {
      console.error('Error loading products:', err);
      this.error.set('An error occurred while loading products');
    } finally {
      this.loading.set(false);
    }
  }

  onFilterChange(categoryId: number | null): void {
    this.activeFilterId.set(categoryId);

    if (categoryId === null) {
      // Show all products
      this.filteredProducts.set(this.allProducts());
    } else {
      // Filter by category_id
      const filtered = this.allProducts().filter(product =>
        product.category_id === categoryId
      );
      this.filteredProducts.set(filtered);
    }
  }
}

