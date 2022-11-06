import classNames from "classnames";
import EditEmail from "./EditEmail";
import Container from "../uilib/Container";
import ChangePassword from "./ChangePassword";
import RefreshUsername from "./RefreshUsername";

export default function EditAccount() {
  return (
    <Container
      title="Account Details"
      className={classNames("w-full max-w-screen-lg", "flex flex-col justify-start gap-2")}
    >
      <RefreshUsername />
      <EditEmail />
      <ChangePassword />
    </Container>
  );
}
