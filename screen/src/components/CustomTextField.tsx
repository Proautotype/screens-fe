import {TextField} from "@mui/material";

interface IProps {
    error: boolean
    value: string
    changeEvent: (value: string)=> void
    type?: string
    placeHolder?: string
}

const CustomTextField = (props: IProps) => {

  return <TextField
    label={props.placeHolder}
    helperText=""
    variant="standard"
    error={props.error}
    value={props.value}
    type={props.type || "text"}
    onChange={event=>props.changeEvent(event.target.value)}
  />
}

export default CustomTextField;