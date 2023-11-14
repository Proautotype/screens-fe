import {Button, CircularProgress} from "@mui/material";
import colors from "../assets/colors/colors";

interface IProps{
  text: string,
  busy: boolean,
  height?: string | number,
  onAction?: ()=>void,
  disabled?: boolean,
  title?: string
}

const PrimaryButton = (props: IProps) => {
    return <Button
      disabled={props.disabled}
      aria-label={'sign in'}
      title={props.title}
      sx={{
          height:props.height || 50,
          backgroundColor:colors.primary,
          color: colors.plain,
          '&:hover':{
              backgroundColor:colors.primary
          }
      }}
      onClick={props.onAction}
    >
        {!props.busy && props.text} {props.busy && <CircularProgress color={'inherit'} size={15} sx={{marginLeft: 1}}/>}
    </Button>
}

export default PrimaryButton;