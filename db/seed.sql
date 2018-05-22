CREATE TABLE user (
    user_id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50),
    address varchar(75),
    city varchar(75),
    state varchar(75),
    zipcode varchar(15),
    type varchar(30)
);

CREATE TABLE class (
    class_id serial primary key
    ,class_num integer
    ,title varchar(50)
    ,length integer
    ,day varchar(15)
    ,time text

)

CREATE TABLE hours (
    user_id integer
    , class_id integer
    , date date
)

INSERT INTO class
(class_num, title, length, day, time)
VALUES
(2, 'Ballet', 60, 'T', '7pm');