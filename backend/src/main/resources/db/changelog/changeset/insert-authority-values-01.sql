--liquibase formatted sql
--changeset Nikita Lepikhin:insert-authority-values-01

-- test_read authority for all roles
INSERT INTO authority_lookup(authority_value, uuid)
VALUES ('TEST_READ', uuid_generate_v4());

INSERT INTO role_authority(role_id, authority_id)
SELECT role_lookup.id AS rid, authority_lookup.id AS aid
FROM role_lookup CROSS JOIN authority_lookup
WHERE role_value IN ('ADMIN', 'REPRESENTATIVE', 'TEACHER', 'STUDENT')
  AND authority_value = 'TEST_READ';

-- test_write authority for all roles
INSERT INTO authority_lookup(authority_value, uuid)
VALUES ('TEST_WRITE', uuid_generate_v4());

INSERT INTO role_authority(role_id, authority_id)
SELECT role_lookup.id AS rid, authority_lookup.id AS aid
FROM role_lookup CROSS JOIN authority_lookup
WHERE role_value IN ('ADMIN', 'REPRESENTATIVE', 'TEACHER', 'STUDENT')
  AND authority_value = 'TEST_WRITE';