import {useEffect} from 'react';
import {Box,  Stack, SxProps, Typography} from "@mui/material";
import {centerRowStyle} from "./Card/Nav";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, {timelineItemClasses} from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import QA from "./Card/QA";
import {Pagination} from "@mui/lab";
import {examBody} from "../../utils/data";
import colors from "../../assets/colors/colors";
import { LockClock, LockOpen} from "@mui/icons-material";

interface IProps {
  examData: examBody[]
}

const Frame = (props: IProps) => {
  useEffect(() => {
  }, [])
  return <Stack sx={FrameStyle} className={'frame'}>

    <Stack className={'content'}>
      <Stack className={'sideNav'}>
        <Stack className={'sections'} gap={1}>
          {props.examData.map((value, idx)=>
            <Section key={'key-'+value.toString()+idx} section={value.section} security={value.security}/>)}
        </Stack>
      </Stack>
      <Stack width={'90%'}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}>
          {props.examData[0].questions.map((question, idx) => <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  fontSize: 8,
                  width: 9,
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 'bold'
                }}>{idx + 1}</TimelineDot>
              <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent>
              <QA questionBody={question}/>

            </TimelineContent>

          </TimelineItem>)}
        </Timeline>
        <Stack className={'actions'} alignItems={'flex-end'}>
          <Pagination count={props.examData.length} color="primary"/>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
}

export default Frame;

const FrameStyle: SxProps = {
  ...centerRowStyle,
  alignItems: "flex-start",
  // backgroundColor: colors.dark5Light,
  width: '100vw',
  '& .content': {
    flexDirection: "row",
    width: '74%',
    '& .sideNav': {
      padding: 2,
      paddingTop: 3,
      '.sections':{
        width:'100%',
        border: `1px solid ${colors.dark5}`,
        borderRadius:3,
        padding: 1,

      }
    },
    '.actions': {
      padding: 1,
      paddingRight: 2,
    },
    marginBottom: 5
  }
}

const Section = ({section, security}: {section: string, security:boolean}) =>{
  return <Box sx={SectionStyle} className={security ? " locked" : "" }>
    <Typography textAlign={'center'}>Section {section.toUpperCase()}</Typography>
    {security ? <LockClock/> : <LockOpen/>}
  </Box>
}

const SectionStyle: SxProps = {
  position: 'relative',
  cursor: "pointer",
  padding: 1,
  border: `1px solid ${colors.dark5}`,
  borderRadius: 2,
  '&.locked':{
    backgroundColor: colors.dark5Text,
    color: colors.dark5,
    cursor: "wait",
    svg:{
      color: colors.dark5,
    }
  },
  svg:{
    color: colors.dark5Text,
    position: 'absolute',
    top: -7,
    right: 0,
  }
}