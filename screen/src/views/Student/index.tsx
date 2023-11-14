import {Divider, Input, Stack, SxProps, Tab, Tabs, Theme} from "@mui/material";
import {NotificationsActiveOutlined} from "@mui/icons-material";
import {SyntheticEvent, useReducer} from "react";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router";
import {routerPaths} from "../../router.config";
import ProfileCard from "./ProfileCard";

interface IProps {
}

interface iTabState {
  position: number
}

type iTabStateAction = { type: "changeTab"; value: iTabState['position'] }

const Index = (props: IProps) => {
  const nav = useNavigate();
  const initialState: iTabState = {
    position: 0
  }
  const tabStateReducer = (prevState: iTabState, action: iTabStateAction) => {
    switch (action.type) {
      case "changeTab":
        return {...prevState, position: action.value}
      default:
        throw new Error("Unknown action")
    }
  }
  const [tabState, dispatch] = useReducer(tabStateReducer, initialState);

  const changeTabDispatch = (event: SyntheticEvent, newValue: number) => {
    dispatch({type: "changeTab", value: newValue})
    switch (newValue) {
      case 0:
        return nav(routerPaths.student.home);
      case 3:
        return nav(routerPaths.student.exam)
    }
  };

  return <Stack sx={StudentMainStyle} justifyContent={'flex-start'}>
    <Stack className={'header'} justifyContent={"center"} alignItems={"center"}>

      <Stack className={'nav'} alignItems={'center'} justifyContent={'space-between'}
             direction={'row'}>
        <Tabs value={tabState.position} onChange={changeTabDispatch} aria-label="select tab">
          <Tab label="Home"/>
          <Tab label="Calendar"/>
          <Tab label="Questions"/>
          <Tab label="Exams"/>
        </Tabs>
        <Stack direction={'row'}
               justifyContent={'flex-end'} alignItems={'center'}
               gap={5} sx={{width: "30%"}}>
          <Input placeholder={"Search anything"} sx={{width: "55%"}}/>
          <NotificationsActiveOutlined/>
        </Stack>
      </Stack>
    </Stack>
    <Divider/>
    <Stack className={'body'} justifyContent={"center"} alignItems={"center"}>
      <Stack className={'nav'} gap={2}>
        <ProfileCard/>
        <Divider/>
        <Outlet/>
      </Stack>
    </Stack>
  </Stack>
}

export default Index;

const StudentMainStyle: SxProps<Theme> = {
  width: '100vw',
  '& .header': {
    height: '10vh',
      width: '100%',
    '.nav': {
      width: "90%"
    }
  },
  '& .body': {
    width: '100%',
    '.nav': {
      width: "90%"
    }
  }
}
