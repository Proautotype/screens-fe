import {ReactNode} from 'react';
import {Dialog, Stack, SxProps, Theme, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import colors from "../assets/colors/colors";

interface IProps {
  title: string,
  open: boolean,
  closeDialog: () => void,
  children: ReactNode
}

const CustomDialog = (props: IProps) => {

  return <Dialog open={props.open} sx={CustomDialogStyle}>
    <Stack className={'content'} gap={1} >
      <Stack className={'header'} direction={'row'} justifyContent={'space-between'}>
        <Typography>{props.title}</Typography>
        <Close cursor={'pointer'} onClick={props.closeDialog}>Close</Close>
      </Stack>
      {props.children}
    </Stack>
  </Dialog>
}

export default CustomDialog;

const CustomDialogStyle: SxProps<Theme> = {

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '.content': {
    padding: 1,
    minWidth: 350,
    minHeight: 100,
    '.header':{
      borderBottom:`1px dashed ${colors.primary}`
    }
  }
}