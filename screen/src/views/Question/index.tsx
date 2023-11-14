import {Divider, Stack, SxProps} from "@mui/material";
import Nav, {centerRowStyle} from "./Card/Nav";
import Frame from "./Frame";

const index = () => {
  return <Stack sx={QuestionsStyle}>
    <Nav/>
    <Divider/>
    <Frame/>
  </Stack>
}

export default index

const QuestionsStyle:SxProps = {
  width:"100vw",
  height: "100vh",

}
