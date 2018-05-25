update
    class
set
    class_num = $2
    ,title = $3
    ,length = $4
    ,day = $5
    ,time = $6
    ,teacher = $7
    ,teacher_id = $8
where
    class_id = $1;