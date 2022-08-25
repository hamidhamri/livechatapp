import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import Cropper from "react-easy-crop";
import { Box } from "@mui/system";
import getCroppedImg from "../../utils/getCropImages";

const CropModal = ({
  imageToDisplay: PhotoURl,
  setOpenCrop,
  setImageToDisplay,
  setImageToUpload,
  setDimensions,
  sendImage,
  imageToUpload,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleOnClickCrop = async () => {
    try {
      const { url, file, height, width } = await getCroppedImg(
        PhotoURl,
        croppedAreaPixels,
        rotation
      );
      if (setDimensions) {
        setDimensions({ height, width });
      }
      setImageToUpload((prev) => {
        return {
          ...prev,
          file,
        };
      });

      if (setImageToDisplay) {
        setImageToDisplay(url);
      }
      setOpenCrop(false);
      if (sendImage) {
        sendImage({ type: imageToUpload.type, file: file });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <>
        <div className="bg-[#333]">
          <DialogContent
            dividers
            sx={{
              backgroundColor: "#333",
              position: "relative",
              height: 450,
              maxHeight: 570,
              minHeight: 250,

              width: "auto",
              minWidth: { sm: 500 },
            }}
          >
            <Cropper
              image={PhotoURl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={
                imageToUpload?.type === "profilePic"
                  ? 1
                  : imageToUpload?.type === "coverPic"
                  ? 470 / 250
                  : 4 / 5
              }
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            ></Cropper>
          </DialogContent>
          <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
            <Box sx={{ width: "100%", mb: 1 }}>
              <Typography sx={{ color: "white" }} variant="h5">
                Zoom: {zoomPercent(zoom)}
              </Typography>
              <Slider
                sx={{
                  color: "#FA872F",
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, value) => setZoom(value)}
              />
            </Box>
            <Box sx={{ width: "100%", mb: 1 }}>
              <Typography sx={{ color: "white" }} variant="h5">
                Rotation: {rotation}
              </Typography>
              <Slider
                sx={{
                  color: "#FA872F",
                }}
                valueLabelDisplay="auto"
                min={0}
                max={360}
                step={0.1}
                value={rotation}
                onChange={(e, value) => setRotation(value)}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                sx={{
                  backgroundColor: "#FA872F",
                  color: "white",
                  borderColor: "#FA872F",
                  "&:hover": {
                    backgroundColor: "#FA872F",
                    borderColor: "#FA872F",
                  },
                }}
                size="large"
                onClick={() => setOpenCrop(false)}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FA872F",
                  color: "white",
                  borderColor: "#FA872F",
                  "&:hover": {
                    backgroundColor: "#FA872F",
                    borderColor: "#FA872F",
                  },
                }}
                size="large"
                onClick={handleOnClickCrop}
                variant="contained"
              >
                Crop
              </Button>
            </Box>
          </DialogActions>
        </div>
      </>
    </>
  );
};

export default CropModal;

const zoomPercent = (zoom) => {
  return `${Math.round(zoom * 100)}%`;
};
