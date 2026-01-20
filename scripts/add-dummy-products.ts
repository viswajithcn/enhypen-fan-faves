import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://rmzgbeoyudqnhzfjtgsf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtemdiZW95dWRxbmh6Zmp0Z3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MzM4MjEsImV4cCI6MjA4NDAwOTgyMX0._CVeL8yPNrRrmozVCF22bqaoQu7tjiLenkWtrmP9UQA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Dummy products data
const products = [
    {
        title: 'Cute Baby Onesie - Pink Stars',
        price: '19.99',
        image_url: '/baby_onesie_product_1768693141468.png',
        affiliate_link: 'https://amazon.com/baby-onesie'
    },
    {
        title: 'Soft Cloud Baby Blanket',
        price: '29.99',
        image_url: '/soft_baby_blanket_1768693152998.png',
        affiliate_link: 'https://amazon.com/baby-blanket'
    },
    {
        title: 'Smart Baby Monitor with Camera',
        price: '89.99',
        image_url: '/baby_monitor_1768693165406.png',
        affiliate_link: 'https://amazon.com/baby-monitor'
    },
    {
        title: 'Colorful Wooden Building Blocks',
        price: '24.99',
        image_url: '/wooden_toy_blocks_1768693183984.png',
        affiliate_link: 'https://amazon.com/wooden-blocks'
    },
    {
        title: 'Anti-Colic Baby Bottle Set',
        price: '34.99',
        image_url: '/baby_bottle_set_1768693196374.png',
        affiliate_link: 'https://amazon.com/baby-bottles'
    },
    {
        title: 'Plush Teddy Bear - Soft & Safe',
        price: '16.99',
        image_url: '/plush_teddy_bear_1768693213215.png',
        affiliate_link: 'https://amazon.com/teddy-bear'
    }
];

async function addProducts() {
    console.log('Adding dummy products to Supabase...\n');

    for (const product of products) {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();

        if (error) {
            console.error(`❌ Error adding "${product.title}":`, error.message);
        } else {
            console.log(`✅ Added: ${product.title}`);
        }
    }

    console.log('\n✨ Done adding products!');
}

// Run the script
addProducts().catch(console.error);
