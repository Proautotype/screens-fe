import {useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import {ExamInstructionsStyle} from "./ExamInstructions";
import loginBackgroundVector from "../../../assets/images/loginBackgroundVector.svg";
import {ArrowLeft, Brightness1} from "@mui/icons-material";
import noteIcon from "../../../assets/images/camera.png";
import {routerPaths} from "../../../router.config";
import {useNavigate} from "react-router";
import Texts from "../../../utils/Texts";
import PrimaryButton from "../../../components/PrimaryButton";

interface IProps {
}

const CameraInstructions = (props: IProps) => {
  const [nextBtnState, setNextBtnState] = useState<boolean>(true);
  const nav =  useNavigate();

  const accessCamera = () =>{
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      .then(function(stream) {
        console.log("enabled");
        setNextBtnState(false);
      })
      .catch(function(err) {
        if (err.name === "NotAllowedError") {
          //disable the start exams
          alert("Please enable camera access to use this feature.");
          setNextBtnState(true)
        } else {
          console.log(err.name + ": " + err.message);
        }
      });
  }


  useEffect(() => {
    accessCamera();
  });

  const onAction = (forward: boolean) => {
    switch (forward) {
      case true:
        return nav(routerPaths.exams.questions );
      case false:
        return  nav(routerPaths.exams.instructions);
    }
  }

  return <Stack sx={CameraInstructionsStyle}>
    <Stack  className={'content-area'} direction={'row'}>
      <img className={"vector"} alt={"vectorimage"} src={loginBackgroundVector}/>
      <Box className={"hero"} >
        <Button onClick={()=> onAction(false) }>
          <ArrowLeft/>
          <Typography component={'span'}>View all exams</Typography>
        </Button>
        <img alt={"note"} src={noteIcon}/>
      </Box>
      <Stack className={"detail"} justifyContent={'flex-start'} alignItems={'flex-start'}>
        <Typography className={'detail-title'}>Camera Instructions</Typography>
        <Typography>For the purposes of fairness, your camera must be on throughout this exams</Typography>
        <List>
          {Texts.getCameraInstructions().map((text,idx)=><ListItem key={text + "-"+idx}>
            <ListItemIcon><Brightness1/></ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </ListItem>)}
        </List>
        <Stack className={'workActions'} >
          <PrimaryButton text={'Start Exams'} busy={false} disabled={nextBtnState} onAction={()=>onAction(true)}/>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
}

export default CameraInstructions;

const CameraInstructionsStyle: SxProps<Theme> = {
  ...ExamInstructionsStyle,
'.detail':{
    justifyContent:'center',
    alignItems:'flex-start',
    '.detail-title':{
      fontWeight: 'bold',
      fontSize: '2em'
    },
  '.actions':{
    button: {
      width:200,
      height: 40
    }
  }
}
}