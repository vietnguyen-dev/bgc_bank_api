CREATE VIEW VW_STATISTICS AS 
	SELECT
	    c.id,
	    c.name,
	    ROUND(AVG(cm.amount), 0):: numeric AS average,
	    ROUND(SUM(cm.amount), 0):: numeric AS total,
	    COUNT(
	        CASE
	            WHEN cm.amount = 0 THEN 1
	        END
	    ) AS zero_amount_count
	FROM clubs c
	    INNER JOIN club_members cm ON cm.club_id = c.id
	GROUP BY c.
ID; 