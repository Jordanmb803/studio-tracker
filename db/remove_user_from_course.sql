DELETE FROM 
    register
WHERE
    user_id = $1
AND
    class_id = $2;