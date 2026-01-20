import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-card',
    imports: [CommonModule],
    templateUrl: './product-card.html',
    styleUrl: './product-card.css'
})
export class ProductCard {
    // Input signal for product data
    product = input<any>();

    /**
     * Open affiliate link in new tab
     */
    openAffiliateLink(url: string): void {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }
}
