import { Input, Stack, SxProps, Tab, Tabs,  Theme} from "@mui/material";
import colors from "../assets/colors/colors";
import { NotificationsActiveOutlined} from "@mui/icons-material";
import {SyntheticEvent, useReducer} from "react";

interface IProps {
}

interface iTabState {
  position: number
}

type iTabStateAction = {type:"changeTab"; value: iTabState['position']}

const Student = (props: IProps) => {
  const initialState: iTabState = {
    position: 0
  }
  const tabStateReducer = (prevState: iTabState, action: iTabStateAction)=>{
    switch (action.type) {
      case "changeTab":
        return {...prevState, position: action.value}
      default:
         throw new Error("Unknown action")
    }
  }
  const [tabState, dispatch] = useReducer(tabStateReducer, initialState);

  const changeTabDispatch = (event: SyntheticEvent, newValue: number) => {
    dispatch({type:"changeTab", value: newValue})
  };
  return <Stack sx={StudentMainStyle} justifyContent={'flex-start'}>
      <Stack className={'header'}
             alignItems={'center'} justifyContent={'space-around'}
             direction={'row'}
      >
        <Tabs value={tabState.position} onChange={changeTabDispatch} aria-label="select tab">
          <Tab label="Home" />
          <Tab label="Calendar"  />
          <Tab label="Questions" />
          <Tab label="Exams" />
        </Tabs>
        <Stack direction={'row'}
               justifyContent={'center'} alignItems={'center'}
               gap={5}  sx={{width:"30%"}}>
          <Input placeholder={"Search anything"} sx={{width:"55%"}}/>
          <NotificationsActiveOutlined/>
        </Stack>
      </Stack>
      <Stack className={'body'}>

      </Stack>
  </Stack>
}

export default Student;

const StudentMainStyle: SxProps<Theme> = {
    width:'100vw',
    '& .header':{
        height: '10vh',
        width:'99%',
        borderBottom: `1px solid ${colors.dark5}`
    }
}
