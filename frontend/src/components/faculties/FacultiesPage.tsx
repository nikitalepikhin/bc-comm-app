import { useEffect, useState } from "react";
import { useDeleteFacultyMutation, useGetSchoolByUuidQuery, useLazyGetAllFacultiesQuery } from "../../app/enhancedApi";
import Select, { SelectOption } from "../uilib/Select";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../uilib/PageWrapper";
import classNames from "classnames";
import Button from "../uilib/Button";
import LoadingSpinner from "../uilib/LoadingSpinner";
import Table from "../uilib/Table";
import IconButton from "../uilib/IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Dialog from "../uilib/dialog/Dialog";
import SchoolFacultyFormDialog from "../schools/SchoolFacultyFormDialog";
import { useAppSelector } from "../../app/redux/hooks";
import ErrorPage from "../common/ErrorPage";
import { findCountryByCode } from "../../util/countries";

const countOptions: SelectOption[] = [
  { value: 10, text: "10" },
  { value: 20, text: "20" },
  { value: 30, text: "30" },
];

export default function FacultiesPage() {
  const { schoolUuid } = useParams() as { schoolUuid: string };
  const { role } = useAppSelector((state) => state.auth.user);
  const [showDialog, setShowDialog] = useState(false);
  const [showSchoolDialog, setShowSchoolDialog] = useState(false);
  const [getFaculties, { data, isLoading, isFetching, isSuccess, isError, error }] = useLazyGetAllFacultiesQuery();
  const { data: school } = useGetSchoolByUuidQuery({ uuid: schoolUuid });
  const [uuid, setUuid] = useState<string | undefined>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(countOptions[0].value);

  useEffect(() => {
    getFaculties({ page, count: typeof count === "string" ? parseInt(count) : count, uuid: schoolUuid });
  }, [page, count]);

  const [deleteFaculty, { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess }] =
    useDeleteFacultyMutation();

  useEffect(() => {
    if (deleteSuccess) {
      setShowDeleteDialog(false);
    }
  }, [deleteLoading, deleteSuccess]);

  const [pageOptions, setPageOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (isSuccess && data) {
      const pages = Array.from(Array(data.pages + 1).keys()).slice(1);
      setPageOptions(pages.map((page) => ({ value: page, text: String(page) })));
    }
  }, [isFetching, isSuccess]);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  return (
    <>
      <PageWrapper className="flex flex-col justify-start gap-2">
        <div
          className={classNames(
            "flex flex-col-reverse md:flex-row items-start md:items-center gap-2 flex-wrap",
            { "justify-end": data && data?.faculties.length === 0 },
            { "justify-between": data && data?.faculties.length > 0 }
          )}
        >
          {data && data?.faculties.length > 0 && (
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
          <div className="flex flex-row justify-end items-center gap-2 flex-wrap">
            {school && <div className="font-bold">{school.name}</div>}
            <div className="flex flex-row justify-between items-center gap-2">
              {role === "REPRESENTATIVE" && (
                <Button
                  type="button"
                  onClick={() => {
                    setUuid(schoolUuid);
                    setShowSchoolDialog(true);
                  }}
                >
                  Edit School
                </Button>
              )}
              <Button type="button" onClick={() => setShowDialog(true)}>
                Add Faculty
              </Button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table
            columns={[
              "Faculty UUID",
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
                ? data.faculties.map((faculty) => [
                    faculty.uuid,
                    faculty.name,
                    findCountryByCode(faculty.countryCode)?.text,
                    faculty.city,
                    faculty.addressLineOne,
                    faculty.addressLineTwo,
                    faculty.postalCode,
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                      <Button
                        type="button"
                        onClick={() => {
                          setUuid(faculty.uuid);
                          setShowDialog(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="default-danger"
                        onClick={() => {
                          setUuid(faculty.uuid);
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
        type="faculty"
        onClose={() => {
          setUuid(undefined);
          setShowDialog(false);
        }}
        uuid={uuid}
      />
      <SchoolFacultyFormDialog
        show={showSchoolDialog}
        onClose={() => {
          setUuid(undefined);
          setShowSchoolDialog(false);
        }}
        uuid={uuid}
        type="school"
      />
      <Dialog
        show={showDeleteDialog}
        loading={deleteLoading}
        onConfirm={() => {
          deleteFaculty({ deleteFacultyRequestDto: { uuid: uuid! } });
          setUuid(undefined);
        }}
        onCancel={() => {
          setUuid(undefined);
          setShowDeleteDialog(false);
        }}
        title="Delete Faculty"
        body="This action cannot be undone. Are you sure you want to proceed?"
        danger
        cancelText="Keep"
        confirmText="Delete"
        error={deleteError ? "An error occurred while deleting this faculty." : undefined}
      />
    </>
  );
}
