CREATE TABLE orderfood.produto (  id INTEGER NOT NULL,  nome VARCHAR(60) NOT NULL,  descricao VARCHAR(80),  urlfoto VARCHAR(50),  volume INTEGER,  valor NUMERIC(12,6),  qtestoque INTEGER,  categoria VARCHAR(50),  CONSTRAINT produto_pkey PRIMARY KEY(id)) WITH (oids = false);