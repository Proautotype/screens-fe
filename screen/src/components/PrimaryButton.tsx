import {Button, CircularProgress, SxProps, Theme} from "@mui/material";
import colors from "../assets/colors/colors";

interface IProps {
    text: string,
    busy: boolean,
    height?: string | number,
    onAction?: () => void,
    disabled?: boolean,
    title?: string
    sx?: SxProps<Theme>
}

const PrimaryButton = (props: IProps) => {
    return <Button
        disabled={props.disabled || props.busy}
        aria-label={'sign in'}
        title={props.title}
        sx={{
            height: props.height || 50,
            backgroundColor: colors.primary,
            color: colors.plain,
            '&:hover': {
                backgroundColor: colors.primary
            },
            ...props.sx
        }}
        onClick={!props.busy ? props.onAction : () => {
        }}
    >
        {!props.busy && props.text} {props.busy && <CircularProgress color={'inherit'} size={15} sx={{marginLeft: 1}}/>}
    </Button>
}

export default PrimaryButton;