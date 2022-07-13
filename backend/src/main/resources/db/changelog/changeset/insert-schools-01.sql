--liquibase formatted sql
--changeset Nikita Lepikhin:insert-schools-01

insert into schools(uuid, name, country_alpha_3_code, city, address_line_1, address_line_2, postal_index) values (uuid_generate_v4(), 'Czech Technical University in Prague', 'CZE', 'Prague', 'Jugoslávských partyzánů 1580/3', 'Prague 6', '160 00');
insert into schools(uuid, name, country_alpha_3_code, city, address_line_1, address_line_2, postal_index) values (uuid_generate_v4(), 'Charles University', 'CZE', 'Prague', 'Ovocný trh 5', 'Prague 1', '116 36');
insert into schools(uuid, name, country_alpha_3_code, city, address_line_1, address_line_2, postal_index) values (uuid_generate_v4(), 'The Prague University of Economics and Business', 'CZE', 'Prague', 'nám. W. Churchilla 1938/4', 'Prague 3', '130 67');