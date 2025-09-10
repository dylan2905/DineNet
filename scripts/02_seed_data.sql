-- Sample data for Restaurant Management System
USE restaurant_management;

-- Insert default users
INSERT INTO users (email, password, role, name) VALUES
('admin@restaurant.com', '123456', 'admin', 'Admin Usuario'),
('mesero@restaurant.com', '123456', 'mesero', 'Juan Mesero'),
('cajero@restaurant.com', '123456', 'cajero', 'María Cajero');

-- Insert tax configurations
INSERT INTO tax_configs (name, rate, is_default) VALUES
('IVA General', 19.00, TRUE),
('IVA Reducido', 8.00, FALSE),
('Exento', 0.00, FALSE);

-- Insert sample categories
INSERT INTO categories (code, name, description) VALUES
('CAT00', 'Bebidas', 'Bebidas frías y calientes'),
('CAT01', 'Comidas', 'Platos principales y entradas'),
('CAT02', 'Postres', 'Postres y dulces');

-- Insert sample groups
INSERT INTO groups (code, name, description, category_id) VALUES
('GRP00', 'Bebidas Frías', 'Refrescos y jugos', 1),
('GRP01', 'Pizzas', 'Pizzas artesanales', 2),
('GRP02', 'Helados', 'Helados y sorbetes', 3);

-- Insert sample subgroups
INSERT INTO subgroups (code, name, description, group_id) VALUES
('SUB00', 'Gaseosas', 'Bebidas gaseosas', 1),
('SUB01', 'Pizza Margherita', 'Pizzas clásicas', 2),
('SUB02', 'Helados Artesanales', 'Helados caseros', 3);

-- Insert sample products
INSERT INTO products (code, name, description, price, category_id, group_id, subgroup_id, requires_preparation, preparation_time, tax_rate) VALUES
('PRD00000001', 'Coca Cola', 'Refresco de cola 350ml', 3500.00, 1, 1, 1, FALSE, 0, 19.00),
('PRD00000002', 'Pizza Margherita', 'Pizza con tomate, mozzarella y albahaca', 25000.00, 2, 2, 2, TRUE, 15, 8.00),
('PRD00000003', 'Helado de Vainilla', 'Helado artesanal de vainilla', 8000.00, 3, 3, 3, FALSE, 0, 19.00);

-- Insert sample tables
INSERT INTO tables (name, capacity, status, location) VALUES
('Mesa 1', 4, 'available', 'Terraza'),
('Mesa 2', 2, 'occupied', 'Interior'),
('Mesa 3', 6, 'reserved', 'Salón Principal'),
('Mesa 4', 4, 'available', 'Interior'),
('Mesa 5', 8, 'available', 'Salón Principal'),
('Mesa 6', 2, 'occupied', 'Terraza');

-- Insert sample inventory
INSERT INTO inventory (name, description, current_stock, min_stock, max_stock, unit_cost, supplier, unit) VALUES
('Harina de Trigo', 'Harina para pizza y pan', 25.00, 10.00, 50.00, 2500.00, 'Molinos del Sur', 'kg'),
('Queso Mozzarella', 'Queso mozzarella para pizzas', 8.00, 15.00, 30.00, 12000.00, 'Lácteos Premium', 'kg'),
('Tomates', 'Tomates frescos para salsa', 12.00, 8.00, 25.00, 3500.00, 'Verduras Frescas', 'kg'),
('Coca Cola', 'Refresco de cola 2L', 24.00, 12.00, 48.00, 2800.00, 'Distribuidora Bebidas', 'unidades');

-- Insert restaurant configuration
INSERT INTO restaurant_config (name, phone, email, ruc_nit, address, currency, default_tax_rate, service_charge_rate) VALUES
('Mi Restaurante', '+1 234 567 8900', 'contacto@mirestaurante.com', '12345678-9', 'Calle Principal 123, Ciudad', 'COP', 19.00, 10.00);
