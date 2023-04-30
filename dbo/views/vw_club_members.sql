DROP VIEW IF EXISTS vw_club_members;

CREATE VIEW VW_CLUB_MEMBERS 
	AS
	SELECT
	    cm.id,
	    CONCAT(u.first_name, ' ', u.last_name) AS name,
	    cm.amount,
	    cm.grade,
	    u.club_id,
	    c.name as club_name
	FROM users AS u
	    INNER JOIN club_members as cm ON u.user_role_id = cm.id
	    INNER JOIN clubs as c ON c.id = u.club_id
	WHERE u.user_role_id =
1; 