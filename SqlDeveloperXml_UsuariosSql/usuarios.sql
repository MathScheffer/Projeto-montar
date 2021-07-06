-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Jul-2021 às 23:54
-- Versão do servidor: 10.4.17-MariaDB
-- versão do PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `usuarios`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `armazenamento`
--

CREATE TABLE `armazenamento` (
  `id` int(11) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `capacidade` int(11) NOT NULL,
  `consumo` decimal(10,0) DEFAULT 12,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `armazenamento`
--

INSERT INTO `armazenamento` (`id`, `tipo`, `nome`, `capacidade`, `consumo`, `createdAt`, `updatedAt`, `img`) VALUES
(1, 'SSD', 'WD GREEN SN350', 280, '12', '2021-06-30 00:52:56', '2021-06-30 00:52:56', '../../WD-GREEN-SN350.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `computador`
--

CREATE TABLE `computador` (
  `id` int(11) NOT NULL,
  `UsuarioId` int(11) DEFAULT NULL,
  `ProcessadorId` int(11) DEFAULT NULL,
  `PlacaMaeId` int(11) DEFAULT NULL,
  `RamId` int(11) DEFAULT NULL,
  `ArmazenamentoId` int(11) DEFAULT NULL,
  `FonteId` int(11) DEFAULT NULL,
  `VgaId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `computador`
--

INSERT INTO `computador` (`id`, `UsuarioId`, `ProcessadorId`, `PlacaMaeId`, `RamId`, `ArmazenamentoId`, `FonteId`, `VgaId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, '2021-06-30 01:03:16', '2021-06-30 01:03:16');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fonte`
--

CREATE TABLE `fonte` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `capacidade` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fonte`
--

INSERT INTO `fonte` (`id`, `nome`, `capacidade`, `createdAt`, `updatedAt`, `img`) VALUES
(1, 'CORSAIR RMX SERIES MODULAR RM750X', 750, '2021-06-30 00:53:09', '2021-06-30 00:53:09', '../../CORSAIR-RMX-SERIES-MODULAR-RM750X.jpg'),
(2, 'CORSAIR RM SERIES MODULAR RM850 80 PLUS GOLD', 850, '2021-07-06 21:43:26', '2021-07-06 21:43:26', '../../CORSAIR-RM-SERIES-MODULAR-RM850-80-PLUS-GOLD.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `placamae`
--

CREATE TABLE `placamae` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `socket` varchar(255) NOT NULL,
  `frequencia_max_ram` int(11) NOT NULL,
  `max_ram` int(11) NOT NULL,
  `ddr` int(4) NOT NULL,
  `consumo` decimal(10,0) NOT NULL DEFAULT 35,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `placamae`
--

INSERT INTO `placamae` (`id`, `nome`, `socket`, `frequencia_max_ram`, `max_ram`, `ddr`, `consumo`, `createdAt`, `updatedAt`, `img`) VALUES
(1, 'Asus TUF Gaming Z490-Plus', 'LGA1200', 4800, 128, 4, '35', '2021-06-30 00:52:49', '2021-06-30 00:52:49', '../../tuf-gaming-z490-plus-_wi-fi_.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `processador`
--

CREATE TABLE `processador` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `marca` varchar(5) NOT NULL,
  `frequencia` decimal(10,0) NOT NULL,
  `frequencia_max` decimal(10,0) NOT NULL,
  `socket` varchar(255) NOT NULL,
  `tdp` decimal(10,0) NOT NULL,
  `consumo_max` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `processador`
--

INSERT INTO `processador` (`id`, `nome`, `marca`, `frequencia`, `frequencia_max`, `socket`, `tdp`, `consumo_max`, `createdAt`, `updatedAt`, `img`) VALUES
(1, 'INTEL CORE I7-10700KF', 'Intel', '4', '5', 'LGA1200', '95', '143', '2021-06-30 00:52:39', '2021-06-30 00:52:39', '../../INTEL-CORE-I7-10700KF.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `ram`
--

CREATE TABLE `ram` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `frequencia` int(11) DEFAULT NULL,
  `capacidade` int(11) NOT NULL,
  `ddr` int(1) NOT NULL,
  `consumo` decimal(10,0) DEFAULT 3,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `ram`
--

INSERT INTO `ram` (`id`, `nome`, `frequencia`, `capacidade`, `ddr`, `consumo`, `createdAt`, `updatedAt`, `img`) VALUES
(1, 'TEAM GROUP T-FORCE RGB 8GB', 3600, 8, 4, '3', '2021-06-30 01:03:02', '2021-06-30 01:03:02', '../../delta-rgb-pichau.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `permissions` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `nome`, `email`, `senha`, `permissions`, `createdAt`, `updatedAt`) VALUES
(1, 'teste.1', 'teste 1', 'teste$@gmail.com', '$2b$10$2fXZ5yu9d7DmMD76FIdUoOG2yrg1Mz.JW1HEPuTZkGxcnaHOZP4.S', 1, '2021-06-30 00:29:51', '2021-06-30 00:29:51');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vga`
--

CREATE TABLE `vga` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `capacidade` int(11) NOT NULL,
  `tdp` decimal(10,0) NOT NULL,
  `consumo_max` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `vga`
--

INSERT INTO `vga` (`id`, `nome`, `capacidade`, `tdp`, `consumo_max`, `createdAt`, `updatedAt`, `img`) VALUES
(1, 'AMD Radeon RX 6800 XT', 16, '300', '450', '2021-06-30 00:53:02', '2021-06-30 00:53:02', '../../AMD-Radeon-RX-6800-XT.jpg');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `armazenamento`
--
ALTER TABLE `armazenamento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome_armazenamento` (`nome`);

--
-- Índices para tabela `computador`
--
ALTER TABLE `computador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UsuarioId` (`UsuarioId`),
  ADD KEY `ProcessadorId` (`ProcessadorId`),
  ADD KEY `PlacaMaeId` (`PlacaMaeId`),
  ADD KEY `RamId` (`RamId`),
  ADD KEY `ArmazenamentoId` (`ArmazenamentoId`),
  ADD KEY `FonteId` (`FonteId`),
  ADD KEY `VgaId` (`VgaId`);

--
-- Índices para tabela `fonte`
--
ALTER TABLE `fonte`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome_fonte` (`nome`);

--
-- Índices para tabela `placamae`
--
ALTER TABLE `placamae`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome_placa` (`nome`);

--
-- Índices para tabela `processador`
--
ALTER TABLE `processador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome_processador` (`nome`);

--
-- Índices para tabela `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome_ram` (`nome`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_username` (`username`),
  ADD UNIQUE KEY `unique_nome` (`nome`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Índices para tabela `vga`
--
ALTER TABLE `vga`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome_vga` (`nome`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `armazenamento`
--
ALTER TABLE `armazenamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `computador`
--
ALTER TABLE `computador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `fonte`
--
ALTER TABLE `fonte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `placamae`
--
ALTER TABLE `placamae`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `processador`
--
ALTER TABLE `processador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `ram`
--
ALTER TABLE `ram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `vga`
--
ALTER TABLE `vga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `computador`
--
ALTER TABLE `computador`
  ADD CONSTRAINT `computador_ibfk_10` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_11` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_12` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_14` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_17` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_18` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_19` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_21` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_24` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_25` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_26` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_28` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_3` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_31` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_32` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_33` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_35` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_38` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_39` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_4` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_40` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_42` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_45` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_46` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_47` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_49` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_5` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_52` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_53` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_54` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_56` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_59` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_60` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_61` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_63` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_66` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_67` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_68` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_7` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_70` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_73` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_74` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_75` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_77` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_80` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_81` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_82` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_84` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_87` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_88` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_89` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_91` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`),
  ADD CONSTRAINT `computador_ibfk_92` FOREIGN KEY (`UsuarioId`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `computador_ibfk_93` FOREIGN KEY (`ProcessadorId`) REFERENCES `processador` (`id`),
  ADD CONSTRAINT `computador_ibfk_94` FOREIGN KEY (`PlacaMaeId`) REFERENCES `placamae` (`id`),
  ADD CONSTRAINT `computador_ibfk_95` FOREIGN KEY (`RamId`) REFERENCES `ram` (`id`),
  ADD CONSTRAINT `computador_ibfk_96` FOREIGN KEY (`ArmazenamentoId`) REFERENCES `armazenamento` (`id`),
  ADD CONSTRAINT `computador_ibfk_97` FOREIGN KEY (`FonteId`) REFERENCES `fonte` (`id`),
  ADD CONSTRAINT `computador_ibfk_98` FOREIGN KEY (`VgaId`) REFERENCES `vga` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
