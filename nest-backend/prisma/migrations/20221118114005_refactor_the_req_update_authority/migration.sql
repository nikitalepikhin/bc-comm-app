delete from "Authority"
where name = 'REP_REQ_UPDATE' or name = 'TEACHER_REQ_UPDATE';

insert into "Authority"(uuid, name, roles) values
    (uuid_generate_v4(), 'REQ_UPDATE', '{TEACHER,REPRESENTATIVE}');