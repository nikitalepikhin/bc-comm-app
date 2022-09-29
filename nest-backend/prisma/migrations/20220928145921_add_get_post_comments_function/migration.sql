create function get_post_comments(post_uuid uuid, user_uuid uuid, page integer DEFAULT 1, _limit integer DEFAULT 10, levels integer DEFAULT 6)
    returns TABLE(uuid uuid, "postUuid" uuid, "authorUuid" uuid, body character varying, "parentUuid" uuid, "authorUsername" character varying, "resVote" bigint, created timestamp without time zone, modified timestamp without time zone, level integer, up bigint, down bigint, dir smallint)
    language plpgsql
as
$$
begin return query (
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
            limit
                (_limit + 1)
            offset
                (page -1) * _limit
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
$$;