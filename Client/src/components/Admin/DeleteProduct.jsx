import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

const DeleteProduct = ({ open, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Відмінити
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProduct;
