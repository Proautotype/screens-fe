import {SxProps, TextField, TextFieldVariants, Theme} from "@mui/material";

interface IProps {
    error: boolean
    value: string
    changeEvent: (value: string) => void
    onEnter?: () => void
    type?: string
    placeHolder?: string
    defaultValue?: string
    variant?: TextFieldVariants
    sx?: SxProps<Theme>
}

const CustomTextField = (props: IProps) => {

    return <TextField sx={props.sx}
                      defaultValue={props.defaultValue}
                      label={props.placeHolder}
                      helperText=""
                      variant={props.variant || "standard"}
                      error={props.error}
                      value={props.value}
                      type={props.type || "text"}
                      onChange={event => props.changeEvent(event.target.value)}
                      onKeyDown={(event) => {
                          if (event.code == "Enter") {
                              props.onEnter && props.onEnter();
                          }
                      }}
    />
}

export default CustomTextField;