import { Box, Typography, Paper, Avatar } from "@mui/material"
import React from "react"
import useMapContext from "../hooks/useMapContext"
import { CHANGE_FOCUS_PLACE } from "../store/constant"

function PlaceSummaryItem({place}) {
  const [state, dispatch] = useMapContext()
  function handleClick() {
    dispatch({
      type: CHANGE_FOCUS_PLACE,
      data: place
    })
  }

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
        "&:hover": {
          bgcolor: "whitesmoke",
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      <Avatar
        sx={{ width: 50, height: 50 }}
        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: 15 }} variant="h6">{
          place.name ?? place.formatted_address
        }</Typography>
        <Typography sx={{ fontSize: 11 }} variant="caption">{
          place.formatted_address
        }</Typography>
      </Box>
    </Paper>
  )
}

export default function PlaceSumary() {
  const [state, dispatch] = useMapContext()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        marginTop: "55px",
        padding: "16px",
      }}
    >
      {
        state.pinnedPlaces.map((place, idx) => <PlaceSummaryItem key={idx} place={place} />)
      }
    </Box>
  )
}
