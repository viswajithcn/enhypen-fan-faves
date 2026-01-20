import { Component, output, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService, Category } from '../../services/supabase.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
    filterChange = output<number | null>();

    private supabaseService = inject(SupabaseService);

    categories = signal<Category[]>([]);
    activeFilterId = signal<number | null>(null);

    async ngOnInit() {
        const cats = await this.supabaseService.getCategories();
        if (cats) {
            this.categories.set(cats);
        }
    }

    onFilterClick(categoryId: number | null): void {
        this.activeFilterId.set(categoryId);
        this.filterChange.emit(categoryId);
    }
}
