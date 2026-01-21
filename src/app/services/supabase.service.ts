import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * Product interface for type safety
 */
export interface Product {
    id: number;
    title: string;
    price: number;
    category_id?: number;
    categories?: { name: string };
    group_id?: number;
    artist_groups?: { name: string };
    image_url: string;
    description?: string;
    affiliate_link?: string;
    retailer?: string;
    product_code?: string;
}

/**
 * ArtistGroup interface for type safety
 */
export interface ArtistGroup {
    id: number;
    name: string;
    image_url?: string;
}

/**
 * Category interface for type safety
 */
export interface Category {
    id: number;
    name: string;
    sort_order: number;
}

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        // Initialize Supabase client using environment variables
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
    }

    /**
     * Get all products from the products table with related category and artist group names
     */
    async getProducts(): Promise<Product[] | null> {
        const { data, error } = await this.supabase
            .from('products')
            .select('*, categories(name), artist_groups(name)');

        if (error) {
            console.error('Error fetching products:', error);
            return null;
        }

        return data as Product[];
    }

    /**
     * Get products filtered by category ID
     * @param categoryId - Category ID to filter by
     */
    async getProductsByCategory(categoryId: number): Promise<Product[] | null> {
        const { data, error } = await this.supabase
            .from('products')
            .select('*, categories(name), artist_groups(name)')
            .eq('category_id', categoryId);

        if (error) {
            console.error('Error fetching products by category:', error);
            return null;
        }

        return data as Product[];
    }

    /**
     * Get all artist groups
     */
    async getGroups(): Promise<ArtistGroup[] | null> {
        const { data, error } = await this.supabase
            .from('artist_groups')
            .select('id, name, image_url');

        if (error) {
            console.error('Error fetching artist groups:', error);
            return null;
        }

        return data as ArtistGroup[];
    }

    /**
     * Search products by term (title, product_code, artist group, or category)
     * @param term - Search term
     */
    async searchProducts(term: string): Promise<Product[] | null> {
        const searchTerm = term.toLowerCase().trim();

        // First try exact product_code match
        const { data: codeMatch, error: codeError } = await this.supabase
            .from('products')
            .select('*, categories(name), artist_groups(name)')
            .eq('product_code', searchTerm);

        if (codeError) {
            console.error('Error searching by product_code:', codeError);
        }

        // If exact code match found, return it
        if (codeMatch && codeMatch.length > 0) {
            return codeMatch as Product[];
        }

        // Otherwise, search by title (using ilike for case-insensitive)
        const { data: titleMatch, error: titleError } = await this.supabase
            .from('products')
            .select('*, categories(name), artist_groups(name)')
            .ilike('title', `%${searchTerm}%`);

        if (titleError) {
            console.error('Error searching by title:', titleError);
            return null;
        }

        return titleMatch as Product[];
    }

    /**
     * Get all categories ordered by sort_order
     */
    async getCategories(): Promise<Category[] | null> {
        const { data, error } = await this.supabase
            .from('categories')
            .select('id, name, sort_order')
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            return null;
        }

        return data as Category[];
    }

    /**
     * Get the Supabase client instance
     */
    getClient(): SupabaseClient {
        return this.supabase;
    }

    /**
     * Example: Get current session
     */
    async getSession() {
        const { data, error } = await this.supabase.auth.getSession();
        if (error) {
            console.error('Error getting session:', error);
            return null;
        }
        return data.session;
    }

    /**
     * Example: Sign in with email and password
     */
    async signIn(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error('Error signing in:', error);
            return null;
        }
        return data;
    }

    /**
     * Example: Sign up with email and password
     */
    async signUp(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            console.error('Error signing up:', error);
            return null;
        }
        return data;
    }

    /**
     * Example: Sign out
     */
    async signOut() {
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
    }
}
