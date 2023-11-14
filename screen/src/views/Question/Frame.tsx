import {useEffect} from 'react';
import {Stack, SxProps} from "@mui/material";
import colors from "../../assets/colors/colors";
import {centerRowStyle} from "./Card/Nav";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, {timelineItemClasses} from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import QA from "./Card/QA";
import {Pagination} from "@mui/lab";

interface IProps {
}

const Frame = (props: IProps) => {
  useEffect(() => {
  }, [])
  return <Stack sx={FrameStyle} className={'frame'}>
    <Stack className={'content'}>
      <Timeline

        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{fontSize: 8, width: 9, display: 'grid', placeItems: 'center', fontWeight: 'bold'}}>1</TimelineDot>
            <TimelineConnector/>
          </TimelineSeparator>
          <TimelineContent>
            <QA
              option={'optional'}
              question={"Vincent has a paper route. Each morning, he delivers 37 newspapers to customers in his neighborhood. It takes Vincent 50 minutes to deliver all the papers. If Vincent is sick or has other plans, his friend Thomas, who lives on the same street, will sometimes deliver the papers for him."}
              answers={[
                "Vincent and Thomas live in the same neighborhood",
                "It takes Thomas more than 50 minutes to deliver the papers",
                "It is dark outside when Vincent begins his deliveries",
                "Thomas would like to have his own paper route"]}/>

          </TimelineContent>

        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{fontSize: 8, width: 9, display: 'grid', placeItems: 'center', fontWeight: 'bold'}}>2</TimelineDot>
            <TimelineConnector/>
          </TimelineSeparator>
          <TimelineContent>
            <QA
              option={'multiple'}
              question={"Vincent has a paper route. Each morning, he delivers 37 newspapers to customers in his neighborhood. It takes Vincent 50 minutes to deliver all the papers. If Vincent is sick or has other plans, his friend Thomas, who lives on the same street, will sometimes deliver the papers for him."}
              answers={[
                "Vincent and Thomas live in the same neighborhood",
                "It takes Thomas more than 50 minutes to deliver the papers",
                "It is dark outside when Vincent begins his deliveries",
                "Thomas would like to have his own paper route"]}/>

          </TimelineContent>

        </TimelineItem>

      </Timeline>
      <Stack className={'actions'} alignItems={'flex-end'}>
        <Pagination count={10} color="primary" />
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
    width: '74%',
    '.actions':{
      padding: 1,
      paddingRight: 2,
    },
    marginBottom: 5
  }
}