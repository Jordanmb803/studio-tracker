SELECT 
    u.user_name
    , h.user_id
    , h.class_id
    , c.title
    , c.length
    , h.date
FROM 
    users u
JOIN
    hours h
ON
    u.user_id = h.user_id
JOIN
    class c
ON
    c.class_id = h.class_id
WHERE
    u.type = 'student'
AND
    h.date >= $1
AND
    h.date <= $2
AND
    u.user_id = $3
ORDER BY
    h.date;