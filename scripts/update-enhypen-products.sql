-- Update products with ENHYPEN merchandise
-- Clear existing baby products
DELETE FROM products;

-- Insert ENHYPEN merchandise products
INSERT INTO products (title, price, image_url, affiliate_link) VALUES
  ('ENHYPEN Official Photocard Set', '24.99', '/assets/images/enhypen_photocard_set_1768790692544.png', 'https://www.ktown4u.com/enhypen-photocard'),
  ('ENHYPEN Official Lightstick', '54.99', '/assets/images/enhypen_lightstick_1768790706043.png', 'https://www.ktown4u.com/enhypen-lightstick'),
  ('ENHYPEN Merchandise T-Shirt', '29.99', '/assets/images/enhypen_tshirt_1768790719423.png', 'https://www.ktown4u.com/enhypen-tshirt'),
  ('ENHYPEN Album - BORDER: DAY ONE', '19.99', 'https://images.unsplash.com/photo-1611532736570-fb0c8b3a6efe?w=400', 'https://www.ktown4u.com/enhypen-album'),
  ('ENHYPEN Official Poster Set', '14.99', 'https://images.unsplash.com/photo-1608433319511-dfe8ea4cbd3c?w=400', 'https://www.ktown4u.com/enhypen-poster'),
  ('ENHYPEN Acrylic Keychain Set', '16.99', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'https://www.ktown4u.com/enhypen-keychain');

-- Verify the updates
SELECT title, price, image_url FROM products;
