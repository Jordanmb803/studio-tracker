INSERT INTO users
(user_name, profile_picture, auth_id, first_name, last_name)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;