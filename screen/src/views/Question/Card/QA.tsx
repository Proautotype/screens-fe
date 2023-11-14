import {Box, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, SxProps, Typography} from "@mui/material";
import colors from "../../../assets/colors/colors";
import Actions from "../../../utils/actions";
import PrimaryButton from "../../../components/PrimaryButton";

interface IProps {
  question: string,
  option: 'optional' | 'multiple'
  answers: string[]
}

const QA = (props: IProps) => {
  //@ts-ignore
  const selectAnswer = (e: MouseEvent<HTMLDivElement>, selected: number) => {
    const answers = document.getElementById('answers');
    const selectedItem = answers?.getElementsByClassName('selected');
    if (selectedItem && selectedItem.length > 0) {
      selectedItem[0].classList.remove('selected');
    }
    //@ts-ignore
    e.currentTarget.classList.add('selected');
  }
  return <Stack sx={QAStyle}>
    <Box className={'question'}>
      <Typography>{props.question}</Typography>
    </Box>
    {props.option === "optional" && <RadioGroup id={'answers'} className={'answers'}>
      {Actions.Shuffle(props.answers).map((answer, idx) =>
        <FormControlLabel key={answer + idx} sx={answerStyle}
                          control={<Radio/>}
                          value={answer}
                          label={answer}
        />
      )}

    </RadioGroup>}

    {props.option === "multiple" && <RadioGroup id={'answers'} className={'answers'}>
      {Actions.Shuffle(props.answers).map((answer, idx) =>
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