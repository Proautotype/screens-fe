import {Box, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, SxProps, Typography} from "@mui/material";
import colors from "../../../assets/colors/colors";
import Actions from "../../../utils/actions";
import {iQuestionBody} from "../../../utils/data";

interface IProps {
  questionBody: iQuestionBody
}

const QA = (props: IProps) => {
  //@ts-ignore

  return <Stack sx={QAStyle}>
    <Box className={'question'}>
      <Typography>{props.questionBody.question}</Typography>
    </Box>
    {props.questionBody.options === "single" && <RadioGroup id={'answers'} className={'answers'}>
      {Actions.Shuffle(props.questionBody.answers).map((answer, idx) =>
        <FormControlLabel key={answer + idx} sx={answerStyle}
                          control={<Radio/>}
                          value={answer}
                          label={answer}
        />
      )}

    </RadioGroup>}

    {props.questionBody.options === "multiple" && <RadioGroup id={'answers'} className={'answers'}>
      {Actions.Shuffle(props.questionBody.answers).map((answer, idx) =>
        <FormControlLabel key={answer + idx} sx={answerStyle}
                          control={<Checkbox/>}
                          value={answer}
                          label={answer}
        />
      )}

    </RadioGroup>}

    <Stack className={'actions'}>
      {/*<PrimaryButton text={"Next question"} busy={false}/>*/}
    </Stack>
  </Stack>
}

export default QA;

const QAStyle: SxProps = {
  borderRadius: 2,
  border: `1px solid ${colors.dark5}`,
  padding: 2,
  '.question': {
    borderRadius: 1,
    backgroundColor: colors.question,
    padding: 2
  },
  '.answers': {
    padding: 1,
    gap: 1
  },
  '.actions': {
    alignItems: 'flex-end',
    button: {
      width: 200,
      height: 40,
    }
  }
}

const answerStyle: SxProps = {
  backgroundColor: colors.questionOption,
  display: 'block',
  padding: 1,
  paddingLeft: 2,
  position: 'relative',
  cursor: 'pointer',
  '&.selected': {
    backgroundColor: colors.question,
    '.detail': {
      fontWeight: 'bold'
    },
    '&::before': {
      content: '""',
      width: 10,
      height: "100%",
      backgroundColor: colors.primary,
      position: 'absolute',
      left: 0,
      top: 0
    },
  },

}