SELECT
    u.user_name
    , u.type
    , h.user_id
    , h.class_id
    , h.date
    , c.title
    , c.length
    
FROM
    hours h
JOIN
   class c
ON
    c.class_id = h.class_id
JOIN
    users u
ON
    u.user_id = h.user_id
WHERE
    u.type = 'teacher'
AND
    h.date >= $1
AND
    h.date <= $2
AND
    u.user_id = $3;