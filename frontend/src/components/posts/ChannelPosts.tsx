import { useParams } from "react-router-dom";
import Button from "../uilib/Button";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import StyledLink from "../uilib/StyledLink";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import { GetPostsForChannelApiArg } from "../../app/api";
import ChannelPostsSection from "../channels/ChannelPostsSection";
import { useInView } from "react-intersection-observer";
import { resetPostsLoadTime } from "../../app/redux/slice/postsSlice";
import RadioGroup from "../uilib/RadioGroup";
import { Field, FieldProps, Form, Formik } from "formik";
import Box from "../uilib/Box";

interface SortForm {
  sort: "new" | "top";
}

const initialValues: SortForm = {
  sort: "new",
};

export default function ChannelPosts() {
  const { textId } = useParams() as { textId: string };
  const {
    user: { role },
    present,
  } = useAppSelector((state) => state.auth);
  const [order, setOrder] = useState<GetPostsForChannelApiArg["order"]>("new");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const pages = Array.from(Array(page + 1).keys()).slice(1);
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView) {
      setPage(page + 1);
      setHasMore(false);
    }
  }, [inView]);

  useEffect(() => {
    dispatch(resetPostsLoadTime());
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="flex flex-row gap-2 w-full justify-between items-center">
        <Formik
          initialValues={initialValues}
          onSubmit={({ sort }) => {
            setOrder(sort);
            setPage(1);
            setHasMore(false);
          }}
        >
          {({ handleSubmit }) => (
            <Form className="w-full">
              <Field name="sort">
                {({ field }: FieldProps) => (
                  <RadioGroup
                    {...field}
                    onChange={(e: ChangeEvent) => {
                      field.onChange(e);
                      handleSubmit();
                    }}
                    defaultValue="new"
                    options={[
                      { value: "new", label: "New" },
                      { value: "top", label: "Top" },
                    ]}
                  />
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </div>
      {pages.map((page, index) => (
        <ChannelPostsSection
          ref={ref}
          key={page}
          page={page}
          isLastPage={index === pages.length - 1}
          order={order}
          hasMore={hasMore}
          setHasMore={setHasMore}
        />
      ))}
    </div>
  );
}
