import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  DialogActions,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from './redux/actions';

function FormFieldModal({ handleClose, open, updateFormFieldHandler }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.selectedFormField);

  const [fieldData, setFieldData] = useState({
    type: '',
    id: '',
    srNo: null,
    inputType: '',
    isTextArea: false,
    label: '',
    placeHolder: '',
    default: '',
    name: '',
    inputId: '',
    allowedRoles: [],
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setFieldData({
        type: data.type,
        id: data.id,
        srNo: data.srNo,
        inputType: data.inputType,
        isTextArea: data.isTextArea,
        label: data.label,
        placeHolder: data.placeHolder,
        default: data.default,
        name: data.name,
        inputId: data.inputId,
        allowedRoles: data.allowedRoles,
      });
    }
  }, [data]);

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(fieldData);

    dispatch(updateFormField(data.id, fieldData));
    handleClose();
    // updateFormFieldHandler();
  };
  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={(event, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        handleClose();
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Update Form</DialogTitle>
      <Box
        sx={{
          minWidth: {
            xs: '100%',
            md: '600px',
          },
          maxWidth: {
            xs: '100%',
            md: '750px',
          },
          height: '100%',
        }}
      >
        <Box
          component="form"
          role="form"
          onSubmit={submitHandler}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '380px',
          }}
        >
          <DialogContent>
            <DialogContentText>
              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label htmlFor="labelName">Label</label>
                <input
                  type="text"
                  id="labelName"
                  placeholder="label here"
                  name="labelName"
                  value={fieldData.label}
                  onChange={(e) => {
                    setFieldData((data) => ({
                      ...data,
                      label: e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label htmlFor="placeHolderName">Place Holder</label>
                <input
                  type="text"
                  id="placeHolderName"
                  placeholder="place holder here"
                  name="placeHolderName"
                  value={fieldData.placeHolder}
                  onChange={(e) => {
                    setFieldData((data) => ({
                      ...data,
                      placeHolder: e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label htmlFor="defaultValue">Default Value</label>
                <input
                  type="text"
                  id="defaultValue"
                  placeholder="place holder here"
                  name="defaultValue"
                  value={fieldData.default}
                  onChange={(e) => {
                    setFieldData((data) => ({
                      ...data,
                      default: e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                style={{
                  marginBottom: '1rem',
                }}
              >
                <label htmlFor="allowedRoles">Allowed Roles</label>
                <input
                  type="text"
                  id="allowedRoles"
                  disabled
                  value="admin, customer"
                  placeholder="place holder here"
                  name="allowedRoles"
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Save
            </Button>

            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => {
                {
                  handleClose();
                }
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
}

export default FormFieldModal;
