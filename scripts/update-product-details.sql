-- Add category and description columns if they don't exist
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
-- ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;

-- Update products with categories and personal recommendations
UPDATE products SET 
  category = 'Decor', 
  description = 'Every ENGENE needs this photocard collection! The quality is amazing 💜'
WHERE title LIKE '%Photocard%';

UPDATE products SET 
  category = 'Decor', 
  description = 'THE must-have for any concert! So worth it for the lightstick ocean moment ✨'
WHERE title LIKE '%Lightstick%';

UPDATE products SET 
  category = 'Fashion', 
  description = 'Super comfy and the fit is perfect. I wear mine to every fansign!'
WHERE title LIKE '%T-Shirt%';

UPDATE products SET 
  category = 'Albums', 
  description = 'This album era was everything! The concept photos are chef''s kiss 👨‍🍳💋'
WHERE title LIKE '%Album%';

UPDATE products SET 
  category = 'Decor', 
  description = 'These look SO good on my wall. High quality print that doesn''t fade!'
WHERE title LIKE '%Poster%';

UPDATE products SET 
  category = 'Decor', 
  description = 'Cute af and sturdy! I have all the members on my bag 🎒'
WHERE title LIKE '%Keychain%';

-- Verify the updates
SELECT title, category, description FROM products;
