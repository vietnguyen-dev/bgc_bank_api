DROP VIEW vw_reasons IF EXISTS;

CREATE VIEW VW_REASONS 
	AS
	SELECT
	    r.id,
	    r.reason_lookup_id,
	    r.details,
	FROM reasons AS r
	    INNER JOIN reasons_lookup as rl ON rl.id = r.r
REASON_LOOKUP_ID; 