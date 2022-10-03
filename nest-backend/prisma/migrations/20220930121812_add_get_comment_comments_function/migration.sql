CREATE FUNCTION GET_COMMENT_COMMENTS(COMMENT_UUID UUID,
                                     USER_UUID UUID,
                                     LEVELS integer DEFAULT 6) RETURNS TABLE(UUID UUID,
                                                                             "postUuid" UUID,
                                                                             "authorUuid" UUID,
                                                                             BODY CHARACTER varying, "parentUuid" UUID,
                                                                             "authorUsername" CHARACTER varying, "resVote" bigint, CREATED TIMESTAMP WITHOUT TIME ZONE,
                                                                             MODIFIED TIMESTAMP WITHOUT TIME ZONE,
                                                                             LEVEL integer, UP bigint, DOWN bigint, DIR smallint) LANGUAGE PLPGSQL AS $$
begin
    return query (
        with recursive cte_comments as (
            (
                select
                    C.*, 1 as level
                from
                    "Comment" as C
                where
                        C.uuid = comment_uuid
            )
            union
            (
                select
                    C.*, E.level + 1 as level
                from
                    cte_comments as E
                        join
                    "Comment" as C on E.uuid = C."parentUuid"
                where
                        E.level < levels

            )
        )
        select
            R.uuid,
            R."postUuid",
            R."authorUuid",
            R.body,
            R."parentUuid",
            R."authorUsername",
            R."resVote",
            R.created,
            R.modified,
            R.level,
            U.up,
            D.down,
            Q.dir
        from
            cte_comments as R
                left join
            (
                select
                    count(*) as up,
                    V."commentUuid" as uuid
                from
                    "UserCommentVotes" as V
                where
                        V.dir = 1
                group by
                    "commentUuid"
            ) as U on U.uuid = R.uuid
                left join
            (
                select
                    count(*) as down,
                    V."commentUuid" as uuid
                from
                    "UserCommentVotes" as V
                where
                        V.dir = -1
                group by
                    "commentUuid"
            ) as D on D.uuid = R.uuid
                left join
            (
                select
                    V.dir,
                    V."commentUuid" as uuid
                from
                    "UserCommentVotes" as V
                where
                        V."userUuid" = user_uuid
            ) as Q on Q.uuid = R.uuid
    );
end;
$$;