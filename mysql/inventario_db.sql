-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-01-2026 a las 02:35:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `pais` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id`, `nombre`, `pais`) VALUES
(1, 'Samsung', 'Corea del Sur'),
(2, 'Apple', 'Estados Unidos'),
(3, 'Sony', 'Japón'),
(4, 'LG', 'Corea del Sur'),
(5, 'Xiaomi', 'China'),
(6, 'HP', 'Estados Unidos'),
(7, 'Dell', 'Estados Unidos'),
(9, 'mishito', 'eslovenia '),
(10, 'coopelan', 'chile');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca_id` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad_existencias` int(11) NOT NULL,
  `usuario_registro_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `marca_id`, `descripcion`, `precio`, `cantidad_existencias`, `usuario_registro_id`) VALUES
(1, 'Smartphone Galaxy A54', 1, 'Teléfono inteligente Samsung', 350.00, 25, 1),
(2, 'Smart TV 55\"', 1, 'Televisor 4K UHD', 750.00, 10, 2),
(3, 'iPhone 14', 2, 'Teléfono Apple de última generación', 999.00, 15, 3),
(4, 'MacBook Air M2', 2, 'Laptop Apple con chip M2', 1200.00, 8, 1),
(5, 'PlayStation 5', 3, 'Consola de videojuegos Sony', 499.99, 12, 2),
(6, 'Audífonos Sony WH-1000XM5', 3, 'Audífonos inalámbricos premium', 399.00, 20, 1),
(7, 'Refrigerador LG', 4, 'Refrigerador inteligente LG', 850.00, 5, 2),
(8, 'Monitor LG 27\"', 4, 'Monitor 144hz', 280.00, 18, 3),
(9, 'Xiaomi Redmi Note 12', 5, 'Smartphone Xiaomi gama media', 220.00, 30, 1),
(10, 'Xiaomi Mi Band 7', 5, 'Pulsera inteligente', 50.00, 40, 3),
(11, 'Laptop HP Pavilion', 6, 'Laptop HP para uso general', 680.00, 14, 2),
(12, 'Impresora HP LaserJet', 6, 'Impresora láser monocromática', 190.00, 22, 1),
(13, 'Laptop Dell XPS 13', 7, 'Ultrabook premium Dell', 1300.00, 9, 2),
(14, 'Monitor Dell 24\"', 7, 'Monitor LED', 210.00, 17, 3),
(15, 'Teclado Dell', 7, 'Teclado inalámbrico', 45.00, 35, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `rol` enum('admin','comun') DEFAULT 'comun'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `username`, `clave`, `rol`) VALUES
(1, 'Juan', 'Pérez', 'juanp', '12345', 'comun'),
(2, 'María', 'López', 'marial', '12345', 'comun'),
(3, 'Carlos', 'Gómez', 'carlosg', '12345', 'comun'),
(20, 'bastian ', 'guzman', 'bastipyrus', '12345', 'comun'),
(22, 'admin', 'admin', 'admin', '12345', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `marca_id` (`marca_id`),
  ADD KEY `usuario_registro_id` (`usuario_registro_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marca` (`id`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`usuario_registro_id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
