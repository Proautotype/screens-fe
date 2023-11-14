import {useEffect} from 'react';
import {
  Box, Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import {MainStyle} from "../../Signin";
import loginBackgroundVector from "../../../assets/images/loginBackgroundVector.svg";
import noteIcon from "../../../assets/images/noteIcon.png";
import colors from "../../../assets/colors/colors";
import {ArrowLeft, Brightness1, ControlPoint, Star} from "@mui/icons-material";
import Texts from "../../../utils/Texts";
import PrimaryButton from "../../../components/PrimaryButton";
import {useNavigate} from "react-router";
import {routerPaths} from "../../../router.config";

interface IProps {
}

const ExamInstructions = (props: IProps) => {
  const nav =  useNavigate();

  const onAction = (forward: boolean) => {
    nav(forward ?  routerPaths.exams.camera : routerPaths.student.exam);
  }
  useEffect(() => {
  }, [])
  return <Stack sx={{...ExamInstructionsStyle}}>
        <Stack className={'content-area'} direction={'row'}>
          <img className={"vector"} alt={"vectorimage"} src={loginBackgroundVector}/>
          <Box className={"hero"} >
            <Button onClick={()=> onAction(false) }>
              <ArrowLeft/>
              <Typography component={'span'}>View all exams</Typography>
            </Button>
            <img alt={"note"} src={noteIcon}/>
          </Box>
          <Stack className={"detail"} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Stack className={'detail-instructions-title'}>
              <Typography component={'span'}>Read The Instructions Carefully</Typography>
            </Stack>
            <List  className={'generalInstructions'}>
              <ListSubheader>General Instructions</ListSubheader>
              {Texts.getInstructions().map((item)=>(
                <ListItem >
                  <ListItemIcon>
                    <Brightness1/>
                  </ListItemIcon>
                  <ListItemText >{item}</ListItemText>
                </ListItem>
              ))}
              <ListSubheader>Exams Instructions</ListSubheader>
              {Texts.getInstructions().slice(0,2).map((item)=>(
                <ListItem >
                  <ListItemIcon>
                    <Brightness1/>
                  </ListItemIcon>
                  <ListItemText >{item}</ListItemText>
                </ListItem>
              ))}
            </List>
            <Stack className={'workActions'}>
              <PrimaryButton text={'continue'} busy={false} onAction={()=> onAction(true) }/>
            </Stack>
          </Stack>
        </Stack>
  </Stack>
}

export default ExamInstructions;

export const ExamInstructionsStyle: SxProps<Theme> = {
  ...MainStyle,
  '.vector': {
    position: "absolute",
    left: 0,
    top: '10%',
    width: '70%',
    opacity: 0.2
  },
  '.hero':{
    width: '35%',
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    button:{
      position:'absolute',
      top: '10%',
      left: 0
    },
    img:{
      width: '300px',
      height: '300px',
    }
  },
  '.detail':{
    width: '59%',
    paddingTop:2,
    '.detail-instructions-title':{
      span:{
        fontSize: '1.3em',
        fontWeight: 'bold'
      }
    },
    '.actions':{
      width:'100%',
      alignItems:'flex-end',
      button:{
        width:'30%'
      }
    }
  }
}