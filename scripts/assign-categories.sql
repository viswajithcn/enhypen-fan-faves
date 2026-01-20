-- =============================================
-- Assign Category IDs to Products
-- =============================================

-- Albums category (id: 1) - Photobooks, Albums
UPDATE products SET category_id = 1 WHERE title ILIKE '%Album%';
UPDATE products SET category_id = 1 WHERE title ILIKE '%Photobook%';

-- Fashion category (id: 2) - T-Shirts, Hoodies, Clothing
UPDATE products SET category_id = 2 WHERE title ILIKE '%T-Shirt%';
UPDATE products SET category_id = 2 WHERE title ILIKE '%Hoodie%';
UPDATE products SET category_id = 2 WHERE title ILIKE '%Shirt%';

-- Decor category (id: 3) - Photocards, Lightsticks, Posters
UPDATE products SET category_id = 3 WHERE title ILIKE '%Photocard%';
UPDATE products SET category_id = 3 WHERE title ILIKE '%Lightstick%';
UPDATE products SET category_id = 3 WHERE title ILIKE '%Poster%';

-- Verify the updates
SELECT p.id, p.title, p.category_id, c.name as category_name 
FROM products p 
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.id;
