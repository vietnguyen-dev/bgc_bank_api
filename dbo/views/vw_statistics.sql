CREATE VIEW VW_STATISTICS 
	AS
	SELECT
	    c.id,
	    c.name,
	    ROUND(AVG(cm.amount), 0) :: numeric AS average,
	    ROUND(SUM(cm.amount), 0) :: numeric AS total
	FROM clubs c
	    JOIN vw_club_members cm ON cm.club_id = c.id
	GROUP BY c.i
ID; 