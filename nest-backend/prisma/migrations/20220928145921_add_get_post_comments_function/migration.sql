CREATE
    OR REPLACE FUNCTION GET_POST_COMMENTS (POST_UUID UUID,

                                           USER_UUID UUID,

                                           PAGE INT DEFAULT 1,

                                           ORDER_BY_CREATED boolean DEFAULT TRUE,

                                           _LIMIT INT DEFAULT 10,

                                           LEVELS INT DEFAULT 6) RETURNS TABLE (UUID UUID ,
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
                 ,1 AS level
                 ,UP.up
                 ,DOWN.down
                 ,D.dir
            FROM "Comment" AS C
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
             ,E.level + 1 AS level
             ,UP.up
             ,DOWN.down
             ,D.dir
        FROM cte_comments AS E
                 INNER JOIN "Comment" AS C ON E.uuid = C."parentUuid"
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
    ) SELECT R.uuid, R."postUuid", R."authorUuid", R.body, R."parentUuid", R."authorUsername", R."resVote", R.created, R.modified, R.level, R.up, R.down, R.dir FROM cte_comments AS R);
END;$$;