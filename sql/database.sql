CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code INT NOT NULL
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  document VARCHAR(11) NOT NULL UNIQUE
           );


CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL,
  carrier_id INTEGER NOT NULL,
  number VARCHAR(11) NOT NULL UNIQUE,  
  nickname VARCHAR(50) NOT NULL,      
  description TEXT NOT NULL,           
  
  CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE,
  CONSTRAINT fk_carrier FOREIGN KEY(carrier_id) REFERENCES carriers(id)
);

CREATE TABLE recharges (
  id SERIAL PRIMARY KEY,
  phone_id INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),     
  
  CONSTRAINT fk_phone FOREIGN KEY(phone_id) REFERENCES phones(id) ON DELETE CASCADE,
  CONSTRAINT check_amount CHECK (amount >= 10 AND amount <= 1000) 
);

CREATE INDEX idx_phones_client ON phones(client_id);
CREATE INDEX idx_phones_number ON phones(number);
CREATE INDEX idx_recharges_phone ON recharges(phone_id);
CREATE INDEX idx_clients_document ON clients(document);
CREATE INDEX idx_recharges_date ON recharges(date); 

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);