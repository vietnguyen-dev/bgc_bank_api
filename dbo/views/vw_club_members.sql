CREATE VIEW VW_CLUB_MEMBERS 
	AS
	SELECT
	    id,
	    first_name,
	    last_name,
	    amount,
	    grade,
	    club_id,
	    to_tsvector(
	        'english',
	        coalesce(first_name, '') || ' ' || coalesce(last_name, '') || ' ' || coalesce(grade, '')
	    ) AS search_vector
	FROM club_members
	WHERE date_deleted IS NULL
	ORDER BY id
ASC; 