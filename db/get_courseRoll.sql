select 
    r.user_id
    , r.class_id
    , u.user_name
    , u.profile_picture
from 
    register r
join
    users u 
on
    u.user_id = r.user_id
order by
    r.class_id; 