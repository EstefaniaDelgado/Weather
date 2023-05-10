import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const API_TIME= `https://timezoneapi.io/api/timezone/?$continent/country&token=${import.meta.env.VITE_TOKEN_TIME_API}`


export default function Clock({country}) {

    const[time, setTime]=useState("");


 useEffect(()=>{
    fetch(`https://timezoneapi.io/api/timezone/?${country}&token=${API_TIME}`)
    .then(res=> res.json())
    .then(data=>setTime(data.data.datetime.time))
 },[])


 
  return (
    <Box component="h5" sx={{display:"flex", flexDirection:"column", flexWrap:"wrap"}}>
      <Typography variant="h3">
       {time}
      </Typography>
    </Box>
  )
}
