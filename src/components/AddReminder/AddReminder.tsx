import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';
import { DialogActions, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DateTimePicker from 'react-datetime-picker';
import { Reminder } from '../../interfaces/reminders';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: '250px',
      marginTop: '10px',
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
    },
    closeButton: {
      position: 'absolute',
      right: '10px',
      top: '10px',
    },
    dialogActions: {
      display: 'flex',
      justifyContent: 'center',
    },
    subtitle: {
      color: '#1976d2',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    saveButton: {
      color: '#fff',
      marginRight: '3px',
    },
    infoText: {
      opacity: '0.7',
      marginTop: '10px',
    },
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onSave: (reminder: Reminder) => void;
  onClose: () => void;
}

const AddReminder = (props: Props) => {
  const { classes, isOpen, onClose, onSave } = props;

  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const handleChangeColor = (color) => {
    setColor(color.hex);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  // Dialog button actions

  const handleSave = () => {
    onSave({
      date,
      text,
      color,
    });

    handleClose();
  };

  const handleReset = () => {
    resetForm();
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const resetForm = () => {
    setDate(null);
    setText('');
    setColor('');
  };

  //   Validators

  const isFormFilled = () => {
    return !!date && !!text;
  };

  const isFormPristine = () => {
    return !!text || !!date || !!color;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      fullWidth={true}
      maxWidth='md'
    >
      <DialogTitle id='form-dialog-title'>
        Add Reminder
        <IconButton
          aria-label='Close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />

      <DialogContent className={classes.addReminderFormContainer}>
        <Typography variant='subtitle1' className={classes.subtitle}>
          Reminder:
        </Typography>
        <br />
        <TextField
          id='outlined-multiline-static'
          placeholder='Write your reminder here'
          value={text}
          onChange={handleTextChange}
          fullWidth
          inputProps={{
            maxLength: 30,
          }}
          style={{
            backgroundColor: color,
          }}
        />
        <small className={classes.infoText}>
          You can add up to 30 characters
        </small>
        <br />

        <Typography variant='subtitle1' className={classes.subtitle}>
          Select date:
        </Typography>
        <br />
        <DateTimePicker onChange={handleDateChange} value={date} />
        <br />

        <Typography variant='subtitle1' className={classes.subtitle}>
          Change text background:
        </Typography>
        <br />
        <SketchPicker color={color} onChangeComplete={handleChangeColor} />
        <br />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleSave}
          variant='contained'
          color='primary'
          disabled={!isFormFilled()}
        >
          Save
        </Button>

        <Button onClick={handleClose} variant='contained'>
          Cancel
        </Button>

        <Button
          onClick={handleReset}
          variant='contained'
          color='secondary'
          disabled={!isFormPristine()}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);
