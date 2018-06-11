UPDATE
    users
SET
    first_name = $1
    , last_name = $2
    , email = $3
    , address = $4
    , city = $5
    , state = $6
    , zipcode = $7
    , type = $8
    , user_name = $9
    , parent_id = $10
WHERE
    user_id = $11;