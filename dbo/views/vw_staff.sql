DROP VIEW vw_staff IF EXISTS;

CREATE VIEW VW_STAFF 
	AS
	SELECT
	    u.id,
	    CONCAT(u.first_name, ' ', u.last_name) AS name,
	    u.username,
	    u.email,
	    u.password,
	    u.club_id,
	    c.name AS club_name
	FROM users AS u
	    INNER JOIN clubs AS c on c.id = u.club_id
	WHERE user_role_id =
2; 

2;