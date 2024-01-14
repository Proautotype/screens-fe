import {
    Badge,
    Box,
    Button, Checkbox, Chip,
    debounce,
    Divider,
    Fab, FormControl,
    FormControlLabel, FormGroup, FormLabel, Radio,
    RadioGroup,
    Stack,
    SxProps,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import {
    Add,
    CheckCircle,
    Delete,
    HighlightOffOutlined,
    Remove
} from "@mui/icons-material";
import {ChangeEvent, SyntheticEvent, useEffect, useReducer, useRef, useState} from "react";
import colors from "../../assets/colors/colors";
import {generateUniqueId} from "../../utils/generateUniqueId";
import dayjs from "dayjs";
import {ExaminationSocket, SectionSocket} from "../../SocketManager";
import ExamService from "../../services/Exam.socket.service";

import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import CustomDialog from "../../components/CustomDialog";
import CustomTextField from "../../components/CustomTextField";
import PrimaryButton from "../../components/PrimaryButton";
import SectionSocketService from "../../services/Section.socket.service";
import SectionRestService from "../../services/Section.rest.service";
import {useDispatch, useSelector} from "react-redux";
import {
    createQuestionThunk,
    createSectionThunk,
    deleteQuestionThunk,
    getAssessmentThunk
} from "../../redux/Assessment/Assessment.thunk";
import {AppDispatch, ReduxRootState} from "../../redux/store";
import {
    iAnswer,
    iAssessmentPage,
    iExamination,
    iSection,
    iSingleQuestionProp
} from "../../types/interfaces.types";
import {isBooleanObject} from "node:util/types";


const Index = (props: { AssessmentID: string }) => {
    const reduxDispatch = useDispatch<AppDispatch>();
    const reduxData = useSelector<ReduxRootState, iExamination>((data) => data.assessment);

    type iAssessmentPageType =
        | { type: "changeTab"; value: iAssessmentPage['tab'] }
        | { type: "triggerAddSectionDialog"; value: iAssessmentPage['openCreateSectionDialog'] }
        | { type: "changeTitle"; value: iAssessmentPage['title'] }
        | { type: "changeStartTime"; value: iAssessmentPage['startTime'] }
        | { type: "changeEndTime"; value: iAssessmentPage['endTime'] }

    const initialState: iAssessmentPage = {
        tab: 0,
        openCreateSectionDialog: false,
        title: "",
        startTime: null,
        endTime: null
    }

    const examinationStateReducer = (
        prevState: iAssessmentPage,
        action: iAssessmentPageType
    ) => {
        switch (action.type) {
            case "changeTitle":
                return {...prevState, title: action.value}
            case "changeStartTime":
                return {...prevState, startTime: action.value}
            case "changeEndTime":
                return {...prevState, endTime: action.value}
            case "changeTab":
                return {...prevState, tab: action.value}
            case "triggerAddSectionDialog":
                return {...prevState, openCreateSectionDialog: action.value}
            default:
                throw new Error("Unknown action");
        }
    }

    const [examinationState, dispatch]
        = useReducer(examinationStateReducer, initialState);

    const changeSectionTab = (event: SyntheticEvent, newValue: number) => {
        dispatch({type: "changeTab", value: newValue});
    };
    //used to add a section to an exam
    const addSection = () => {
        TriggerSectionDialog(true);
    }

    function createExam() {
        ExamService.CreateExam({
            title: examinationState.title,
            ownerId: ExamService.GetLecturerID(),
            startTime: examinationState.startTime,
            endTime: examinationState.endTime
        })
    }

    const debounceTitle = debounce((newValue) => {
        UpdateTitle(newValue)
    }, 700);

    function UpdateTitle(newValue: string) {
        ExamService.UpdateTitle({
            examID: props.AssessmentID,
            title: newValue
        })
    }

    function StartDateChange(value: dayjs.Dayjs | null) {
        ExamService.UpdateStartDate({
            examID: props.AssessmentID,
            date: value
        });
    }

    function EndDateChange(value: dayjs.Dayjs | null) {
        ExamService.UpdateEndDate({
            examID: props.AssessmentID,
            date: value
        });
    }

    function TriggerSectionDialog(dialogTrigger: boolean) {
        dispatch({type: "triggerAddSectionDialog", value: dialogTrigger});
    }

    function addNewSection(section: iSection) {

    }

    //@ts-ignore
    useEffect(() => {
        ExaminationSocket.on('connect', () => {
            ExamService.setSocket(ExaminationSocket);
        })
        SectionSocket.on('connect', () => {
            SectionSocketService.setSocket(SectionSocket);
        })

        ExaminationSocket.connect();
        SectionSocket.connect();

    }, [])

    useEffect(() => {
        reduxDispatch(getAssessmentThunk(props.AssessmentID));
    }, [props.AssessmentID, reduxDispatch])

    return <Stack sx={IndexStyle}>
        <Stack>Navigation</Stack>
        <Divider/>
        <Button onClick={createExam}>Create Exam</Button>
        <Stack className={'examNav'} direction={'row'} gap={3}>
            <Stack>
                <TextField label={'Title'} variant={'outlined'} defaultValue={examinationState.title}
                           onChange={(e) => debounceTitle(e.currentTarget.value)
                           }/>
            </Stack>
            <Stack>
                <DateTimePicker label={'start time'} defaultValue={examinationState.startTime}
                                onAccept={StartDateChange}/>
            </Stack>
            <Stack>
                <DateTimePicker label={'end time'} defaultValue={examinationState.endTime} onAccept={EndDateChange}/>
            </Stack>
        </Stack>
        <Stack direction={'row'}>
            <Tabs value={examinationState.tab} onChange={changeSectionTab}
                  aria-label="select tab">
                {reduxData.sections &&
                    reduxData.sections.map((sec) => <Tab key={sec.id + dayjs().toString()} label={sec.name}/>)}
            </Tabs>
            <Fab onClick={addSection}><Add/></Fab>
        </Stack>

        <Stack className={'question-area'} justifyContent={"center"} alignItems={"center"}>
            {reduxData.sections &&
                <Section data={reduxData.sections[examinationState.tab]} examID={props.AssessmentID}/>}
        </Stack>

        <CustomDialog
            title={"Create Section"}
            open={examinationState.openCreateSectionDialog as boolean}
            closeDialog={() => TriggerSectionDialog(false)}
            children={<CreateSectionDialog
                examID={props.AssessmentID} addNewSection={addNewSection}/>}
        />
    </Stack>
}

const IndexStyle: SxProps = {
    width: '100vw',
    height: '100vh',
    '& .examNav': {
        padding: 1,
        backgroundColor: colors.primaryLight
    },
    '& .question-area': {}
}

export default Index;

const CreateSectionDialog = (props: {
    examID: string,
    addNewSection: (section: iSection) => void
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState<string>("Section ");
    const reduxData = useSelector<ReduxRootState, iExamination>((data) => data.assessment);
    const changeText = (value: string) => {
        setValue(value);
    }
    const onAction = async () => {
        dispatch(createSectionThunk({examID: props.examID, sectionName: value}));
    }
    return <Stack sx={{padding: 1}} gap={1}>
        <CustomTextField error={false} value={value} changeEvent={changeText} placeHolder={"New section"}/>
        <PrimaryButton text={"Create Section"} busy={reduxData.pending} onAction={onAction}/>
    </Stack>
}

const Section = (props: { data: iSection, examID: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [triggerAddQuestion, setTriggerAddQuestion] = useState<boolean>(false)
    if (props.data && props.data.id) {
        // service = new SectionRestService(props.data.id);
    }
    // console.dir(props.data)
    const onViewQuestion = () => {
        console.dir(props.data)
    }

    const AddNewQuestion = () => {
        setTriggerAddQuestion(true);
    }

    return <Stack sx={SectionStyle}>
        <Stack gap={2}>
            {
                props.data && props.data?.questions && props.data.questions.map((question
                ,idx) => (
                    <SingleQuestion key={question.id} sectionID={props.data.id} question={question} questionNumber={idx+1}/>
                ))
            }
            <Button onClick={AddNewQuestion}>Add New Question</Button>
        </Stack>
        <Button onClick={onViewQuestion}>
            View Question
        </Button>
        <CustomDialog title={"Create New Question"}
                      open={triggerAddQuestion}
                      closeDialog={() => setTriggerAddQuestion(false)}
                      children={
                          <CreateQuestionComponent sectionID={props.data && props.data.id}/>
                      }/>
    </Stack>
}

const SectionStyle: SxProps = {
    marginTop: 1,
    width: "80%"
}

export interface iCreateQuestion {
    //true for mcq false for written
    questionType: boolean,
    // true for select false for optional
    answerType: boolean
    choices: iChoice[],
    choice: iChoice
    question: string
    sectionID: string
}

interface iChoice {
    id: string,
    value: string
    selected: boolean
}

type iCreateQuestionType =
    | { type: "changeQuestionType", value: iCreateQuestion["questionType"] }
    | { type: "changeAnswerType", value: iCreateQuestion["answerType"] }
    | { type: "changeChoice", value: iCreateQuestion["choice"] }
    | { type: "changeQuestion", value: iCreateQuestion["question"] }
    | { type: "updateChoices", value: iCreateQuestion["choice"] }
    | { type: "updateSingleChoice", value: iChoice }
    | { type: "deleteSingleChoice", value: string }
    | { type: "changeSingleChoiceSelection", value: iChoice }
    | { type: "changeMultipleChoiceSelection", value: { old: iChoice, checked: boolean } }

const CreateQuestionComponent = (props: { sectionID: string }) => {

    const actionInitState: iCreateQuestion = {
        questionType: true,
        answerType: true,
        choices: [],
        choice: {id: "", value: "", selected: false},
        question: "",
        sectionID: props.sectionID
    }
    const actionStateReducer = (prevState: iCreateQuestion, action: iCreateQuestionType) => {
        switch (action.type) {
            case "changeQuestion":
                return {...prevState, question: action.value}
            case "changeQuestionType":
                return {...prevState, questionType: action.value}
            case "changeAnswerType":
                return {...prevState, answerType: action.value}
            case "changeChoice":
                return {...prevState, choice: action.value}
            case "updateChoices":
                return {...prevState, choices: [...prevState.choices, action.value]}
            case "updateSingleChoice":
                const updateIdx = prevState.choices.findIndex((choi) => choi.id === action.value.id);
                if (updateIdx != -1) {
                    const update = [...prevState.choices];
                    update[updateIdx].value = action.value.value;
                    return {...prevState, choices: [...update]}
                }
                return {...prevState};
            case "deleteSingleChoice":
                const deleteIdx = prevState.choices.findIndex((choi) => choi.id === action.value);
                if (deleteIdx != -1) {
                    const update = [...prevState.choices].filter((choice) => choice.id !== action.value);
                    return {...prevState, choices: [...update]}
                }
                return {...prevState}
            case "changeSingleChoiceSelection":
                return {
                    ...prevState, choices: [...prevState.choices].map((choice) => {
                        choice.selected = choice.value.localeCompare(action.value.value) === 0
                        return choice;
                    })
                }
            case "changeMultipleChoiceSelection":
                return {
                    ...prevState, choices: [...prevState.choices].map((choice) => {
                        const selectedIdx = choice.id.localeCompare(action.value.old.id) === 0;
                        if (selectedIdx) {
                            choice.selected = action.value.checked
                        }
                        return choice;
                    })
                }
        }
    }

    const [actionsState, dispatch] = useReducer(actionStateReducer, actionInitState);
    const reduxDispatch = useDispatch<AppDispatch>();
    const reduxData = useSelector<ReduxRootState, iExamination>((data) => data.assessment);

    const changeAnswer = (value: string) => {
        dispatch({
            type: "changeChoice", value: {
                id: generateUniqueId(),
                value: value,
                selected: false
            }
        })
    }
    const changeQuestion = (value: string) => {
        dispatch({type: "changeQuestion", value})
    }
    const changeSingleChoice = (value: iChoice) => {
        dispatch({type: "updateSingleChoice", value: value})
    }
    const changeSingleChoiceSelection = (identifier: iChoice) => {
        dispatch({type: "changeSingleChoiceSelection", value: identifier});
    }

    const changeMultipleChoiceSelection = (data: iChoice, checked: boolean) => {
        dispatch({
            type: "changeMultipleChoiceSelection", value: {
                old: data,
                checked
            }
        });
    }

    const changeDebounceAnswer = debounce((value) => changeAnswer(value), 40);
    const changeDebounceQuestion = debounce((value) => changeQuestion(value), 40);
    const actClearChoice = () => dispatch({type: "changeChoice", value: {id: "", value: "", selected: false}});
    const actDeleteChoice = (id: string) => dispatch({type: "deleteSingleChoice", value: id});

    const actAddChoice = () => {
        if (actionsState.choice.value.length > 0) {
            dispatch({type: "updateChoices", value: actionsState.choice})
            setTimeout(() => actClearChoice(), 300)
        }
    };

    const actFinish = () => {
        // console.log(actionsState)
        // return;
        reduxDispatch(createQuestionThunk({
            data: actionsState, sectionID: props.sectionID
        }));
    }
    return <Stack gap={1}>
        <FormControl>
            <FormLabel id="demo-form-control-label-placement">Question Type</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="true"
                name="radio-buttons-group"
                row
                onChange={(e, value) => {
                    dispatch({type: "changeQuestionType", value: (JSON.parse(value) as boolean)})
                }}
            >
                <FormControlLabel value="true" control={<Radio/>} label="Objective"/>
                <FormControlLabel value="false" control={<Radio/>} label="Written"/>
            </RadioGroup>
        </FormControl>
        <textarea style={{padding: 5, resize: "none"}} rows={5} cols={20} onChange={(event) => {
            changeDebounceQuestion(event.currentTarget.value)
        }} defaultValue={actionsState.question} placeholder={"Write your question"}/>
        {!actionsState.questionType && <FormControl>
            <FormLabel id="demo-form-control-label-placement">Provided answer</FormLabel>
            <textarea style={{padding: 5, resize: "none"}} rows={10} cols={20} onChange={(event) => {
                changeDebounceQuestion(event.currentTarget.value)
            }} defaultValue={actionsState.question} placeholder={"State the answer"}/>
        </FormControl>}
        {actionsState.questionType && <FormControl>
            <FormLabel id="demo-form-control-label-placement">Answer Type</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="true"
                name="radio-buttons-group"
                row
                onChange={(e, value) => {
                    dispatch({type: "changeAnswerType", value: JSON.parse(value) as boolean})
                }}
            >
                <FormControlLabel value="true" control={<Radio/>} label="Single Choice"/>
                <FormControlLabel value="false" control={<Radio/>} label="Multiple Choice"/>
            </RadioGroup>
        </FormControl>}

        {actionsState.questionType && <FormControl>
            <FormLabel id={"questions answers choices"}>Choices</FormLabel>
            <RadioGroup onChange={(event, value) => {

            }}>
                {actionsState.choices.length > 0 && actionsState.choices.map((choice, idx) => {
                    return <FormControlLabel key={idx + choice.id} value={choice.value}
                                             control={actionsState.answerType ?
                                                 <Radio
                                                    onChange={(event, checked)=>{
                                                        changeSingleChoiceSelection(choice);
                                                    }}
                                                 /> : <Checkbox
                                                     onChange={(event, checked) => changeMultipleChoiceSelection(choice, checked)}/>}
                                             label={
                                                 <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                     <CustomTextField error={false} value={choice.value}
                                                                      changeEvent={(oldValue) => {
                                                                          changeSingleChoice({
                                                                              id: choice.id,
                                                                              value: oldValue,
                                                                              selected: choice.selected
                                                                          })
                                                                      }} variant={"standard"}
                                                                      sx={{
                                                                          width: "280px"
                                                                      }}
                                                     />
                                                     <Button onClick={() => actDeleteChoice(choice.id)}>
                                                         <Delete color={"error"}/>
                                                     </Button>
                                                 </Box>
                                             }/>;
                })}
            </RadioGroup>
            <Divider/>
            <Stack marginBottom={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <CustomTextField
                    error={false} value={actionsState.choice.value}
                    placeHolder={"Input a new choice"}
                    changeEvent={changeDebounceAnswer}
                    onEnter={actAddChoice}
                    sx={{
                        width: "100%",
                    }}
                />
                <PrimaryButton
                    text={"Add"} busy={reduxData.pending} onAction={actAddChoice}
                    sx={{
                        height: 35, width: 20, backgroundColor: "lightblue",
                        ":hover": {
                            backgroundColor: "#00e8fd"
                        }
                    }}
                />
            </Stack>

        </FormControl>}
        <Divider/>
        <PrimaryButton text={"Finish"} busy={reduxData.pending} onAction={actFinish}/>
    </Stack>;
}

const SingleQuestion = (prop: iSingleQuestionProp) => {

    const reduxDispatch = useDispatch<AppDispatch>();

    const typeNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        // data.current.newAnswer = e.currentTarget.value;
    }

    const appendNewAnswer = () => {

    }

    const removeAnswer = (old: string, existingAnswer: iAnswer) => {
        // prop.removeSingleAnswer(old, existingAnswer);
    }

    const onChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // prop.addQuestion(prop.questionID, e.currentTarget.value);
    }

    const updateAnswer = (oldQuestionID: string, newValue: string) => {
        // prop.updateSingleAnswer(prop.questionID, {id: oldQuestionID, value: newValue})
        // prop.removeQuestion(prop.questionID)
    }

    const actDeleteQuestion = (questionID: string) => {
        reduxDispatch(deleteQuestionThunk(questionID));
    }
    useEffect(() => {
        // console.log(prop.question.answer)
    }, [])
    return <Stack sx={QuestionStyle}>
        <Stack className={'action-group'} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Chip label={prop.questionNumber} variant="filled" />
            <Box>
                <FormControlLabel control={<Checkbox/>} label={"Edit"}/>
                <Button color={"error"} onClick={()=> actDeleteQuestion(prop.question.id)}>Delete</Button>
            </Box>
        </Stack>
        <Divider/>
        <textarea rows={5} cols={20} onChange={onChangeQuestion} defaultValue={prop.question.question}
                  style={{resize: "none"}}/>
        <Divider/>
        <Stack gap={1} className={'answers-container'}>
            {prop.question.answer
                && prop.question.answer.length > 0
                && prop.question.answer.map((answer, idx) =>
                    <Stack gap={1}
                           key={answer.data + idx + dayjs().toString()}
                           className={'single-answer-strip'}
                           direction={"row"}
                           alignItems={"center"} justifyContent={"flex-start"}
                    >
                        <Box className={'isCorrect'}>
                            {answer.isCorrect ?  <CheckCircle color={"success"}/> : <HighlightOffOutlined color={"error"}/>}
                        </Box>
                        <input placeholder={'an answer'} defaultValue={answer.data}
                               onChange={(e) => updateAnswer(answer.id, e.target.value)}/>
                        <FormControlLabel className={'action-group'}
                            control={  <Checkbox title={"Enable Editing"} />}
                            label={"Edit"}
                        />
                    </Stack>)}
        </Stack>

    </Stack>
}
const QuestionStyle: SxProps = {
    gap: 1,
    border: "1px solid dark",
    boxShadow: "0px 0px 5px #e5e3e3",
    borderRadius: 2,
    padding: 2,
    textArea: {
        border: "2px solid #e5e3e3",
        outline: "none",
        borderRadius: 2,
        padding:1
    },
    '.answers-container': {
        padding: '5px 2px',
        '.single-answer-strip': {
            backgroundColor: 'rgba(229,227,227,0.3)',
            borderRadius: 2,
            position: "relative",
            paddingLeft:1,
            padding:1,
            '.isCorrect':{
                '&:hover':{
                    cursor:"pointer"
                }
            },
            input: {
                width: "85%",
                borderRadius: 2,
                border:"none",
                outline:"none",
                background:"none",
                paddingLeft:1
            },
            '.action-group': {
                position: "absolute",
                right: 0
            }
        }
    }
}
const WrittenQuestion = (prop: iSingleQuestionProp) => {
    const [answers, setAnswers] = useState<iAnswer[]>([]);
    const data = useRef<{ newAnswer: string }>({newAnswer: ""});

    const typeNewAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        data.current.newAnswer = e.currentTarget.value;
    }

    const appendNewAnswer = () => {
        const newAnswerData = {id: generateUniqueId(), data: data.current?.newAnswer};
        if (!data.current?.newAnswer) return;
        // setAnswers((prev) => [...prev, newAnswerData])
        // prop.addSingleAnswer(prop.questionID, newAnswerData);
        data.current.newAnswer = "";
    }

    const removeAnswer = (old: string, existingAnswer: iAnswer) => {
        // prop.removeSingleAnswer(old, existingAnswer);
        const previous = answers.filter(value => value.data !== existingAnswer.data);
        setAnswers(previous);
    }

    const onChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // prop.addQuestion(prop.questionID, e.currentTarget.value);
    }

    const updateAnswer = (oldQuestionID: string, newValue: string) => {
        // prop.updateSingleAnswer(prop.questionID, {id: oldQuestionID, value: newValue})
        // prop.removeQuestion(prop.questionID)
    }
    useEffect(() => {
        // console.log(prop.question.answer)
    }, [])
    return <Stack>
        <Button onClick={() => {
        }}> <Remove/></Button>
        <textarea rows={3} cols={20} onChange={onChangeQuestion} defaultValue={prop.question.question}/>
        <Stack>
            {prop.question.answer
                && prop.question.answer.length > 0
                && prop.question.answer.map((answer, idx) =>
                    <Stack gap={1}
                           key={answer.data + idx + dayjs().toString()}>
                        <Box>
                            <Button sx={{
                                display: 'inline',
                                padding: 0,
                                backgroundColor: colors.dark5
                            }}
                                    onClick={() => removeAnswer(prop.question.id, answer)}
                            >
                                <Remove/>
                            </Button>
                            <input placeholder={'an answer'} defaultValue={answer.data}
                                   onChange={(e) => updateAnswer(answer.id, e.target.value)}/>
                        </Box>
                    </Stack>)}
        </Stack>

    </Stack>
}