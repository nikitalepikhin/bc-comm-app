CREATE FUNCTION GET_COMMENT_ROOT(COMMENT_UUID UUID) RETURNS TABLE (UUID UUID) LANGUAGE PLPGSQL AS $$ begin
    return query (
        with recursive comment_root as
                           (
                               select C.uuid, C."parentUuid"
                               from "Comment" as C
                               where C.uuid = comment_uuid
                               union
                               select C.uuid, C."parentUuid"
                               from "Comment" as C join comment_root as R on C.uuid = R."parentUuid"
                               where R."parentUuid" is not null
                           )
        select R.uuid from comment_root as R
        where R."parentUuid" is null
    );
end;
$$;