import Popover from "../../uilib/Popover";
import { BellIcon } from "@heroicons/react/24/outline";
import NavbarButton from "./NavbarButton";
import { useGetUserNotificationsQuery } from "../../../app/enhancedApi";
import Button from "../../uilib/Button";
import classNames from "classnames";
import Notification from "../notifications/Notification";
import { isNil } from "lodash";
import Alert from "../../uilib/Alert";

interface Props {
  closeMenu: () => void;
}

export default function NotificationsPanel(props: Props) {
  const { closeMenu } = props;
  const { data, isError, refetch, isFetching } = useGetUserNotificationsQuery();
  const panel = (
    <>
      <Button disabled={isFetching} loading={isFetching} onClick={() => refetch()}>
        Refresh
      </Button>
      <Alert show={isError} fullWidth onClose={() => refetch()}>
        Error loading notifications. Please try again.
      </Alert>
      {data?.notifications.map((notification) => (
        <Notification key={notification.notificationUuid} {...notification} />
      ))}
      {isNil(data) ||
        (data.notifications.length === 0 && <div className="text-center">You have no new notifications 🥳</div>)}
    </>
  );

  return (
    <Popover
      content={panel}
      button={
        <>
          <BellIcon className="h-6 w-6" />
          <span className="hidden lg:inline">Notifications</span>
        </>
      }
      buttonAs={NavbarButton}
      onClick={closeMenu}
      position="fixed"
      className={classNames(
        "right-0 left-0 top-[3.4rem]",
        "flex flex-col justify-start gap-2 w-[98%] max-w-screen-sm mx-auto md:ml-auto md:mr-14"
      )}
    />
  );
}
