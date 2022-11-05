DROP FUNCTION get_post_comments(uuid,uuid,integer,timestamp without time zone,boolean,integer,integer);
CREATE
OR REPLACE FUNCTION GET_POST_COMMENTS (POST_UUID UUID,

                                           USER_UUID UUID,

                                           PAGE INT DEFAULT 1,

                                           AFTER timestamp(6) default CURRENT_TIMESTAMP,

                                           ORDER_BY_CREATED boolean DEFAULT TRUE,

                                           _LIMIT INT DEFAULT 10,

                                           LEVELS INT DEFAULT 6) RETURNS TABLE (UUID UUID ,
                                                                                "role" "Role",
                                                                                "postUuid" UUID ,
                                                                                "authorUuid" UUID ,
                                                                                BODY VARCHAR ,"parentUuid" UUID ,
                                                                                "authorUsername" VARCHAR ,"resVote" BIGINT ,CREATED TIMESTAMP WITHOUT TIME ZONE ,
                                                                                MODIFIED TIMESTAMP WITHOUT TIME ZONE ,
                                                                                LEVEL INT ,UP BIGINT ,DOWN BIGINT ,DIR SMALLINT) LANGUAGE PLPGSQL AS $$

BEGIN
RETURN query(WITH recursive cte_comments AS (
        (
            SELECT C.*
                 ,P.role
                 ,1 AS level
                 ,UP.up
                 ,DOWN.down
                 ,D.dir
            FROM "Comment" AS C
                JOIN "User" as P on C."authorUuid" = P.uuid
                     LEFT JOIN (
                SELECT count(*) AS up
                     ,V."commentUuid"
                FROM "UserCommentVotes" AS V
                WHERE V.dir = 1
                GROUP BY "commentUuid"
            ) AS UP ON UP."commentUuid" = C.uuid
                     LEFT JOIN (
                SELECT count(*) AS down
                     ,V."commentUuid"
                FROM "UserCommentVotes" AS V
                WHERE V.dir = - 1
                GROUP BY "commentUuid"
            ) AS DOWN ON DOWN."commentUuid" = C.uuid
                     LEFT JOIN (
                SELECT V.dir
                     ,V."commentUuid"
                FROM "UserCommentVotes" AS V
                WHERE V."userUuid" = user_uuid
            ) AS D ON D."commentUuid" = C.uuid
            WHERE C."postUuid" = post_uuid
              AND C."parentUuid" IS NULL
              AND C.created <= AFTER
            ORDER BY CASE
                         WHEN order_by_created IS true
                             THEN cast(extract(epoch FROM C.created) AS BIGINT)
                END DESC
                   ,CASE
                        WHEN order_by_created IS false
                            THEN C."resVote"
                END DESC limit(_limit + 1) offset(page - 1) * _limit
        )

        UNION

        SELECT C.*
             ,P.role
             ,E.level + 1 AS level
             ,UP.up
             ,DOWN.down
             ,D.dir
        FROM cte_comments AS E
                 INNER JOIN "Comment" AS C ON E.uuid = C."parentUuid"
                 JOIN "User" AS P on C."authorUuid" = P.uuid
                 LEFT JOIN (
            SELECT count(*) AS up
                 ,V."commentUuid"
            FROM "UserCommentVotes" AS V
            WHERE V.dir = 1
            GROUP BY "commentUuid"
        ) AS UP ON UP."commentUuid" = C.uuid
                 LEFT JOIN (
            SELECT count(*) AS down
                 ,V."commentUuid"
            FROM "UserCommentVotes" AS V
            WHERE V.dir = - 1
            GROUP BY "commentUuid"
        ) AS DOWN ON DOWN."commentUuid" = C.uuid
                 LEFT JOIN (
            SELECT V.dir
                 ,V."commentUuid"
            FROM "UserCommentVotes" AS V
            WHERE V."userUuid" = user_uuid
        ) AS D ON D."commentUuid" = C.uuid
        WHERE E.level < levels
    ) SELECT R.uuid, R.role, R."postUuid", R."authorUuid", R.body, R."parentUuid", R."authorUsername", R."resVote", R.created, R.modified, R.level, R.up, R.down, R.dir FROM cte_comments AS R);
END;$$;

DROP FUNCTION get_comment_comments(comment_uuid uuid, user_uuid uuid, levels integer);
CREATE OR REPLACE FUNCTION GET_COMMENT_COMMENTS(COMMENT_UUID UUID,
                                     USER_UUID UUID,
                                     LEVELS integer DEFAULT 6) RETURNS TABLE(UUID UUID,
                                                                             "postUuid" UUID,
                                                                             "authorUuid" UUID,
                                                                             "role" "Role",
                                                                             BODY CHARACTER varying, "parentUuid" UUID,
                                                                             "authorUsername" CHARACTER varying, "resVote" bigint, CREATED TIMESTAMP WITHOUT TIME ZONE,
                                                                             MODIFIED TIMESTAMP WITHOUT TIME ZONE,
                                                                             LEVEL integer, UP bigint, DOWN bigint, DIR smallint) LANGUAGE PLPGSQL AS $$
begin
    return query (
        with recursive cte_comments as (
            (
                select
                    C.*, P.role, 1 as level
                from
                    "Comment" as C
                join
                    "User" as P on C."authorUuid" = P.uuid
                where
                        C.uuid = comment_uuid
            )
            union
            (
                select
                    C.*, P.role, E.level + 1 as level
                from
                    cte_comments as E
                        join
                    "Comment" as C on E.uuid = C."parentUuid"
                        join
                    "User" as P on C."authorUuid" = P.uuid
                where
                        E.level < levels

            )
        )
        select
            R.uuid,
            R."postUuid",
            R."authorUuid",
            R.role,
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