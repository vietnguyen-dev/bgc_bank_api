CREATE VIEW VW_STATISTICS 
	AS
	WITH club_avg AS (
	        SELECT
	            club_id,
	            ROUND(AVG(amount), 0) :: numeric AS average
	        FROM club_members
	        GROUP BY club_id
	    )
	SELECT
	    c.id,
	    c.name,
	    ca.average,
	    ROUND(SUM(cm.amount), 0) :: numeric AS total,
	    COUNT(
	        CASE
	            WHEN cm.amount = 0 THEN 1
	        END
	    ) AS none_count,
	    COUNT(
	        CASE
	            WHEN cm.amount < ca.average THEN 1
	        END
	    ) AS less_than_average
	FROM clubs c
	    INNER JOIN club_members cm ON cm.club_id = c.id
	    INNER JOIN club_avg ca ON ca.club_id = c.id
	GROUP BY c.id, ca.a
AVERAGE; 