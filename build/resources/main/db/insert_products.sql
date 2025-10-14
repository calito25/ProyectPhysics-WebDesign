-- Insert category 'Acción' and the two products with price 200000 and stock 100
-- Run this in phpMyAdmin (SQL) with the database `arcadia_db` selected.

-- Create category if not exists
INSERT INTO categories (name, slug)
SELECT * FROM (SELECT 'Acción' AS name, 'accion' AS slug) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE slug = 'accion'
);

-- Insert or update Ghost of Tsushima Director's Cut
INSERT INTO products (title, price, stock, category_id, image_path)
VALUES (
  'Ghost of Tsushima Director''s Cut',
  200000.00,
  100,
  (SELECT id FROM categories WHERE slug = 'accion' LIMIT 1),
  'GoTDC.png'
)
ON DUPLICATE KEY UPDATE
  price = VALUES(price),
  stock = VALUES(stock),
  category_id = VALUES(category_id),
  image_path = VALUES(image_path);

-- Insert or update Ghost Of Yotei
INSERT INTO products (title, price, stock, category_id, image_path)
VALUES (
  'Ghost Of Yotei',
  200000.00,
  100,
  (SELECT id FROM categories WHERE slug = 'accion' LIMIT 1),
  'GoY.png'
)
ON DUPLICATE KEY UPDATE
  price = VALUES(price),
  stock = VALUES(stock),
  category_id = VALUES(category_id),
  image_path = VALUES(image_path);

-- If your products table doesn't define a UNIQUE on title, the ON DUPLICATE KEY won't match.
-- In that case run the following UPDATEs instead (after ensuring the product rows exist):
-- UPDATE products SET price=200000.00, stock=100, image_path='GoTDC.png', category_id=(SELECT id FROM categories WHERE slug='accion') WHERE title='Ghost of Tsushima Director''s Cut';
-- UPDATE products SET price=200000.00, stock=100, image_path='GoY.png', category_id=(SELECT id FROM categories WHERE slug='accion') WHERE title='Ghost Of Yotei';
