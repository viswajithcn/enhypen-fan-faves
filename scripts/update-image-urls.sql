-- Update image URLs to use the assets folder
UPDATE products SET image_url = '/assets/images/baby_onesie_product_1768693141468.png' WHERE title = 'Cute Baby Onesie - Pink Stars';
UPDATE products SET image_url = '/assets/images/soft_baby_blanket_1768693152998.png' WHERE title = 'Soft Cloud Baby Blanket';
UPDATE products SET image_url = '/assets/images/baby_monitor_1768693165406.png' WHERE title = 'Smart Baby Monitor with Camera';
UPDATE products SET image_url = '/assets/images/wooden_toy_blocks_1768693183984.png' WHERE title = 'Colorful Wooden Building Blocks';
UPDATE products SET image_url = '/assets/images/baby_bottle_set_1768693196374.png' WHERE title = 'Anti-Colic Baby Bottle Set';
UPDATE products SET image_url = '/assets/images/plush_teddy_bear_1768693213215.png' WHERE title = 'Plush Teddy Bear - Soft & Safe';

-- Verify the updates
SELECT title, image_url FROM products;
