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
    image_url: string;
    description?: string;
    affiliate_link?: string;
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
     * Get all products from the products table with related category name
     */
    async getProducts(): Promise<Product[] | null> {
        const { data, error } = await this.supabase
            .from('products')
            .select('*, categories(name)');

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
            .select('*, categories(name)')
            .eq('category_id', categoryId);

        if (error) {
            console.error('Error fetching products by category:', error);
            return null;
        }

        return data as Product[];
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
