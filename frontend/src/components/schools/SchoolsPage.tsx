import PageWrapper from "../uilib/PageWrapper";
import Button from "../uilib/Button";
import { useEffect, useState } from "react";
import SchoolFacultyFormDialog from "./SchoolFacultyFormDialog";
import Table from "../uilib/Table";
import { useDeleteSchoolMutation, useLazyGetAllSchoolsQuery } from "../../app/enhancedApi";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Dialog from "../uilib/dialog/Dialog";
import Select, { SelectOption } from "../uilib/Select";
import classNames from "classnames";
import IconButton from "../uilib/IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { findCountryByCode } from "../../util/countries";

const countOptions: SelectOption[] = [
  { value: 10, text: "10" },
  { value: 20, text: "20" },
  { value: 30, text: "30" },
];

export default function SchoolsPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [getSchools, { data, isLoading, isFetching, isSuccess }] = useLazyGetAllSchoolsQuery();
  const [uuid, setUuid] = useState<string | undefined>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(countOptions[0].value);
  const navigate = useNavigate();

  useEffect(() => {
    getSchools({ page, count: typeof count === "string" ? parseInt(count) : count });
  }, [page, count]);

  const [deleteSchool, { isLoading: deleteSchoolLoading, isError: deleteSchoolError, isSuccess: deleteSchoolSuccess }] =
    useDeleteSchoolMutation();

  useEffect(() => {
    if (deleteSchoolSuccess) {
      setShowDeleteDialog(false);
    }
  }, [deleteSchoolLoading, deleteSchoolSuccess]);

  const [pageOptions, setPageOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (isSuccess && data) {
      const pages = Array.from(Array(data.pages + 1).keys()).slice(1);
      setPageOptions(pages.map((page) => ({ value: page, text: String(page) })));
    }
  }, [isFetching, isSuccess]);

  return (
    <>
      <PageWrapper className="flex flex-col justify-start gap-2">
        <div
          className={classNames(
            "flex flex-row items-center gap-2 flex-wrap",
            { "justify-end": data && data?.schools.length === 0 },
            { "justify-between": data && data?.schools.length > 0 }
          )}
        >
          {data && data?.schools.length > 0 && (
            <div className={classNames("flex flex-row justify-start items-center gap-2 flex-wrap")}>
              <div className="w-32">
                <Select
                  options={pageOptions}
                  labelValue="Page"
                  display="row"
                  value={page}
                  onChange={(e: any) => setPage(parseInt(e.target.value))}
                />
              </div>
              <div className="w-32">
                <Select
                  options={countOptions}
                  labelValue="Items"
                  display="row"
                  value={count}
                  onChange={(e: any) => {
                    setPage(1);
                    setCount(parseInt(e.target.value));
                  }}
                />
              </div>
              {((pageOptions.length > 0 && page !== pageOptions[0].value) || count !== countOptions[0].value) && (
                <Button
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setCount(countOptions[0].value);
                  }}
                >
                  Reset
                </Button>
              )}
            </div>
          )}
          <Button type="button" onClick={() => setShowDialog(true)}>
            Add School
          </Button>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table
            columns={[
              "School UUID",
              "Name",
              "Country",
              "City",
              "Address Line 1",
              "Address Line 2",
              "Postal Code",
              "Actions",
            ]}
            rows={
              data
                ? data.schools.map((school) => [
                    school.uuid,
                    school.name,
                    findCountryByCode(school.countryCode)?.text,
                    school.city,
                    school.addressLineOne,
                    school.addressLineTwo,
                    school.postalCode,
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                      <Button type="button" onClick={() => navigate(`/faculties/school/${school.uuid}`)}>
                        Faculties
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setUuid(school.uuid);
                          setShowDialog(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="default-danger"
                        onClick={() => {
                          setUuid(school.uuid);
                          setShowDeleteDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>,
                  ])
                : []
            }
          />
        )}
        {pageOptions.length > 1 && (
          <div className="flex flex-row justify-center items-center gap-2 w-full">
            <IconButton
              className={classNames(
                "p-2 rounded-md",
                "bg-white dark:bg-slate-800",
                "border border-slate-200 dark:border-slate-700",
                "focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
                "focus:ring-blue-600/50 border-slate-200 dark:border-slate-700 focus:border-slate-200 focus:dark:border-slate-700"
              )}
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </IconButton>
            <div>{page}</div>
            <IconButton
              className={classNames(
                "p-2 rounded-md",
                "bg-white dark:bg-slate-800",
                "border border-slate-200 dark:border-slate-700",
                "focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
                "focus:ring-blue-600/50 border-slate-200 dark:border-slate-700 focus:border-slate-200 focus:dark:border-slate-700"
              )}
              disabled={page >= pageOptions[pageOptions.length - 1].value}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </IconButton>
          </div>
        )}
      </PageWrapper>
      <SchoolFacultyFormDialog
        show={showDialog}
        type="school"
        onClose={() => {
          setUuid(undefined);
          setShowDialog(false);
        }}
        uuid={uuid}
      />
      <Dialog
        show={showDeleteDialog}
        loading={deleteSchoolLoading}
        onConfirm={() => {
          deleteSchool({ deleteSchoolRequestDto: { uuid: uuid! } });
          setUuid(undefined);
        }}
        onCancel={() => {
          setUuid(undefined);
          setShowDeleteDialog(false);
        }}
        title="Delete School"
        body="This action cannot be undone. Are you sure you want to proceed?"
        danger
        cancelText="Keep"
        confirmText="Delete"
        error={deleteSchoolError ? "An error occurred while deleting this school." : undefined}
      />
    </>
  );
}
