-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2026 a las 14:06:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `solarpets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0,
  `clienteId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Perros', 'Todos los articulos relacionados con perros'),
(2, 'Gatos', 'Todos los articulos relacionados con gatos'),
(3, 'Mixto', 'Todos los articulos que son ideales tanto para perros como para gatos'),
(4, 'alimentos', 'Alimento de todos los tipos para las mascotas'),
(5, 'Higiene', 'Productos de higiene para la salud y cuidado de las mascotas'),
(6, 'Snacks', 'Productos para las mascotas'),
(7, 'Salud', 'Productos de salud tipo pipetas, medicamentos, etc'),
(8, 'Ropa', 'productos para vestir a la mascota'),
(9, 'Accesorios', 'Productos que tus mascotas pueden llevar para lucir mejor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clienteempleado`
--

CREATE TABLE `clienteempleado` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClienteId` int(11) NOT NULL,
  `EmpleadoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `password` varchar(60) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `establecimiento` varchar(25) NOT NULL,
  `salario` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `turno` varchar(25) NOT NULL,
  `localidad` varchar(50) NOT NULL,
  `fechaAlta` datetime NOT NULL,
  `fechaBaja` datetime DEFAULT NULL,
  `especialidad` varchar(50) NOT NULL,
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `itemcarrito`
--

CREATE TABLE `itemcarrito` (
  `id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precioUnitario` decimal(10,2) NOT NULL,
  `carritoId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `animal` varchar(20) DEFAULT NULL,
  `raza` varchar(100) NOT NULL,
  `antecedentes` text DEFAULT NULL,
  `historialMedico` text DEFAULT NULL,
  `estado` text DEFAULT NULL,
  `fechaNacimiento` datetime DEFAULT NULL,
  `dueño` tinyint(1) DEFAULT NULL,
  `idMascota` int(11) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `factura` decimal(10,2) NOT NULL,
  `fecha` datetime NOT NULL,
  `contenido` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productopedido`
--

CREATE TABLE `productopedido` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductoId` int(11) NOT NULL,
  `PedidoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productoproveedor`
--

CREATE TABLE `productoproveedor` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductoId` int(11) NOT NULL,
  `ProveedorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` text NOT NULL,
  `descripcion` text NOT NULL,
  `tipoAnimal` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `stock`, `imagen`, `descripcion`, `tipoAnimal`) VALUES
(3, 'Alimento Para Perros Adultos Sabor Carne Y Pollo Maintenance Criadores 15kg', 34203.00, 10, 'https://static.cotodigital3.com.ar/sitios/fotos/large/00616400/00616462.jpg', 'Alimento Para Perros Adultos Sabor Carne Y Pollo Maintenance Criadores 15kg', 1),
(4, 'Alimento En Sobres WHISKAS 85 Gr Pollo', 1399.00, 25, 'https://static.cotodigital3.com.ar/sitios/fotos/large/00231100/00231118.jpg', 'Whiskas Sobrecitos Pouch Sabor Carne 85 Grs.\r\n\r\nWhiskas en sobrecitos adulto sabor Carne en SALSA, es un alimento húmedo nutricionalmente completo y balanceado. Son trocitos de carne cocidos al vapor en una deliciosa salsa. Su fórmula contiene proteínas de alta calidad proporcionando los nutrientes que ellos necesitan todos los días, manteniéndolos siempre saludables. Desarrollados con un 80% de agua en su composición aportan 1/3 de las necesidades hídricas de un gato al día. Esto ayuda a prevenir las enfermedades de tracto urinario que se originan con el stress y falta de ingesta diaria de agua (algo normal en los gatos debido a su origen desértico)\r\nPara gatos adultos ofrecer hasta tres sobresitos por día. (1 Sobresito = 85 grs.)', 0),
(5, 'Piedras Sanitarias Absorsol Premium - Absorsol 2 Kg', 3900.00, 20, 'https://puppis.vtexassets.com/arquivos/ids/198302-1200-1200?v=638683999978800000&width=1200&height=1200&aspect=true', 'Las Piedras Sanitarias Absorsol Premium, poseen máximo rendimiento con bajo mantenimiento. Su composición ecológica y reciclable, quita los olores de los excrementos, absorbe la cantidad de líquido equivalente a su peso rápidamente, y no desprende el líquido absorbido. Las piedritas son porosas y livianas (50% de su volumen es hueco), y tu mascota puede esconder sus excrementos sin desparramar y sin que se adhiera a sus patas.\r\n\r\nBeneficios\r\nNo hace barro: Mantiene su apariencia sólida y granulada cuando está saturado de líquido (cambia de color en este estado), sin deshacerse.\r\nGracias a que es 100% natural no produce reacciones cutáneas y tanto su inhalación como su ingestión no son perjudiciales para la salud de las personas ni de animales.\r\nCon su nueva fórmula logra una máxima capacidad de absorción y desodorización acompañada de una mayor durabilidad.\r\nAdemás, la composición micro porosa interna de los minerales retienen los gérmenes y bacterias.', 0),
(6, 'Juguete dental Power Bone para perro Dental Plus - Dental Plus S', 8000.00, 10, 'https://puppis.vtexassets.com/arquivos/ids/209586-1200-1200?v=639199010167230000&width=1200&height=1200&aspect=true', 'Juguete dental para perros con diseño en forma de hueso y superficie texturizada, pensado para acompañar la masticación y el cuidado bucal diario.\r\n\r\nSu relieve ayuda a friccionar los dientes durante el juego, colaborando con la remoción de placa y el masaje de las encías. La masticación además funciona como una actividad que entretiene y ayuda a canalizar la energía.\r\n\r\nTallas disponibles:\r\n\r\nTalla S: ideal para perros pequeños.\r\n\r\nTalla M: ideal para perros medianos.\r\n\r\nTalla L: ideal para perros grandes.\r\n\r\nMateriales y/o composición:\r\n\r\nMaterial sintético resistente apto para masticación.\r\n\r\nAdvertencias:\r\n\r\nEste juguete no es comestible. Su uso debe ser bajo supervisión. Elegí la talla acorde al tamaño y a la mordida de tu perro. Si el juguete se daña o presenta desgaste, retiralo de inmediato.\r\n\r\nBeneficios\r\nSuperficie texturizada que ayuda a friccionar los dientes durante el juego.\r\nAcompaña la higiene bucal y el masaje de encías.\r\nCanaliza el instinto natural de masticar.\r\nEntretiene y ayuda a reducir el aburrimiento.\r\nDisponible en tres tallas según el tamaño del perro.', 1),
(7, 'Pelota Pawise Soga - Pawise 6,3 Cm', 4000.00, 10, 'https://puppis.vtexassets.com/arquivos/ids/202793-1200-1200?v=638941474284600000&width=1200&height=1200&aspect=true', '\r\n¡El Pelota Pawise Soga de Pawise es el **accesorio ideal** en la categoría de Juguetes para tu mascota! Fabricado con la más alta calidad, incluye características esenciales: 6,3 Cm. Mantené a tu compañero entretenido y activo. ¡Comprá ahora y transformá su día!\r\n\r\n', NULL),
(8, 'Alimento Excellent Gato Adulto Pollo Y Arroz - 1 Kg', 13200.00, 15, 'https://puppis.vtexassets.com/arquivos/ids/197025-800-800?v=638587443687270000&width=800&height=800&aspect=true', 'Alimento Excellent para gatos adultos sabor pollo y arroz.\r\n\r\nFórmula con fuentes de proteínas de alta digestibilidad que ayudan a mantener músculos fuertes y sanos.\r\n\r\nBeneficios\r\nBalance de ingredientes que ayuda a mantener un pH adecuado en la orina y favorece un tracto urinario saludable.\r\nOmega 6 y 3, vitaminas y minerales que favorecen una piel y un pelaje saludables.\r\nContribuye a una condición corporal ideal.', 0),
(9, 'Alimento Royal Canin Gato Adulto Indoor 27 - 7,5 Kg', 135600.00, 5, 'https://puppis.vtexassets.com/arquivos/ids/202993-800-800?v=638954928104270000&width=800&height=800&aspect=true', 'Alimento Royal Canin Indoor 27 para gatos adultos que viven en interiores.\r\n\r\nFavorece heces pequeñas, firmes y menos olorosas gracias a la zeolita, las fibras insolubles y los FOS.\r\n\r\nBeneficios\r\nAporte calórico moderado y L-carnitina que ayudan a mantener el peso.\r\nFibras no fermentables y pulpa de remolacha que estimulan el tránsito intestinal y facilitan la eliminación del pelo ingerido.', 0),
(10, 'Alimento Old Prince Complete Gato Adulto - 3 Kg', 28500.00, 12, 'https://puppis.vtexassets.com/arquivos/ids/192567-800-800?v=638199304194330000&width=800&height=800&aspect=true', 'Alimento Old Prince Complete para gatos adultos de todas las razas. Línea premium, pensado para la alimentación diaria.', 0),
(11, 'Piedras Sanitarias Puppis Diatomita - 3,6 Kg', 6000.00, 20, 'https://puppis.vtexassets.com/arquivos/ids/205631-800-800?v=639038358823630000&width=800&height=800&aspect=true', 'Arena de diatomita natural para gatos.\r\n\r\nPiedras sanitarias livianas de composición mineral con pH neutro, para un cuidado higiénico 100% natural y libre de aditivos.\r\n\r\nBeneficios\r\nAlto poder de absorción y ultra livianas.\r\n100% natural, de origen mineral y sin procesos químicos.\r\nEcológica y de bajo impacto ambiental.\r\nBajo contenido de polvo.', 0),
(12, 'Piedras Sanitarias Puppis Bentonita Natural - 4 Kg', 10500.00, 15, 'https://puppis.vtexassets.com/arquivos/ids/182347-800-800?v=637655947792900000&width=800&height=800&aspect=true', 'Piedras sanitarias de bentonita natural para mantener limpio el espacio de tu gato.\r\n\r\nEstán hechas con materiales no tóxicos y biodegradables que neutralizan los olores. Su gran poder de absorción asegura más duración que las piedras comunes.\r\n\r\nModo de uso: colocar la arena en la bandeja hasta una altura de 5 cm, retirar los residuos secos una vez al día y cambiar todo el contenido cada 6 semanas.\r\n\r\nBeneficios\r\nBiodegradables.\r\nLibres de polvo.\r\nNeutralizan los olores.', 0),
(13, 'Juguete Cancat Ratón Saltarín', 15000.00, 10, 'https://puppis.vtexassets.com/arquivos/ids/195595-800-800?v=638379670370000000&width=800&height=800&aspect=true', 'Ratón de juguete que combina texturas y materiales como hilos y papeles para despertar la curiosidad de tu gato.\r\n\r\nGracias al resorte, se mueve de forma que estimula su instinto cazador y lo ayuda a liberar estrés.\r\n\r\nBeneficios\r\nAyuda a liberar estrés.\r\nMotiva su instinto de cazador.\r\nCombina texturas y materiales que a tu gato le encantan.', 0),
(14, 'Rascador Casa para Gato Beepaw', 90000.00, 3, 'https://puppis.vtexassets.com/arquivos/ids/207831-800-800?v=639156045919900000&width=800&height=800&aspect=true', 'Rascador con diseño tipo casa que combina un refugio y una superficie de rascado en un solo accesorio.\r\n\r\nOfrece a tu gato un lugar acogedor donde esconderse, descansar y jugar, mientras satisface su instinto natural de rascar.\r\n\r\nBeneficios\r\nDiseño tipo casa que combina refugio y superficie de rascado.\r\nBrinda un espacio acogedor para esconderse y descansar.\r\nAyuda a proteger los muebles del hogar.\r\nFavorece el cuidado de las uñas y la reducción del estrés.', 0),
(15, 'Piedras Sanitarias Bentonita Lavanda Nelsoni Ranch - Nelsoni Ranch 4 Kg', 9500.00, 30, 'https://puppis.vtexassets.com/arquivos/ids/190971-1600-1600?v=638070679913170000&width=1600&height=1600&aspect=true', '\r\nLas Piedras Sanitarias Nelsoni Ranch son naturales y sus componentes mantienen un alto estándar de calidad, aglutinan los residuos facilitando la eliminación de terrones. Durante el proceso de fabricación no se utilizan productos químicos, promueven una rápida absorción y un poderoso control de olores, dejando la bandeja de tu gato siempre seca.\r\n\r\nBeneficios\r\n100% natural.\r\nNo tóxico.\r\nFácil de limpiar ya que aglutina los líquidos.\r\nMáximo nivel de absorción.\r\nAtrae el instinto natural del gato.\r\nExtremadamente duradero.', 0),
(16, ' Arena Sanitaria StoneCat - StoneCat 16 Kg', 28800.00, 15, 'https://puppis.vtexassets.com/arquivos/ids/186212-1600-1600?v=637847599563330000&width=1600&height=1600&aspect=true', 'Las Piedras Sanitarias Stonecat Bentonita, tienen un gran poder aglutinante, lo que facilita la limpieza al formar cúmulos fáciles de recoger. Además, son muy eficientes en neutralizar olores, lo que ayuda a que mantengas un ambiente agradable en tu hogar.\r\n\r\nBeneficios\r\n100% natural y libre de tóxicos.\r\nFácil de limpiar.\r\nGran poder de absorción de líquidos y olores.\r\nMateriales\r\n100% Bentonita Pura Seleccionada.', 0),
(17, 'Piedras Sanitarias Tidy Cats - Tidy Cats 3,6 Kg', 9300.00, 9, 'https://puppis.vtexassets.com/arquivos/ids/193916-1600-1600?v=638252803183530000&width=1600&height=1600&aspect=true', '\r\nLas Piedras Sanitarias Tidy Cats son ideales para mantener la comodidad e higiene de tu gato en todo momento y por tiempo prolongado. Son la mejor opción porque no se pegan a sus patitas, su poder aglutinante facilita la limpieza y cuentan con una gran absorción, por lo que no tendrás líquidos en tu caja.\r\n\r\nBeneficios\r\nNo se pegan a las patitas.\r\nSúper absorbentes y aglutinantes.', 0),
(18, 'Pipeta Frontline Plus para Gatos - Frontline\r\nPipeta', 12300.00, 15, 'https://puppis.vtexassets.com/arquivos/ids/170191-1600-1600?v=637142662154000000&width=1600&height=1600&aspect=true', '\r\nNúmero de registro en SENASA 02-077 Tipo de matrícula del responsable veterinario Matricula Nacional Número de matrícula del responsable veterinario 9922 Número de habilitación del establecimiento 335/24 Pipeta Frontline Plus para Gatos – Protección Completa contra Pulgas, Garrapatas y Piojos ¡Mantené a tu gato protegido y libre de parásitos! Frontline Plus es una pipeta antiparasitaria de uso tópico desarrollada por Boehringer Ingelheim, indicada para el tratamiento y prevención de infestaciones por pulgas (Ctenocephalides spp.), garrapatas (Rhipicephalus spp., Dermacentor spp., Ixodes spp.) y piojos masticadores (Felicola subrostratus) en gatos. Su fórmula combina dos potentes principios activos: Fipronil y (S)-Metopreno, que actúan eliminando los parásitos por contacto y previniendo el desarrollo de estadios inmaduros de pulgas. Beneficios clave: Elimina pulgas, garrapatas y piojos por contacto, sin necesidad de que piquen. Efecto residual prolongado: hasta 6 semanas contra pulgas y 4 semanas contra garrapatas. Previene la reinfestación del hogar al eliminar huevos y larvas de pulgas presentes en el ambiente. Apto para gatos a partir de las 8 semanas de edad y más de 1 kg de peso. Seguro para hembras gestantes y lactantes. Modo de uso: Aplicación externa: aplicar el contenido total de la pipeta directamente sobre la piel seca del gato, en la zona entre las escápulas, separando el pelo para facilitar la absorción. Frecuencia: repetir la aplicación cada 4 a 6 semanas para mantener una protección constante. Precauciones: evitar bañar al gato 48 horas antes o después de la aplicación para asegurar la eficacia del producto. Presentación: Pipeta de 0,5 ml: adecuada para gatos de todos los tamaños.', 0),
(19, 'Antiparasitario Total Full Suspension Para Gatos (x15ml) - Total Full 15ml', 7900.00, 20, 'https://puppis.vtexassets.com/arquivos/ids/158479-1600-1600?v=636014231245430000&width=1600&height=1600&aspect=true', 'El Antiparasitario Total Full Suspension para Gatos es un tratamiento de amplio espectro diseñado para eliminar parásitos internos en gatos, como nematodos y cestodos. Su fórmula incluye tres ingredientes activos: Fenbendazol, Pirantel, y Praziquantel, que actúan de manera complementaria para eliminar una variedad de parásitos. Este producto se presenta en un frasco de 15 ml, con un dosificador que facilita su administración oral. La dosis recomendada es de 1 ml por cada kg de peso del gato, administrada en una sola toma. En casos de infestaciones graves, se puede repetir la dosis a las 24 horas. Es seguro para gatos adultos y cachorros a partir de los 20 días de edad y se puede usar también en hembras gestantes y en lactancia. Para infestaciones severas, se recomienda repetir la desparasitación entre los 15 y 21 días.', 0),
(20, 'Revolution 6 Gatos 2.6-7.5Kg Pipeta - Revolution2,6 - 7,5 Kg', 30500.00, 10, 'https://puppis.vtexassets.com/arquivos/ids/196851-1600-1600?v=638567511303430000&width=1600&height=1600&aspect=true', 'La Pipeta Revolution para gatos, específicamente en la presentación de 0,75 ml para felinos de 2.6 a 7.5 kg, es un antiparasitario de amplio espectro que combate tanto parásitos internos como externos. Su fórmula contiene Selamectina, un compuesto eficaz que actúa contra pulgas, garrapatas, sarna, y lombrices intestinales. Además, es muy efectiva contra las infestaciones de ácaros y filarias, y previene las enfermedades transmitidas por estos parásitos. La aplicación es sencilla: basta con aplicar el contenido del tubo sobre la piel, entre los omóplatos, y el producto se absorbe rápidamente. Su acción dura aproximadamente un mes, y se recomienda su uso mensual para mantener el control sobre los parásitos. Esta pipeta es adecuada para gatos desde las seis semanas de edad.', 0),
(21, 'Alimento Royal Canin Perro Mini Adult 8+ - 3 Kg', 45800.00, 5, 'https://puppis.vtexassets.com/arquivos/ids/211407-1600-1600?v=639250961457300000&width=1600&height=1600&aspect=true', '\r\nAlimento para perros seniors de talla pequeña (hasta 10 kg), de 8 a 12 años de edad. Royal Canin Mini Adulto 8+ aporta un contenido adaptado de nutrientes que ayudan a mantener la vitalidad frente a los primeros signos del envejecimiento. Incluye un complejo exclusivo de antioxidantes que contribuye a neutralizar los radicales libres. Su fórmula con aromas seleccionados satisface incluso a los perros con apetito caprichoso. Además, ayuda a mantener un peso saludable gracias al aporte de L-carnitina, que favorece el metabolismo de las grasas.\r\n\r\nBeneficios\r\n• Contribuye a mantener la vitalidad.\r\n• Ayuda a mantener un peso saludable.\r\n• Satisface apetitos caprichosos.\r\nArroz, maíz, harina de subproductos de pollo, harina de gluten de maíz, proteína vegetal purificada L.I.P. (gluten de trigo), grasas vacuna, aceite de pollo, hidrolizado de hígado de pollo, pulpa de remolacha, sales minerales, aceite de soja, aceite de pescado, levadura de cerveza, vitaminas, oligoelementos, fructo-oligosacáridos (FOS), L-lisina, taurina, DL-metionina, aceite vegetal (aceite de borraja), oligoelementos quelados, extracto de rosa de la India (rico en luteína), extracto de té verde (rico en polifenoles), L-carnitina.\r\nVitaminas:\r\nVitamina A, vitamina D3, vitamina E, vitamina C, pantotenato de calcio, niacina, vitamina B1, vitamina B2, vitamina B6, ácido fólico, biotina, vitamina B12, colina.\r\nSales minerales:\r\nCalcita, cloruro de potasio, politrifosfato de sodio, sorbato de potasio, cloruro de sodio, óxido de magnesio.\r\nOligoelementos:\r\nSulfato de hierro, óxido de zinc, óxido de manganeso, sulfato de cobre, iodato de calcio, selenio orgánico.\r\nOligoelementos quelados:\r\nZinc, manganeso, cobre.\r\nConservantes y antioxidantes:\r\nBHA, galato de propilo y ácido cítrico.', 1),
(22, 'Alimento Royal Canin Perro Medium Adulto - 15 Kg', 143500.00, 5, 'https://puppis.vtexassets.com/arquivos/ids/213967-1600-1600?v=639291793838470000&width=1600&height=1600&aspect=true', '\r\nAlimento completo para perros adultos de talla mediana (de 11 a 25 kg), desde los 12 meses hasta los 7 años de edad. Royal Canin Medium Adulto ayuda a dar soporte a las defensas naturales gracias a un complejo de antioxidantes y a los manano-oligosacáridos. Contribuye a a mantener una óptima digestibilidad gracias a una fórmula exclusiva que incluye proteínas de alta calidad y un aporte balanceado de fibras dietarias. Su fórmula enriquecida con ácidos grasos Omega 3 (EPA & DHA) ayuda a mantener una piel saludable.\r\n\r\nBeneficios\r\nAyuda a dar soporte a las defensas naturales.\r\nContribuye a mantener una óptima digestibilidad.\r\nAyuda a mantener una piel saludable.\r\nMaíz, harina de subproductos de pollo, harina detrigo, arroz, harina de carne vacuna L.I.P.*, hidrolizado de hígado de pollo,grasas vacuna, aceite de pollo, pulpa de remolacha, sales minerales,aceite de pescado, aceite de soja, levadura de cerveza, vitaminas,manano-oligosacáridos (MOS), oligoelementos, taurina. (*) Low Indigestible Protein: proteína seleccionada por su alta asimilación. Vitaminas: Vitamina A, vitamina D3, vitamina E, vitamina C, pantotenatode calcio, niacina, vitamina B1, vitamina B2, vitamina B6, ácido fólico,biotina, vitamina B12, colina. Sales minerales: Calcita, cloruro de sodio, cloruro de potasio, sorbatode potasio. Oligoelementos: Óxido de zinc, sulfato de hierro, óxido de manganeso,sulfato de cobre, selenio orgánico, iodato de calcio.Conservantes y antioxidantes: BHA, galato de propilo y ácido cítrico.', 1),
(23, 'Alimento Old Prince Equilibrium Adulto - 20 Kg', 83100.00, 5, 'https://puppis.vtexassets.com/arquivos/ids/181555-1600-1600?v=639051312011230000&width=1600&height=1600&aspect=true', 'El Alimento Old Prince Equilibrium para Perro Medium y Grande, es una línea cuenta con una formulación que incorpora fuentes innovadoras de sales compuestas y fibras de baja fermentación que aportan propiedades beneficiosas para perros fomentando el estado saludable del organismo.\r\n\r\nBeneficios\r\nIncorpora fuentes innovadoras de sales compuestas y fibras de baja fermentación, como Equilibrium y Fiber, con propiedades beneficiosas para perros.\r\nHarina de subproductos de pollo, arroz, gluten de maíz, germen de maíz desgrasado, grasa animal (pollo - cerdo), aceite de pescado (fuente de omega 3), hidrolizado proteico bovino, pulpa de remolacha (fuente de fructo-oligosacáridos - FOS), fuente de fibra insoluble, levadura de cerveza, zeoliota, sal, acidificante en polvo, extracto de yucca schidigera, manano-oligasacáridos - MOS. nucleótidos de levadura, carbonato de calcio, dipropionato de monio, ácido propínico, acetato de zinc, pirofosfato ácido de sodio, glucosamina, condroitin sulfato, ascorbato de manganeso, metionina, BHT, BHA, antioxidantes naturales: extracto de romero, vitamina C, betacaroteno, licopeno, luteína, polifenoles, taurina, vitaminas: A, D3, E, K, B1, B2, B6, B12, ácido fólico, ácido nicotínico, pantotenato de calcio, biotina, colina, minerales: zinc, hierro, cobre, yodo, selenio.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosubcategoria`
--

CREATE TABLE `productosubcategoria` (
  `ProductoId` int(11) NOT NULL,
  `SubCategoriaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productosubcategoria`
--

INSERT INTO `productosubcategoria` (`ProductoId`, `SubCategoriaId`) VALUES
(3, 1),
(4, 4),
(5, 11),
(6, 12),
(7, 12),
(8, 1),
(9, 1),
(10, 1),
(11, 11),
(12, 11),
(13, 12),
(14, 12),
(15, 11),
(16, 11),
(17, 11),
(18, 9),
(19, 9),
(20, 9),
(21, 1),
(22, 1),
(23, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(35) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `enlace` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `nombre`, `telefono`, `direccion`, `enlace`) VALUES
(1, 'HappyPet', '1133845416', 'Se maneja de forma virtual', 'https://www.happypets.ar/camas-moises/?gad_source=1&gad_campaignid=23630555939&gbraid=0AAAAABq10XP2lcgPUUsIt66mDBzN-hY-r&gclid=Cj0KCQiA77DXBhCHARIsAHf2MNo6x7SVkschQnzQRAjkzWJqbkHMxmZzaSJlG0dSVVNbwm4seH9JgrEaAoToEALw_wcB'),
(2, 'Peyga', '1126772328', 'Helguera 348, Flores, CABA, Argentina', 'https://www.pega.com.ar/');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--

CREATE TABLE `reseñas` (
  `id` int(11) NOT NULL,
  `valoracion` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Administrador', 'asd'),
(2, 'Empleado', 'asd'),
(5, 'Cliente', 'asd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategorias`
--

CREATE TABLE `subcategorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` text NOT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subcategorias`
--

INSERT INTO `subcategorias` (`id`, `nombre`, `descripcion`, `idCategoria`) VALUES
(1, 'alimentos secos', 'alimentos secos puess', 4),
(2, 'Paseo', 'Para el parque', 9),
(3, 'Comedores y bebedores', 'platos para las mascotas', 9),
(4, 'Alimentos humedos', 'alimentos humedos puess', 4),
(5, 'Camas', 'cuchas', 9),
(6, 'Antiparasitarios', 'pipetas', 7),
(7, 'transportadoras', 'Tanto gatos y perros', 9),
(8, 'Alimentos especiales', 'alimentos para enfermedades o tratamientos', 4),
(9, 'Antipulgas y garrapatas', 'antipulgas y garrapatas', 7),
(10, 'Huesos y cueros', 'para los dientes del perro', 6),
(11, 'Piedras y arena', 'Lo necesario para los desechos de los felinos', 5),
(12, 'Juguetes', 'Accesorios para evitar el aburrimiento de las mascotas', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cita` datetime NOT NULL,
  `motivo` text NOT NULL,
  `animal` varchar(20) DEFAULT NULL,
  `raza` varchar(100) NOT NULL,
  `servicio` varchar(30) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `idEmpleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clienteId` (`clienteId`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clienteempleado`
--
ALTER TABLE `clienteempleado`
  ADD PRIMARY KEY (`ClienteId`,`EmpleadoId`),
  ADD KEY `EmpleadoId` (`EmpleadoId`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRol` (`idRol`);

--
-- Indices de la tabla `itemcarrito`
--
ALTER TABLE `itemcarrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carritoId` (`carritoId`),
  ADD KEY `productoId` (`productoId`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMascota` (`idMascota`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD PRIMARY KEY (`ProductoId`,`PedidoId`),
  ADD KEY `PedidoId` (`PedidoId`);

--
-- Indices de la tabla `productoproveedor`
--
ALTER TABLE `productoproveedor`
  ADD PRIMARY KEY (`ProductoId`,`ProveedorId`),
  ADD KEY `ProveedorId` (`ProveedorId`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productosubcategoria`
--
ALTER TABLE `productosubcategoria`
  ADD PRIMARY KEY (`ProductoId`,`SubCategoriaId`),
  ADD KEY `SubCategoriaId` (`SubCategoriaId`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `idEmpleado` (`idEmpleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `itemcarrito`
--
ALTER TABLE `itemcarrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `clienteempleado`
--
ALTER TABLE `clienteempleado`
  ADD CONSTRAINT `clienteempleado_ibfk_1` FOREIGN KEY (`ClienteId`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `clienteempleado_ibfk_2` FOREIGN KEY (`EmpleadoId`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `itemcarrito`
--
ALTER TABLE `itemcarrito`
  ADD CONSTRAINT `itemcarrito_ibfk_1` FOREIGN KEY (`carritoId`) REFERENCES `carrito` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `itemcarrito_ibfk_2` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`idMascota`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `productopedido`
--
ALTER TABLE `productopedido`
  ADD CONSTRAINT `productopedido_ibfk_1` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productopedido_ibfk_2` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productoproveedor`
--
ALTER TABLE `productoproveedor`
  ADD CONSTRAINT `productoproveedor_ibfk_1` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productoproveedor_ibfk_2` FOREIGN KEY (`ProveedorId`) REFERENCES `proveedor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productosubcategoria`
--
ALTER TABLE `productosubcategoria`
  ADD CONSTRAINT `productosubcategoria_ibfk_1` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productosubcategoria_ibfk_2` FOREIGN KEY (`SubCategoriaId`) REFERENCES `subcategorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `reseñas_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `subcategorias`
--
ALTER TABLE `subcategorias`
  ADD CONSTRAINT `subcategorias_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`idEmpleado`) REFERENCES `empleados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
