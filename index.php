<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Restaurante</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Sistema de Gestión de Restaurante</h1>
            <nav class="nav">
                <a href="index.php" class="nav-link active">Inicio</a>
                <a href="pages/categories.php" class="nav-link">Categorías</a>
                <a href="pages/products.php" class="nav-link">Productos</a>
                <a href="pages/orders.php" class="nav-link">Órdenes</a>
                <a href="pages/kitchen.php" class="nav-link" target="_blank">Comandas Cocina</a>
            </nav>
        </header>

        <main class="main">
            <div class="dashboard">
                <div class="card">
                    <h2>Gestión de Categorías</h2>
                    <p>Administra categorías, grupos y subgrupos de productos</p>
                    <a href="pages/categories.php" class="btn btn-primary">Ir a Categorías</a>
                </div>

                <div class="card">
                    <h2>Gestión de Productos</h2>
                    <p>Crea y administra productos con tiempos de preparación</p>
                    <a href="pages/products.php" class="btn btn-primary">Ir a Productos</a>
                </div>

                <div class="card">
                    <h2>Órdenes</h2>
                    <p>Gestiona las órdenes del restaurante</p>
                    <a href="pages/orders.php" class="btn btn-primary">Ir a Órdenes</a>
                </div>

                <div class="card">
                    <h2>Comandas de Cocina</h2>
                    <p>Pantalla para el televisor de la cocina</p>
                    <a href="pages/kitchen.php" class="btn btn-secondary" target="_blank">Abrir Comandas</a>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
