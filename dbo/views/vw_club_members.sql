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
	        CONCAT_WS(
	            ' ',
	            first_name,
	            last_name,
	            grade
	        )
	    ) AS search_vector
	FROM club_members
	WHERE date_deleted IS NULL
	ORDER BY id
ASC; 