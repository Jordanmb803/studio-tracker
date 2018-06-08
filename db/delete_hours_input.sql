DELETE FROM
    hours
WHERE 
    user_id = $1
AND
    class_id = $2
AND
    date = $3;