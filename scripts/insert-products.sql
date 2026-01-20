-- Temporarily disable RLS for products table to insert dummy data
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Insert dummy products
INSERT INTO products (title, price, image_url, affiliate_link) VALUES
  ('Cute Baby Onesie - Pink Stars', '19.99', 'http://localhost:4200/baby_onesie_product_1768693141468.png', 'https://amazon.com/baby-onesie'),
  ('Soft Cloud Baby Blanket', '29.99', 'http://localhost:4200/soft_baby_blanket_1768693152998.png', 'https://amazon.com/baby-blanket'),
  ('Smart Baby Monitor with Camera', '89.99', 'http://localhost:4200/baby_monitor_1768693165406.png', 'https://amazon.com/baby-monitor'),
  ('Colorful Wooden Building Blocks', '24.99', 'http://localhost:4200/wooden_toy_blocks_1768693183984.png', 'https://amazon.com/wooden-blocks'),
  ('Anti-Colic Baby Bottle Set', '34.99', 'http://localhost:4200/baby_bottle_set_1768693196374.png', 'https://amazon.com/baby-bottles'),
  ('Plush Teddy Bear - Soft & Safe', '16.99', 'http://localhost:4200/plush_teddy_bear_1768693213215.png', 'https://amazon.com/teddy-bear');

-- Re-enable RLS if you want to use it later
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Verify the data was inserted
SELECT * FROM products;
