DELETE FROM
    hours
WHERE 
    user_id = $1
AND
    date = $2;