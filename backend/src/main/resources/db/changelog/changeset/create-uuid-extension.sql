--liquibase formatted sql
--changeset Nikita Lepikhin:create-uuid-extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
