create or replace function get_post_comments(
    post_uuid uuid,
    user_uuid uuid,
    page int default 1,
    order_by boolean default false,
    _limit int default 10,
    levels int default 6
)
    returns table (
                      uuid uuid,
                      "postUuid" uuid,
                      "authorUuid" uuid,
                      body varchar(10000),
                      "parentUuid" uuid,
                      "authorUsername" varchar(32),
                      "resVote" bigint,
                      created timestamp,
                      modified timestamp,
                      level int,
                      up bigint,
                      down bigint,
                      dir smallint
                  ) language plpgsql as $$
begin
    return query (
        with recursive cte_comments as
            (
            (select C.*, 1 as level, UP.up, DOWN.down, D.dir from "Comment" as C
                                                                   left join (
             select count(*) as up, V."commentUuid" from "UserCommentVotes" as V
             where V.dir = 1
             group by "commentUuid"
            ) as UP on UP."commentUuid" = C.uuid
                                                                   left join (
             select count(*) as down, V."commentUuid" from "UserCommentVotes" as V
             where V.dir = -1
             group by "commentUuid"
            ) as DOWN on DOWN."commentUuid" = C.uuid
                                                                   left join (
             select V.dir, V."commentUuid" from "UserCommentVotes" as V
             where V."userUuid" = user_uuid
            ) as D on D."commentUuid" = C.uuid
            where C."postUuid" = post_uuid and C."parentUuid" is null
            order by
              (case when order_by = false then cast(extract(epoch from C.created) as bigint) else C."resVote" end) desc
            limit _limit
              offset (page - 1) * _limit
            )
            union
            select C.*, E.level + 1 as level, UP.up, DOWN.down, D.dir from cte_comments as E
                                                                            join "Comment" as C on E.uuid = C."parentUuid"
                                                                            left join (
             select count(*) as up, V."commentUuid" from "UserCommentVotes" as V
             where V.dir = 1
             group by "commentUuid"
            ) as UP on UP."commentUuid" = C.uuid
                                                                            left join (
             select count(*) as down, V."commentUuid" from "UserCommentVotes" as V
             where V.dir = -1
             group by "commentUuid"
            ) as DOWN on DOWN."commentUuid" = C.uuid
                                                                            left join (
             select V.dir, V."commentUuid" from "UserCommentVotes" as V
             where V."userUuid" = user_uuid
            ) as D on D."commentUuid" = C.uuid
            where E.level < levels
            )
        select * from cte_comments);
end;$$