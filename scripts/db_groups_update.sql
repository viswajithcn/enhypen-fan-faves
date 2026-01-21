-- =====================================================
-- Database Migration: Artist Groups & Search Codes
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Create artist_groups table
CREATE TABLE IF NOT EXISTS artist_groups (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert default artist groups
INSERT INTO artist_groups (name, image_url) VALUES
    ('Enhypen', NULL),
    ('CORTIS', NULL)
ON CONFLICT (name) DO NOTHING;

-- 3. Add group_id column to products table (FK to artist_groups)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS group_id BIGINT REFERENCES artist_groups(id);

-- 4. Add product_code column to products table (unique search code)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS product_code TEXT UNIQUE;

-- 5. Create index for faster product_code lookups
CREATE INDEX IF NOT EXISTS idx_products_product_code ON products(product_code);

-- 6. Create index for faster group_id lookups
CREATE INDEX IF NOT EXISTS idx_products_group_id ON products(group_id);

-- 7. Update existing products to link to Enhypen group (optional)
-- Uncomment and modify as needed:
-- UPDATE products SET group_id = (SELECT id FROM artist_groups WHERE name = 'Enhypen');

-- 8. Enable RLS on artist_groups (if needed)
-- ALTER TABLE artist_groups ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read" ON artist_groups FOR SELECT USING (true);

-- =====================================================
-- Verification queries (run after migration)
-- =====================================================
-- SELECT * FROM artist_groups;
-- SELECT id, title, group_id, product_code FROM products;
