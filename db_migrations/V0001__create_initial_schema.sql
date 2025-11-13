CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  description TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_price INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_address TEXT,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  plant_id INTEGER REFERENCES plants(id),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL
);

INSERT INTO users (email, password_hash, full_name, is_admin) VALUES 
('admin@rampitomnik.ru', '$2b$10$YourHashedPasswordHere', 'Администратор', TRUE);

INSERT INTO plants (name, category, price, image_url, description, in_stock) VALUES
('Сосна обыкновенная', 'Хвойные', 1200, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/3323152c-490d-403e-bb3d-2e6977b74d71.jpg', 'Высота 40-60 см, контейнер 3л', TRUE),
('Ель колючая (голубая)', 'Хвойные', 2500, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/3323152c-490d-403e-bb3d-2e6977b74d71.jpg', 'Высота 60-80 см, контейнер 5л', TRUE),
('Туя западная Смарагд', 'Хвойные', 1800, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/3323152c-490d-403e-bb3d-2e6977b74d71.jpg', 'Высота 50-70 см, контейнер 4л', TRUE),
('Спирея японская', 'Кустарники', 800, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/72999392-ef59-4ed4-ae21-871b351ac944.jpg', 'Высота 30-40 см, контейнер 2л', TRUE),
('Гортензия метельчатая', 'Кустарники', 1500, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/72999392-ef59-4ed4-ae21-871b351ac944.jpg', 'Высота 40-50 см, контейнер 3л', TRUE),
('Барбарис Тунберга', 'Кустарники', 900, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/72999392-ef59-4ed4-ae21-871b351ac944.jpg', 'Высота 30-40 см, контейнер 2л', TRUE),
('Хоста Sum and Substance', 'Многолетники', 600, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/8aa576e0-951e-4cb5-ace8-d6506e14ce71.jpg', 'Контейнер 1.5л', TRUE),
('Лилейник гибридный', 'Многолетники', 500, 'https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/8aa576e0-951e-4cb5-ace8-d6506e14ce71.jpg', 'Контейнер 1.5л', TRUE);