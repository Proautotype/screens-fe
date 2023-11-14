import {useEffect} from 'react';
import {Button, Divider, Stack, SxProps,  Theme, Typography} from "@mui/material";
import ExamCard from "./ExamCard";

interface IProps {
}

const Exam = (props: IProps) => {
  useEffect(() => {
  }, [])
  return <Stack>
      <TextPage title={"I/A Examination"}/>
      <Divider sx={{paddingTop: 1,paddingBottom: 1,}}/>
      <TextPage title={"End Of Examination"}/>
  </Stack>
}

export default Exam;

const TextPage = ({title}: {title: string}) => {
  return <Stack className={'TextPageMain'} sx={TextPageStyle}>
    <Stack className={'text-page-header'} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
      <Typography>{title}</Typography>
      <Button>View More</Button>
    </Stack>
    <Stack className={'text-page-body'} gap={1} direction={'row'}>
      <ExamCard/>
      <ExamCard/>
      <ExamCard/>
      <ExamCard/>
    </Stack>
  </Stack>
}

const TextPageStyle: SxProps<Theme> ={
  width: "100%",
  justifyContent:"flex-start",
  alignItems: "center",
  overflowX: 'hidden',
  '& > .text-page-header':{
    width:"100%",
    paddingLeft: 1,
    paddingRight: 1,
  },
  '& > .text-page-body':{
    justifyContent:"center",
    width:"100%",
    overflowX: 'auto',
  }
}