CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

insert into "Authority"(uuid, name, roles) values
       (uuid_generate_v4(), 'SCHOOL_CREATE', '{ADMIN}'),
       (uuid_generate_v4(), 'SCHOOL_READ', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'SCHOOL_UPDATE', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'SCHOOL_DELETE', '{ADMIN}'),

       (uuid_generate_v4(), 'FACULTY_CREATE', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'FACULTY_READ', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'FACULTY_UPDATE', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'FACULTY_DELETE', '{ADMIN, REPRESENTATIVE}'),

       (uuid_generate_v4(), 'REP_REQ_READ', '{ADMIN}'),
       (uuid_generate_v4(), 'REP_REQ_UPDATE', '{ADMIN}'),
       (uuid_generate_v4(), 'REP_REQ_VERIFY', '{ADMIN, REPRESENTATIVE}'),

       (uuid_generate_v4(), 'TEACHER_REQ_READ', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'TEACHER_REQ_UPDATE', '{ADMIN, REPRESENTATIVE}'),
       (uuid_generate_v4(), 'TEACHER_REQ_VERIFY', '{ADMIN, REPRESENTATIVE}'),

       (uuid_generate_v4(), 'CHANNEL_CREATE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'CHANNEL_READ', '{ADMIN, REPRESENTATIVE, TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'CHANNEL_UPDATE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'CHANNEL_DELETE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'CHANNEL_MEMBER', '{TEACHER, STUDENT}'),

       (uuid_generate_v4(), 'POST_CREATE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'POST_READ', '{ADMIN, REPRESENTATIVE, TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'POST_UPDATE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'POST_DELETE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'POST_VOTE', '{TEACHER, STUDENT}'),

       (uuid_generate_v4(), 'COMMENT_CREATE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'COMMENT_READ', '{ADMIN, REPRESENTATIVE, TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'COMMENT_UPDATE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'COMMENT_DELETE', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'COMMENT_VOTE', '{TEACHER, STUDENT}'),

       (uuid_generate_v4(), 'FEED_READ', '{TEACHER, STUDENT}'),

       (uuid_generate_v4(), 'USER_READ', '{ADMIN, REPRESENTATIVE, TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'USER_UPDATE', '{ADMIN, REPRESENTATIVE, TEACHER, STUDENT}'),

       (uuid_generate_v4(), 'USERNAME_REFRESH', '{STUDENT}'),

       (uuid_generate_v4(), 'TEACHER_READ', '{ADMIN, REPRESENTATIVE, TEACHER, STUDENT}'),

       (uuid_generate_v4(), 'NOTIFICATION_READ', '{TEACHER, STUDENT}'),
       (uuid_generate_v4(), 'NOTIFICATION_DISMISS', '{TEACHER, STUDENT}');