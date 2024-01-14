import {useEffect} from 'react';
import {Box, Stack, SxProps, Typography} from "@mui/material";
import book from '../../../assets/images/Book.svg';
import clock from '../../../assets/images/clock.svg';
import colors from "../../../assets/colors/colors";
import dayjs from "dayjs";
import Actions from "../../../utils/actions";

interface IProps {
  title: string,
  time: dayjs.Dayjs
}

const Nav = (props: IProps) => {
  useEffect(() => {
  }, [])
  return <Stack sx={NavStyle}>
    <Stack className={'left'} sx={NavLeftStyle}>
      <Box>
        <img alt={'book'} src={book}/>
      </Box>
      <Typography className={'subject'}>{props.title}</Typography>
      <Box className={'indicator'}>
        <Box className={'body'}></Box>
      </Box>
      <Typography className={'timer'}>20% Complete</Typography>
    </Stack>
    <Stack className={'right'} sx={NavRightStyle}>
     <Box  className={'clock'}>
       <img alt={'clock'} src={clock}/>
     </Box>
      <Stack className={'timer'}>
        <Typography className={'time'}>{Actions.NavTimeFormatter(props.time)}</Typography>
        <Typography className={'detail'}>Time left</Typography>
      </Stack>
    </Stack>
  </Stack>
}

export default Nav;

export const centerRowStyle:SxProps = {
  flexDirection:"row",
  justifyContent:"space-around",
  alignItems:"center",
}

const NavStyle:SxProps = {
  ...centerRowStyle,
  width:"100%",
  minWidth:"100%",
  minHeight: "10vh",
  gap: 7,
}

const NavLeftStyle:SxProps = {
  ...centerRowStyle,
  gap: 2,
  '.subject':{
    fontWeight:'bold'
  },
  '.timer':{
    fontSize:'0.9em'
  },
  '.indicator':{
    width: 250,
    minWidth: 250,
    height: 8,
    backgroundColor: colors.dark5Light,
    borderRadius: 5,
    '.body':{
      width: "20%",
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 5,
    }
  },
}

const NavRightStyle:SxProps = {
  ...centerRowStyle,
  gap: 1,
  '.clock':{
    img:{
      width:40,
    }
  },
  '.timer':{
    '.time':{
      fontSize: '0.9em'
    },
    '.detail':{
      color: colors.dark5,
      fontSize: '0.9em'
    }
  }
}

