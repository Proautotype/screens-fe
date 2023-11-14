import {useEffect} from 'react';
import {Box, Stack, SxProps, Theme, Typography} from "@mui/material";
import profileImage from '../../assets/images/profileHero.jpeg'
import colors from "../../assets/colors/colors";

interface IProps {
}

const ProfileCard = (props: IProps) => {

  useEffect(() => {
  }, [])
  return <Stack sx={ProfileCardStyle} direction={"row"}
                justifyContent={"flex-start"} alignItems={"center"}>
    <Stack className={"imageCard"}>
      <Box className={'imgBox'}>
        <img alt={'profile'} src={profileImage}/>
      </Box>
      <Box className={'details'}>
        <Typography className={'pName'}>Ampomah, Winston</Typography>
        <Box>
          <Typography className={'cName'} component={'span'}>BTEC, Computer Science</Typography>
          <Typography className={'cLvl'} component={'span'}> Level: 100</Typography>
        </Box>
      </Box>
    </Stack>
  </Stack>
}

export default ProfileCard;


export const centerRow = (direction: string, extra?: SxProps<Theme>) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: direction || "row",
    ...extra
  }
}
//@ts-ignore
const ProfileCardStyle: SxProps<Theme> = {
  width: "100%",
  height: "15vh",
  '.imageCard': {
    ...centerRow("row"),
    height: "100%",
    width: "30%",
    paddingLeft: 1,
    backgroundColor: colors.dark5,
    justifyContent: "flex-start",
    '.imgBox': {
      width: "23%",
      height: "80%",
      border: `1px dashed ${colors.dark5}`,
      borderRadius: 3,
      ...centerRow("row",),
      marginRight: 1,
      img: {
        width: "95%",
        height: "95%",
        objectFit: "cover",
        borderRadius: 2,
      }
    }
  },
  '.details': {
    '.pName': {
      fontWeight: "bold"
    },
    '.cName': {
      fontWeight: "lighter",
      fontSize: "0.8em"
    },
    '.cLvl': {
      fontWeight: "lighter",
      fontSize: "0.8em"
    }
  }
}
