CREATE VIEW.VW_STAFF 
	AS
	SELECT
	    u.id,
	    concat(u.first_name, ' ', u.last_name) AS name,
	    u.username,
	    u.club_email_id,
	    ce.email,
	    u.password,
	    u.club_id,
	    c.name AS club_name
	FROM users u
	    JOIN clubs c ON c.id = u.club_id
	    JOIN club_emails ce ON c.id = u.club_email_id
	WHERE
	    u.user_role_id = 2
	    AND u.date_deleted IS NULL
	ORDER BY u.i
ID; 