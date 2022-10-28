import Box from "../uilib/Box";
import PageWrapper from "../uilib/PageWrapper";
import Tabs from "../uilib/Tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthPage() {
  return (
    <PageWrapper className="flex flex-row justify-center items-center">
      <Box className="w-full max-w-screen-sm mt-[15vh] flex flex-col justify-start items-stretch gap-2">
        <h1 className="text-xl font-bold text-center uppercase">Communication App</h1>
        <Tabs
          tabItems={[
            { name: "Log In", element: <LoginForm /> },
            { name: "Sign Up", element: <SignupForm /> },
          ]}
        />
      </Box>
    </PageWrapper>
  );
}
