
import {Box, Stack, SxProps, Theme, Typography} from "@mui/material";
import {CalendarMonth, Watch} from "@mui/icons-material";
import colors from "../../../assets/colors/colors";
import PrimaryButton from "../../../components/PrimaryButton";
import {useNavigate} from "react-router";
import {routerPaths} from "../../../router.config";

interface IProps {
}

const ExamCard = (props: IProps) => {
 const nav =  useNavigate();
  const onAction = () => {
    nav(routerPaths.exams.instructions)
  }
  return <Stack sx={ExamCardStyle}>
      <Stack className={'exam-card-header'}
             direction={'row'} justifyContent={'space-between'}
             alignItems={'center'}
      >
        <Stack direction={'row'} justifyContent={'space-between'}
               alignItems={'center'} >
          <CalendarMonth/>
          <Typography component={'span'}>Today, 8 Hours More</Typography>
        </Stack>
        <Typography className={'title'} component={'span'}>30 Marks</Typography>
      </Stack>
      <Stack className={'exam-card-body'}>
        <Typography className={'exam-title'}>PHY201 - Civil Physics</Typography>
        <Stack className={'exam-lecturer'}>
          <Typography>Lecturer: Ampomah Winston</Typography>
        </Stack>
        <Box className={'exam-detail'}>
           <Watch/>
           <Typography component={'span'}>9:00am</Typography>
           <Typography component={'span'}>12:30pm</Typography>
        </Box>
      </Stack>
    <Stack className={'exam-card-action'}>
      <PrimaryButton text={"Take Test"} busy={false} height={30} onAction={onAction}/>
    </Stack>
  </Stack>
}

export default ExamCard;

const ExamCardStyle: SxProps<Theme> = {
  padding: 1,
  width: 280,
  minWidth: 310,
  borderRadius: 2,
  border: `1px solid ${colors.dark5}`,
  '.exam-card-header':{
    height: 35,
    padding: 1,
    backgroundColor: colors.dark5Light,
    color: colors.primary,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottom: `1px solid ${colors.dark5}`,
    fontSize: 12,
    'span':{
      fontSize: 12,
      '&.title':{
        padding: 0.5,
        border: `1px solid ${colors.primary}`,
        borderRadius:1
      }
    }
  },
  '.exam-card-body':{
    color: colors.dark5Text,
    padding: 1,
    '.exam-title':{
      fontWeight: 'bold',
      fontSize: '1.2em',
    },
    '.exam-lecturer':{
      padding: 2,
      paddingLeft: 0,
    },
    '.exam-detail':{
      display:'flex',
      gap: 1,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center'
    }
  }
}