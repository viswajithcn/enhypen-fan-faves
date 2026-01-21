import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCard } from './components/product-card/product-card';
import { NavbarComponent } from './components/navbar/navbar';
import { ArtistSelector } from './components/artist-selector/artist-selector';
import { SearchBar } from './components/search-bar/search-bar';
import { SupabaseService, Product } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ProductCard, NavbarComponent, ArtistSelector, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('EnFans App');

  // Inject SupabaseService
  private supabaseService = inject(SupabaseService);

  // Signal to store all products and filtered products
  private allProducts = signal<Product[]>([]);
  protected filteredProducts = signal<Product[]>([]);
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  // Filter state
  protected activeCategoryId = signal<number | null>(null);
  protected activeGroupId = signal<number | null>(null);
  protected searchTerm = signal<string>('');

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

  onCategoryChange(categoryId: number | null): void {
    this.activeCategoryId.set(categoryId);
    this.applyFilters();
  }

  onGroupChange(groupId: number | null): void {
    this.activeGroupId.set(groupId);
    this.applyFilters();
  }

  async onSearchChange(term: string): Promise<void> {
    this.searchTerm.set(term);

    if (term.trim()) {
      // Use search service
      const results = await this.supabaseService.searchProducts(term);
      if (results) {
        // Apply additional filters on search results
        let filtered = results;

        if (this.activeGroupId() !== null) {
          filtered = filtered.filter(p => p.group_id === this.activeGroupId());
        }

        if (this.activeCategoryId() !== null) {
          filtered = filtered.filter(p => p.category_id === this.activeCategoryId());
        }

        this.filteredProducts.set(filtered);
      }
    } else {
      // No search term, apply regular filters
      this.applyFilters();
    }
  }

  private applyFilters(): void {
    let filtered = this.allProducts();

    // Filter by group
    if (this.activeGroupId() !== null) {
      filtered = filtered.filter(p => p.group_id === this.activeGroupId());
    }

    // Filter by category
    if (this.activeCategoryId() !== null) {
      filtered = filtered.filter(p => p.category_id === this.activeCategoryId());
    }

    // Filter by search term (client-side for already loaded data)
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(term) ||
        p.product_code?.toLowerCase() === term ||
        p.artist_groups?.name?.toLowerCase().includes(term) ||
        p.categories?.name?.toLowerCase().includes(term)
      );
    }

    this.filteredProducts.set(filtered);
  }
}
