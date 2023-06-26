CREATE VIEW VW_STATISTICS 
	AS
	SELECT
	    c.id,
	    c.name,
	    ROUND(AVG(cm.amount), 0) :: numeric AS average,
	    ROUND(SUM(cm.amount), 0) :: numeric AS total
	FROM clubs c
	    INNER JOIN club_members cm ON cm.club_id = c.id
	GROUP BY c.
ID; 