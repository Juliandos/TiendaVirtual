-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema panelessolares
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `panelessolares` ;

-- -----------------------------------------------------
-- Schema panelessolares
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `panelessolares` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema db_tiendavirtual
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db_tiendavirtual` ;

-- -----------------------------------------------------
-- Schema db_tiendavirtual
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_tiendavirtual` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci ;
USE `panelessolares` ;

-- -----------------------------------------------------
-- Table `panelessolares`.`categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`categoria` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`categoria` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  `portada` VARCHAR(100) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`contacto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`contacto` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`contacto` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`producto` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`producto` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(64) NOT NULL,
  `referencia` VARCHAR(32) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `marca` VARCHAR(32) NOT NULL,
  `cantidad_minima` MEDIUMINT(9) NOT NULL,
  `cantidad_actual` MEDIUMINT(9) NOT NULL,
  `precio_compra` DECIMAL(11,0) NOT NULL,
  `precio_venta` DECIMAL(11,0) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `referencia_UNIQUE` (`referencia` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 101
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`servicio_tipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`servicio_tipo` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`servicio_tipo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(64) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`tipo_pago`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`tipo_pago` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`tipo_pago` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `status` TINYINT(4) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`servicio_venta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`servicio_venta` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`servicio_venta` (
  `id` INT(11) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `fecha_ejecucion` DATE NOT NULL,
  `fecha_finalizacion` DATE NULL DEFAULT NULL,
  `servicio_tipo_id` INT(11) NOT NULL,
  `detalles` TEXT NOT NULL,
  `referencia_cobro` VARCHAR(255) NOT NULL,
  `direccion` TEXT NULL DEFAULT NULL,
  `status` TINYINT(4) NOT NULL DEFAULT 0,
  `tipo_pago_id` INT(11) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `fk_servicio_servicio_tipo1_idx` (`servicio_tipo_id` ASC),
  INDEX `fk_servicio_venta_tipo_pago1_idx` (`tipo_pago_id` ASC),
  CONSTRAINT `fk_servicio_servicio_tipo1`
    FOREIGN KEY (`servicio_tipo_id`)
    REFERENCES `panelessolares`.`servicio_tipo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servicio_venta_tipo_pago1`
    FOREIGN KEY (`tipo_pago_id`)
    REFERENCES `panelessolares`.`tipo_pago` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`detalle_venta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`detalle_venta` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`detalle_venta` (
  `servicio_venta_id` INT(11) NOT NULL,
  `producto_id` INT(11) NOT NULL,
  `cantidad` MEDIUMINT(9) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`servicio_venta_id`, `producto_id`),
  INDEX `fk_servicio_venta_has_producto_producto1_idx` (`producto_id` ASC),
  INDEX `fk_servicio_venta_has_producto_servicio_venta1_idx` (`servicio_venta_id` ASC),
  CONSTRAINT `fk_servicio_venta_has_producto_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `panelessolares`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servicio_venta_has_producto_servicio_venta1`
    FOREIGN KEY (`servicio_venta_id`)
    REFERENCES `panelessolares`.`servicio_venta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`imagen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`imagen` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`imagen` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `producto_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_imagen_producto1_idx` (`producto_id` ASC),
  CONSTRAINT `fk_imagen_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `panelessolares`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 101
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`modulo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`modulo` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`modulo` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`permisos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`permisos` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`permisos` (
  `id` INT(11) NOT NULL,
  `r` TINYINT(4) NOT NULL,
  `w` TINYINT(4) NOT NULL,
  `u` TINYINT(4) NOT NULL,
  `d` TINYINT(4) NOT NULL,
  `modulo_id` INT(11) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `fk_permisos_modulo1_idx` (`modulo_id` ASC),
  CONSTRAINT `fk_permisos_modulo1`
    FOREIGN KEY (`modulo_id`)
    REFERENCES `panelessolares`.`modulo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`persona`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`persona` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`persona` (
  `id` VARCHAR(10) NOT NULL,
  `nombre` VARCHAR(80) NOT NULL,
  `telefono` VARCHAR(11) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `contrasena` VARCHAR(15) NOT NULL,
  `salario` DOUBLE NULL DEFAULT NULL,
  `direccion` VARCHAR(80) NULL DEFAULT NULL,
  `token` VARCHAR(30) NULL DEFAULT NULL,
  `status` TINYINT(4) NOT NULL DEFAULT 0,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`rol` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`rol` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `status` TINYINT(4) NOT NULL DEFAULT 0,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`persona_rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`persona_rol` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`persona_rol` (
  `persona_id` VARCHAR(10) NOT NULL,
  `rol_id` INT(11) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`persona_id`, `rol_id`),
  INDEX `fk_persona_has_rol_rol1_idx` (`rol_id` ASC),
  INDEX `fk_persona_has_rol_persona1_idx` (`persona_id` ASC),
  CONSTRAINT `fk_persona_has_rol_persona1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `panelessolares`.`persona` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_persona_has_rol_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `panelessolares`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`producto_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`producto_categoria` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`producto_categoria` (
  `producto_id` INT(11) NOT NULL,
  `categoria_id` INT(11) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`producto_id`, `categoria_id`),
  INDEX `fk_producto_has_categoria_categoria1_idx` (`categoria_id` ASC),
  INDEX `fk_producto_has_categoria_producto1_idx` (`producto_id` ASC),
  CONSTRAINT `fk_producto_has_categoria_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `panelessolares`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_has_categoria_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `panelessolares`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`publicacion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`publicacion` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`publicacion` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `contenido` TEXT NOT NULL,
  `portada` VARCHAR(255) NOT NULL,
  `status` TINYINT(4) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `panelessolares`.`rol_permisos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `panelessolares`.`rol_permisos` ;

CREATE TABLE IF NOT EXISTS `panelessolares`.`rol_permisos` (
  `rol_id` INT(11) NOT NULL,
  `permisos_id` INT(11) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`rol_id`, `permisos_id`),
  INDEX `fk_rol_has_permisos_permisos1_idx` (`permisos_id` ASC),
  INDEX `fk_rol_has_permisos_rol1_idx` (`rol_id` ASC),
  CONSTRAINT `fk_rol_has_permisos_permisos1`
    FOREIGN KEY (`permisos_id`)
    REFERENCES `panelessolares`.`permisos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rol_has_permisos_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `panelessolares`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `db_tiendavirtual` ;

-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`categoria` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`categoria` (
  `idcategoria` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `portada` VARCHAR(100) NOT NULL,
  `datecreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `ruta` VARCHAR(255) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`contacto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`contacto` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`contacto` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  `dispositivo` VARCHAR(25) NOT NULL,
  `useragent` TEXT NOT NULL,
  `datecreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`rol` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`rol` (
  `idrol` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `nombrerol` VARCHAR(50) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idrol`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`persona`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`persona` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`persona` (
  `idpersona` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `identificacion` VARCHAR(30) NULL DEFAULT NULL,
  `nombres` VARCHAR(80) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `telefono` BIGINT(20) NOT NULL,
  `email_user` VARCHAR(100) NOT NULL,
  `password` VARCHAR(75) NOT NULL,
  `nit` VARCHAR(20) NULL DEFAULT NULL,
  `nombrefiscal` VARCHAR(80) NULL DEFAULT NULL,
  `direccionfiscal` VARCHAR(100) NULL DEFAULT NULL,
  `token` VARCHAR(100) NULL DEFAULT NULL,
  `rolid` BIGINT(20) NOT NULL,
  `datecreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idpersona`),
  INDEX `rolid` (`rolid` ASC),
  CONSTRAINT `persona_ibfk_1`
    FOREIGN KEY (`rolid`)
    REFERENCES `db_tiendavirtual`.`rol` (`idrol`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`tipopago`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`tipopago` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`tipopago` (
  `idtipopago` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `tipopago` VARCHAR(100) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idtipopago`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`pedido` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`pedido` (
  `idpedido` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `referenciacobro` VARCHAR(255) NULL DEFAULT NULL,
  `idtransaccionpaypal` VARCHAR(255) NULL DEFAULT NULL,
  `datospaypal` TEXT NULL DEFAULT NULL,
  `personaid` BIGINT(20) NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `costo_envio` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `monto` DECIMAL(11,2) NOT NULL,
  `tipopagoid` BIGINT(20) NOT NULL,
  `direccion_envio` TEXT NOT NULL,
  `status` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idpedido`),
  INDEX `personaid` (`personaid` ASC),
  INDEX `tipopagoid` (`tipopagoid` ASC),
  CONSTRAINT `pedido_ibfk_1`
    FOREIGN KEY (`personaid`)
    REFERENCES `db_tiendavirtual`.`persona` (`idpersona`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `pedido_ibfk_2`
    FOREIGN KEY (`tipopagoid`)
    REFERENCES `db_tiendavirtual`.`tipopago` (`idtipopago`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`producto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`producto` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`producto` (
  `idproducto` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `categoriaid` BIGINT(20) NOT NULL,
  `codigo` VARCHAR(30) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `precio` DECIMAL(11,2) NOT NULL,
  `stock` INT(11) NOT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  `datecreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `ruta` VARCHAR(255) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idproducto`),
  INDEX `categoriaid` (`categoriaid` ASC),
  CONSTRAINT `producto_ibfk_1`
    FOREIGN KEY (`categoriaid`)
    REFERENCES `db_tiendavirtual`.`categoria` (`idcategoria`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`detalle_pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`detalle_pedido` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`detalle_pedido` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `pedidoid` BIGINT(20) NOT NULL,
  `productoid` BIGINT(20) NOT NULL,
  `precio` DECIMAL(11,2) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `pedidoid` (`pedidoid` ASC),
  INDEX `productoid` (`productoid` ASC),
  CONSTRAINT `detalle_pedido_ibfk_1`
    FOREIGN KEY (`pedidoid`)
    REFERENCES `db_tiendavirtual`.`pedido` (`idpedido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `detalle_pedido_ibfk_2`
    FOREIGN KEY (`productoid`)
    REFERENCES `db_tiendavirtual`.`producto` (`idproducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`detalle_temp`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`detalle_temp` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`detalle_temp` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `personaid` BIGINT(20) NOT NULL,
  `productoid` BIGINT(20) NOT NULL,
  `precio` DECIMAL(11,2) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `transaccionid` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productoid` (`productoid` ASC),
  INDEX `personaid` (`personaid` ASC),
  CONSTRAINT `detalle_temp_ibfk_1`
    FOREIGN KEY (`productoid`)
    REFERENCES `db_tiendavirtual`.`producto` (`idproducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`imagen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`imagen` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`imagen` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `productoid` BIGINT(20) NOT NULL,
  `img` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productoid` (`productoid` ASC),
  CONSTRAINT `imagen_ibfk_1`
    FOREIGN KEY (`productoid`)
    REFERENCES `db_tiendavirtual`.`producto` (`idproducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`modulo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`modulo` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`modulo` (
  `idmodulo` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(50) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idmodulo`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`permisos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`permisos` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`permisos` (
  `idpermiso` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `rolid` BIGINT(20) NOT NULL,
  `moduloid` BIGINT(20) NOT NULL,
  `r` INT(11) NOT NULL DEFAULT 0,
  `w` INT(11) NOT NULL DEFAULT 0,
  `u` INT(11) NOT NULL DEFAULT 0,
  `d` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idpermiso`),
  INDEX `rolid` (`rolid` ASC),
  INDEX `moduloid` (`moduloid` ASC),
  CONSTRAINT `permisos_ibfk_1`
    FOREIGN KEY (`rolid`)
    REFERENCES `db_tiendavirtual`.`rol` (`idrol`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `permisos_ibfk_2`
    FOREIGN KEY (`moduloid`)
    REFERENCES `db_tiendavirtual`.`modulo` (`idmodulo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`post` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`post` (
  `idpost` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `contenido` TEXT NOT NULL,
  `portada` VARCHAR(100) NULL DEFAULT NULL,
  `datecreate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `ruta` VARCHAR(255) NOT NULL,
  `status` INT(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idpost`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`reembolso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`reembolso` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`reembolso` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `pedidoid` BIGINT(20) NOT NULL,
  `idtransaccion` VARCHAR(255) NOT NULL,
  `datosreembolso` TEXT NOT NULL,
  `observacion` TEXT NOT NULL,
  `status` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `pedidoid` (`pedidoid` ASC),
  CONSTRAINT `reembolso_ibfk_1`
    FOREIGN KEY (`pedidoid`)
    REFERENCES `db_tiendavirtual`.`pedido` (`idpedido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


-- -----------------------------------------------------
-- Table `db_tiendavirtual`.`suscripciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tiendavirtual`.`suscripciones` ;

CREATE TABLE IF NOT EXISTS `db_tiendavirtual`.`suscripciones` (
  `idsuscripcion` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `datecreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`idsuscripcion`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_swedish_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
