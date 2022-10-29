import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useLazyRequestVerificationQuery } from "../../../app/enhancedApi";
import { useAppSelector } from "../../../app/redux/hooks";
import Alert from "../../uilib/Alert";
import Button from "../../uilib/Button";

export default function VerificationWarning() {
  const {
    user: { role, requestsVerification, verificationMessage, verified },
  } = useAppSelector((state) => state.auth);

  const [requestVerification, { isFetching, isError }] = useLazyRequestVerificationQuery();

  return (
    <div
      className={classNames(
        "bg-orange-100 dark:bg-orange-900 shadow dark:shadow-gray-800",
        "py-2 px-3 w-full z-10",
        "text-center dark:text-white text-sm",
        "flex flex-col md:flex-row justify-around items-center gap-2"
      )}
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <div className="bg-orange-200 dark:bg-orange-700 rounded-full p-1">
          <ExclamationTriangleIcon className="h-6 w-6" />
        </div>
        <div className="font-bold">
          {`Account verification is required ${
            role === "REPRESENTATIVE" ? "to manage your school" : "to communicate with others"
          }.`}
          {verificationMessage === undefined && (
            <span className="font-normal">{` Wait to be verified by ${
              role === "REPRESENTATIVE" ? "an admin" : "your school's representative or an admin"
            }.`}</span>
          )}
          {verificationMessage && (
            <>
              <span className="italic font-normal">
                {" Your verification has been declined with the following reason: "}
              </span>
              <span className="font-normal">{`"${verificationMessage}".`}</span>
            </>
          )}
        </div>
      </div>
      {!requestsVerification && !verified && verificationMessage !== undefined && (
        <Button variant="accent" type="button" onClick={() => requestVerification()} loading={isFetching}>
          Request again
        </Button>
      )}
      <Alert show={isError}>Error requesting verification. Please try again.</Alert>
    </div>
  );
}
