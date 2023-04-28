DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    pokemon_id INT GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    level INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    caught BOOLEAN NOT NULL,
    owner VARCHAR(20)
); 
