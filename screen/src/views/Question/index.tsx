import {Divider, Stack, SxProps} from "@mui/material";
import Nav from "./Card/Nav";
import Frame from "./Frame";
import {useRef} from "react";
import mockData, {examBody, iData} from "../../utils/data";

const Index = () => {
  const mock = useRef<iData>(mockData);
  return <Stack sx={QuestionsStyle}>
    <Nav title={mock.current.title} time={mock.current.startDate}/>
    <Divider/>
    <Frame examData={mock.current.body as examBody[]} />
  </Stack>
}

export default Index

const QuestionsStyle:SxProps = {
  width:"100vw",
  height: "100vh",

}
