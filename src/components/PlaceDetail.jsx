import React, { useState } from "react"
import { MapPin, Star } from "react-feather"
import useMapContext from "../hooks/useMapContext"
import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { Add, Label, LabelOutlined, PlaceOutlined, StarHalf, StarOutline, StarRate, StarRateOutlined } from "@mui/icons-material"

function StarRating({quanity}) {
  console.log(quanity)
  if (quanity >= 0.8) {
    return <StarRate color="warning" fontSize="10" />
  }
  else if (quanity < 0.8 && quanity >= 0.3) {
    return <StarHalf color="warning" fontSize="10" />
  } 
  else return <StarOutline color="warning" fontSize="10" />
}

function Rating({rating}) {
  return (
    <Box sx={{display: "flex"}}>
      <StarRating quanity={rating - 0}/>
      <StarRating quanity={rating - 1}/>
      <StarRating quanity={rating - 2}/>
      <StarRating quanity={rating - 3}/>
      <StarRating quanity={rating - 4} />
    </Box>
  )
}

function PlaceInfoItem({ Icon, text }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 3,
      }}
    >
      <Icon color="primary" />
      <Typography sx={{ fontSize: "14px" }}>{text}</Typography>
    </Box>
  )
}

export default function PlaceDetail() {
  const [state, dispatch] = useMapContext()
  const [isReviewEdited, setIsReviewEdited] = useState(false)
  const currentPlace = state.place

  return (
    <div className="place-detail">
      <img
        className="place-img"
        src="https://lh5.googleusercontent.com/p/AF1QipOU9e4X3FkosaoNOeVXBonjHft_lfZIY9Wc_uSG=w683-h240-k-no"
      />

      <Box padding={2}>
        <Typography variant="h5">
          {currentPlace.name || currentPlace.formatted_address}
        </Typography>
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
          <Typography variant="caption">{currentPlace.types}</Typography>
          <Rating rating={3.7} />
        </Box>
      </Box>

      <hr />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <PlaceInfoItem
          Icon={PlaceOutlined}
          text={currentPlace.formatted_address}
        />
        <PlaceInfoItem Icon={Add} text={currentPlace.formatted_address} />
        <PlaceInfoItem
          Icon={LabelOutlined}
          text={"Label"}
        />
      </Box>

      {isReviewEdited && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Review</Typography>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-textarea"
            multiline
            rows={4}
          />
        </Box>
      )}

      {!isReviewEdited && (
        <Box padding={2}>
          <Button onClick={() => setIsReviewEdited(true)} variant="contained">
            Edit
          </Button>
        </Box>
      )}

      {isReviewEdited && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => setIsReviewEdited(false)} variant="secondary">
            Cancel
          </Button>
          <Button variant="contained">Save</Button>
        </Box>
      )}
    </div>
  )
}
