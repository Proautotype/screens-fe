import react, {useEffect} from 'react';
import {CircularProgress, Stack} from "@mui/material";

interface IProps {
}

const Fallback = (props: IProps) => {
  useEffect(() => {
  }, [])
  return <Stack justifyContent={"center"} alignItems={"center"}>
      <CircularProgress />
  </Stack>
}

export default Fallback;