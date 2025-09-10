-- Enhanced database schema for hierarchical categories and preparation tracking
CREATE DATABASE IF NOT EXISTS restaurant_management;
USE restaurant_management;

-- Categories table (top level)
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Groups table (belongs to categories)
CREATE TABLE groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Subgroups table (belongs to groups)
CREATE TABLE subgroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    group_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Products table (enhanced with preparation options)
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    group_id INT NOT NULL,
    subgroup_id INT NOT NULL,
    requires_preparation BOOLEAN DEFAULT FALSE,
    preparation_time INT DEFAULT 0, -- in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (subgroup_id) REFERENCES subgroups(id) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'ready', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table (enhanced with preparation tracking)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    start_time TIMESTAMP NULL, -- when preparation started
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO categories (name, description) VALUES
('Bebidas', 'Todas las bebidas frías y calientes'),
('Comidas', 'Platos principales y acompañamientos'),
('Postres', 'Dulces y postres variados');

INSERT INTO groups (name, description, category_id) VALUES
('Bebidas Frías', 'Jugos, gaseosas y bebidas frías', 1),
('Bebidas Calientes', 'Café, té y bebidas calientes', 1),
('Platos Principales', 'Comidas completas', 2),
('Acompañamientos', 'Guarniciones y extras', 2),
('Postres Fríos', 'Helados y postres refrigerados', 3),
('Postres Calientes', 'Postres servidos calientes', 3);

INSERT INTO subgroups (name, description, group_id) VALUES
('Jugos Naturales', 'Jugos de frutas frescas', 1),
('Gaseosas', 'Bebidas carbonatadas', 1),
('Café', 'Variedades de café', 2),
('Té', 'Diferentes tipos de té', 2),
('Carnes', 'Platos con carne', 3),
('Vegetarianos', 'Platos sin carne', 3),
('Papas', 'Preparaciones de papa', 4),
('Ensaladas', 'Ensaladas variadas', 4),
('Helados', 'Helados artesanales', 5),
('Tortas', 'Tortas y pasteles', 6);

INSERT INTO products (name, description, price, category_id, group_id, subgroup_id, requires_preparation, preparation_time) VALUES
('Jugo de Naranja', 'Jugo natural de naranja recién exprimido', 8000, 1, 1, 1, true, 3),
('Coca Cola', 'Gaseosa Coca Cola 350ml', 5000, 1, 1, 2, false, 0),
('Café Americano', 'Café negro tradicional', 6000, 1, 2, 3, true, 5),
('Té Verde', 'Té verde premium', 5500, 1, 2, 4, true, 4),
('Bandeja Paisa', 'Plato típico colombiano completo', 25000, 2, 3, 5, true, 20),
('Ensalada César', 'Ensalada con pollo y aderezo césar', 18000, 2, 3, 6, true, 8),
('Papas Francesas', 'Papas fritas crujientes', 8000, 2, 4, 7, true, 6),
('Ensalada Mixta', 'Ensalada de verduras frescas', 12000, 2, 4, 8, true, 5),
('Helado de Vainilla', 'Helado artesanal de vainilla', 7000, 3, 5, 9, false, 0),
('Torta de Chocolate', 'Porción de torta de chocolate', 9000, 3, 6, 10, true, 2);
