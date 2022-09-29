CREATE
    OR REPLACE FUNCTION get_post_comments(
    post_uuid UUID, user_uuid UUID, page int DEFAULT 1,
    order_by boolean DEFAULT FALSE, _limit int DEFAULT 10,
    levels int DEFAULT 6
) RETURNS TABLE (
                    UUID UUID,
                    "postUuid" UUID,
                    "authorUuid" UUID,
                    BODY varchar(10000),
                    "parentUuid" UUID,
                    "authorUsername" varchar(32),
                    "resVote" bigint,
                    created timestamp,
                    modified timestamp,
                    LEVEL int,
                    up bigint,
                    down bigint,
                    dir smallint
                ) LANGUAGE PLPGSQL AS $$ begin return query (
    with recursive cte_comments as (
        (
            select
                C.*,
                1 as level
            from
                "Comment" as C
            where
                    C."postUuid" = post_uuid
              and C."parentUuid" is null
            order by
                (
                    case when order_by = false then cast(
                            extract(
                                    epoch
                                    from
                                    C.created
                                ) as bigint
                        ) else C."resVote" end
                    ) desc
            limit
                _limit offset (page -1) * _limit
        )
        union
        select
            C.*,
            E.level + 1 as level
        from
            cte_comments as E
                join "Comment" as C on E.uuid = C."parentUuid"
        where
                E.level < levels
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
            left join (
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
            left join (
            select
                count(*) as down,
                V."commentUuid" as uuid
            from
                "UserCommentVotes" as V
            where
                    V.dir = -1
            group by
                "commentUuid"
        ) as D on U.uuid = R.uuid
            left join (
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
$$
