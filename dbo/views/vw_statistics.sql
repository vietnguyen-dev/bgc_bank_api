CREATE OR REPLACE VIEW "PUBLIC" 
	.vw_statistics AS
	SELECT
	    c.id,
	    c.name,
	    round(avg(cm.amount), 0) AS average,
	    round(sum(cm.amount) :: numeric, 0) AS total
	FROM clubs c
	    JOIN vw_club_members cm ON cm.club_id = c.id
	GROUP BY c.i
ID; 