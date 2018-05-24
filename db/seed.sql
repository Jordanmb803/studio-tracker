CREATE TABLE user (
    user_id serial primary key,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(50),
    address varchar(75),
    city varchar(75),
    state varchar(75),
    zipcode varchar(15),
    type varchar(30),
    user_name text,
    profile_picture varchar(1000)
);

CREATE TABLE class (
    class_id serial primary key
    ,class_num integer
    ,title varchar(50)
    ,length integer
    ,day varchar(15)
    ,time text
    ,teacher_id

)

CREATE TABLE hours (
    user_id integer
    , class_id integer
    , date date
)

INSERT INTO class
(class_num, title, length, day, time, teacher_id)
VALUES
(2, 'Ballet', 60, 'T', '7pm', 1);

INSERT INTO users
(type, user_name, profile_picture)
VALUES
('student', 'Minney Mouse', 'https://lh5.googleusercontent.com/-YqvmY2WsEbg/AAAAAAAAAAI/AAAAAAAAAKA/1x708KmUpp8/photo.jpg')
,('student', 'James Bond', 'https://lh5.googleusercontent.com/-YqvmY2WsEbg/AAAAAAAAAAI/AAAAAAAAAKA/1x708KmUpp8/photo.jpg')
,('student', 'Doug Lace', 'https://lh5.googleusercontent.com/-YqvmY2WsEbg/AAAAAAAAAAI/AAAAAAAAAKA/1x708KmUpp8/photo.jpg')
,('student', 'Drogo Khal', 'https://lh5.googleusercontent.com/-YqvmY2WsEbg/AAAAAAAAAAI/AAAAAAAAAKA/1x708KmUpp8/photo.jpg')
,('student', 'Barney Fife', 'https://lh5.googleusercontent.com/-YqvmY2WsEbg/AAAAAAAAAAI/AAAAAAAAAKA/1x708KmUpp8/photo.jpg')
,('student', 'Monster Inc', 'https://lh5.googleusercontent.com/-YqvmY2WsEbg/AAAAAAAAAAI/AAAAAAAAAKA/1x708KmUpp8/photo.jpg');


INSERT INTO register
(user_id, class_id)
VALUES
(3, 4)
,(4, 4)
,(9, 4)
,(5, 3)
,(6, 2)
,(3, 1)
,(7, 3)
,(8, 1)
,(8, 4)
,(9, 2);











