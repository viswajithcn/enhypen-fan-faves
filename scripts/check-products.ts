import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmzgbeoyudqnhzfjtgsf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtemdiZW95dWRxbmh6Zmp0Z3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MzM4MjEsImV4cCI6MjA4NDAwOTgyMX0._CVeL8yPNrRrmozVCF22bqaoQu7tjiLenkWtrmP9UQA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log('Current products in database:');
    console.log(JSON.stringify(data, null, 2));
}

checkProducts();
