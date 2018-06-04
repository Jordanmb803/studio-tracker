SELECT
    *
FROM
    hours
WHERE
    date = $1
AND
    class_id = $2;