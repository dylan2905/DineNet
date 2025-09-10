-- Creating complete database structure for restaurant management system
CREATE DATABASE IF NOT EXISTS restaurant_management;
USE restaurant_management;

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de grupos (dentro de categorías)
CREATE TABLE IF NOT EXISTS groups_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Tabla de subgrupos (dentro de grupos)
CREATE TABLE IF NOT EXISTS subgroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups_table(id) ON DELETE CASCADE
);

-- Tabla de productos con preparación
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    group_id INT NOT NULL,
    subgroup_id INT NOT NULL,
    has_preparation BOOLEAN DEFAULT FALSE,
    preparation_time INT DEFAULT 0, -- tiempo en minutos
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (group_id) REFERENCES groups_table(id),
    FOREIGN KEY (subgroup_id) REFERENCES subgroups(id)
);

-- Tabla de mesas
CREATE TABLE IF NOT EXISTS tables_restaurant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_number VARCHAR(10) NOT NULL UNIQUE,
    capacity INT NOT NULL,
    is_occupied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de órdenes
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES tables_restaurant(id)
);

-- Tabla de items de orden
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    preparation_status ENUM('pending', 'preparing', 'ready') DEFAULT 'pending',
    preparation_start_time TIMESTAMP NULL,
    estimated_ready_time TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insertar datos de ejemplo
INSERT INTO categories (name, description) VALUES 
('Bebidas', 'Todas las bebidas del restaurante'),
('Comidas', 'Platos principales y entradas'),
('Postres', 'Dulces y postres');

INSERT INTO groups_table (category_id, name, description) VALUES 
(1, 'Bebidas Frías', 'Jugos, gaseosas y bebidas frías'),
(1, 'Bebidas Calientes', 'Café, té y bebidas calientes'),
(2, 'Entradas', 'Aperitivos y entradas'),
(2, 'Platos Principales', 'Comidas principales'),
(3, 'Helados', 'Helados y sorbetes');

INSERT INTO subgroups (group_id, name, description) VALUES 
(1, 'Jugos Naturales', 'Jugos de frutas naturales'),
(1, 'Gaseosas', 'Bebidas gaseosas'),
(2, 'Café', 'Diferentes tipos de café'),
(3, 'Sopas', 'Sopas y cremas'),
(4, 'Carnes', 'Platos con carne'),
(5, 'Helados Artesanales', 'Helados hechos en casa');

INSERT INTO tables_restaurant (table_number, capacity) VALUES 
('Mesa 1', 4),
('Mesa 2', 2),
('Mesa 3', 6),
('Mesa 4', 4),
('Mesa 5', 8);
