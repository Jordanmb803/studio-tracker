DELETE FROM
    hours
WHERE
    class_id = $1
AND
    date = $2;