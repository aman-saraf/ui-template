import { Typography } from "@mui/material"
import { NextPage } from "next"

export const HomePage: NextPage = () => {
  return <Typography variant="subtitle1" component={'h6'} className="text-secondary" > Hello World </Typography>
}

export default HomePage
