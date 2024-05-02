SELECT * FROM users; 

-- @block
DELETE FROM users WHERE id = 7;

-- @block

ALTER TABLE ingredients MODIFY COLUMN id INT NOT NULL;

SELECT * FROM ingredients;