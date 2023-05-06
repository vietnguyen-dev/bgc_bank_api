CREATE OR REPLACE VIEW "PUBLIC" 
	.vw_club_members AS
	SELECT
	    cm.id,
	    concat(u.first_name, ' ', u.last_name) AS name,
	    cm.amount,
	    cm.grade,
	    u.club_id,
	    c.name AS club_name
	FROM users u
	    JOIN club_members cm ON cm.user_id = u.id
	    JOIN clubs c ON c.id = u.club_id
	WHERE u.user_role_id = 1
	ORDER BY id
ASC; 