INSERT INTO users
(user_name, profile_picture, auth_id)
VALUES
($1, $2, $3)
RETURNING *;