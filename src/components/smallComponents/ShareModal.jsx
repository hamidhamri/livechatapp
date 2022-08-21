import React from "react";
import Modal from "@mui/material/Modal";
import PostCard from "./PostCard";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";

const ShareModal = ({ setOpen, open }) => {
  const handleClose = () => setOpen(false);

  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Modal
        sx={{ top: "10%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          sx={{
            backgroundColor: theme === "light" ? "#fff" : "#202124",
            p: 4,
            zIndex: "1",
            borderRadius: "20px",
          }}
          component="main"
          maxWidth="md"
        >
          <PostCard />
        </Container>
      </Modal>
    </>
  );
};

export default ShareModal;
