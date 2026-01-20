-- Add category column if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;

-- Update ENHYPEN products with appropriate categories
UPDATE products SET category = 'Photocards' WHERE title LIKE '%Photocard%';
UPDATE products SET category = 'Lightsticks' WHERE title LIKE '%Lightstick%';
UPDATE products SET category = 'Apparel' WHERE title LIKE '%T-Shirt%' OR title LIKE '%Hoodie%';
UPDATE products SET category = 'Albums' WHERE title LIKE '%Album%';
UPDATE products SET category = 'Posters' WHERE title LIKE '%Poster%';
UPDATE products SET category = 'Photobooks' WHERE title LIKE '%Photobook%';

-- Verify the updates
SELECT id, title, category FROM products;
