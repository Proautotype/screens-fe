import {
  Box,
  Button,
  CircularProgress,
  Stack,
  SxProps,
  TextField,
  Theme,
  Toolbar,
  Typography
} from "@mui/material";
import colors from "../assets/colors/colors";
import loginBackgroundVector from '../assets/images/loginBackgroundVector.svg';
import loginHero from '../assets/images/loginHero.svg';
import {useReducer} from "react";
import CustomDialog from "../components/CustomDialog";
import CustomTextField from "../components/CustomTextField";
import {useNavigate} from "react-router";
import {routerPaths} from "../router.config";

interface iStateDescriptor{
  email: string,
  emailError: boolean,
  password: string,
  passwordError: boolean,
  busy: boolean,
  openDialog: boolean
}
type iStateAction =
  | {type:"updateMail"; value: iStateDescriptor['email']}
  | {type:"updateMailError", value: iStateDescriptor['emailError']}
  | {type:"updatePassword", value: iStateDescriptor['password']}
  | {type:"updatePasswordError", value: iStateDescriptor['passwordError']}
  | {type:"updateBusy", value: iStateDescriptor['busy']}
  | {type:"updateDialogOpen", value: iStateDescriptor['openDialog']}
  ;

const Signin = () => {

  const navigate = useNavigate();

  const initialState: iStateDescriptor = {
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    busy: false,
    openDialog: false
  }
  const stateReducer = (prevState: iStateDescriptor, action: iStateAction)=>{
    switch (action.type) {
      case "updateMail":
        return {...prevState, email: action.value};
      case "updateMailError":
        return {...prevState, emailError: action.value }
      case "updatePassword":
        return {...prevState, password: action.value}
      case "updatePasswordError":
        return  {...prevState, passwordError: action.value}
      case "updateBusy":
        return {...prevState, busy: action.value}
      case "updateDialogOpen":
        return {...prevState, openDialog: action.value}
      default:
        throw new Error("Unknown action");
    }
  }
  const [state, dispatch] = useReducer(stateReducer,initialState);

  const triggerDialog = () => dispatch({type:"updateDialogOpen", value: !state.openDialog})

  const updateEmailDispatch = (value: string) => dispatch({
    type: "updateMail",
    value: value
  });

  const updatePasswordDispatch = (value: string) => dispatch({
    type: "updatePassword",
    value: value
  });

  const updateBusy = (value: boolean) => dispatch({type:"updateBusy", value});

  const onAction = () => {
    updateBusy(true);
    setTimeout(()=>{
      updateBusy(false);
    }, 1000 * 5)
  }

  const SignIn = () => {
    navigate(routerPaths.student)
  }

  return <Stack sx={MainStyle}>
    <img className={"vector"} alt={"vectorimage"} src={loginBackgroundVector}/>
    <Stack className={'content-area'} direction={'row'} sx={ContentAreaStyle}>
      <Stack className={"common pictorial"}>
        <img alt={"login hero"} src={loginHero}/>
      </Stack>
      <Stack className={"common state"} gap={4}>
        <Stack className={"header"}>
          <Typography className={'title'}>AUTHENTICATION</Typography>
          <Box width={'80%'} className={'detail'}>
            Welcome to <Typography className={'_important'} component={'span'}>SCREENS</Typography>,
            please fill the form with your credentials, you have <Typography className={'_important'} component={'span'}>3 </Typography>
            attempts left to authenticate, after this the application will not work even across multiple browsers, until 12hrs period
          </Box>
        </Stack>
        <Stack className={'fields'} gap={4}>
          <CustomTextField
            error={state.emailError} value={state.email}
            changeEvent={updateEmailDispatch} placeHolder={"Enter Index Number/Institution Email"}/>
          <CustomTextField
            error={state.passwordError} value={state.password}
            changeEvent={updatePasswordDispatch} type={'password'} placeHolder={'Enter Password'}/>
          <PrimaryButton text={"Submit"} busy={state.busy} onAction={SignIn}/>
        </Stack>
        <Stack className={'footer'}>
          <Toolbar sx={{width:'100%', display:'flex', justifyContent:'center'}}>
            <Button onClick={triggerDialog}>Recover Password</Button>
            <Button>Make a complain</Button>
          </Toolbar>
          <Typography>The best examination platform</Typography>
        </Stack>
      </Stack>
    </Stack>
    <CustomDialog open={state.openDialog} closeDialog={triggerDialog} title={"Recover Password"} children={
      <Stack gap={1}>
        <CustomTextField
          error={state.emailError} value={state.email}
          changeEvent={updateEmailDispatch} placeHolder={'Enter Index Number/Institution Email'}/>
        <PrimaryButton text={"Submit"} busy={state.busy} height={30} onAction={onAction}/>
      </Stack>
    }/>
  </Stack>
}

export default Signin

const MainStyle: SxProps<Theme> = {
  backgroundColor: colors.primary,
  display: "flex",
  justifyContent: "flex-end",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  position: "relative",
  '.vector': {
    position: "absolute",
    right: 0,
    top: 0,
    width: '70%',
  },
  '.content-area': {
    zIndex: 1,
    width: "97%",
    height: '95%',
    backgroundColor: colors.plain,
    borderTopRightRadius: 50
  }
}
const ContentAreaStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  '.common': {
    justifyContent: "center",
    alignItems: "center",
    width: '50%',
    height: '100%',
  },
  '.pictorial': {
    img: {
      width: '75%'
    }
  },
  '.state': {
    justifyContent:'flex-start',
    height: '80%',
    width:'35%',
    border:`2px solid ${colors.primary}`,
    borderRadius: 3,
    borderTopRightRadius: 50,
    '& .header':{
      paddingTop:5,
      width: '70%',
      '.title': {
        fontSize: '2em',
        textAlign:'center'
      },
      '& .detail':{
        width:'100%',
        textAlign:'center',
        fontSize:'0.8em',
        borderBottom: `1px dashed ${colors.primary}`,
        '._important':{
          color: 'red',
          fontWeight:'bold',
        }
      }
    },
    '& .fields': {
      width: '70%'
    },
    '& .footer':{
      borderTop: `1px dashed ${colors.primary}`,
      width: '70%',
      fontSize:'0.5em',
      justifyContent:'flex-end',
      alignItems:'center'
    }
  }
}
const PrimaryButton = (props: {text: string, busy: boolean, height?: string | number, onAction?: ()=>void}) => {
  return <Button
    aria-label={'sign in'}
    title={'sign in'}
    sx={{
      height:props.height || 50,
      backgroundColor:colors.primary,
      color: colors.plain,
      '&:hover':{
        backgroundColor:colors.primary
      }
    }}
    onClick={props.onAction}
  >
    {!props.busy && props.text} {props.busy && <CircularProgress color={'inherit'} size={15} sx={{marginLeft: 1}}/>}
  </Button>
}
