import PageWrapper from "../uilib/PageWrapper";
import Post from "../../features/posts/post/Post";
import Button from "../uilib/Button";
import useTheme from "../hooks/useTheme";
import Box from "../uilib/Box";

export default function SandboxTwo() {
  const { setTheme } = useTheme();

  return (
    <PageWrapper className="flex flex-col gap-2">
      <Box className="flex flex-col justify-start items-start gap-2 w-full">
        <div className="flex flex-row gap-2 justify-start">
          <Button onClick={() => setTheme("light")}>Light</Button>
          <Button onClick={() => setTheme("dark")}>Dark</Button>
          <Button onClick={() => setTheme("system")}>System</Button>
        </div>
      </Box>

      <div className="flex flex-col gap-2 w-full">
        <Post
          uuid={"uuid"}
          title={"Lorem Ipsum"}
          body={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum numquam placeat quis ut veniam?"}
          created={new Date().toISOString()}
          modified={new Date().toISOString()}
          author={"qwerty123"}
          isAuthor={true}
          edited={true}
          up={2}
          down={0}
          dir={1}
          commentsCount={5}
        />
      </div>
    </PageWrapper>
  );
}
