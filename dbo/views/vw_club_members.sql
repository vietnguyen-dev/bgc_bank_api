CREATE VIEW VW_CLUB_MEMBERS 
	AS
	SELECT
	    cm.id,
	    concat(u.first_name, ' ', u.last_name) AS name,
	    cm.amount,
	    cm.grade,
	    u.club_id,
	    c.name AS club_name to_tsvector(
	        'english',
	        concat(
	            u.first_name,
	            ' ',
	            u.last_name,
	            ' ',
	            cm.grade
	        )
	    ) AS member_search,
	FROM users u
	    INNER JOIN club_members cm ON cm.user_id = u.id
	    INNER JOIN clubs c ON c.id = u.club_id
	WHERE u.user_role_id = 1
	ORDER BY id
ASC; 