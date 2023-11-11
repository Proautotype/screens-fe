import react, {useEffect} from 'react';
import {Stack, Typography} from "@mui/material";
import {Battery0BarOutlined} from "@mui/icons-material";

interface IProps {
}

const ErrorPage = (props: IProps) => {
  useEffect(() => {
  }, [])
  return <Stack sx={{
    fontSize:"5rem",
    height:"100vh",
    width:"100vw"
  }} justifyContent={"center"} alignItems={"center"}>
    <Stack>
      <Typography fontSize={90}>404</Typography>
      <Typography>Something went wrong</Typography>
    </Stack>
  </Stack>
}

export default ErrorPage;