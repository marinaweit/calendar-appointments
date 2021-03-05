import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate } from 'date-fns';
import { Reminder } from '../../interfaces/reminders';
import { formatAMPM } from '../../utils/dateUtils';

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: 'flex',
      flex: '1 0 13%',
      flexDirection: 'column',
      border: '1px solid lightgray',
      cursor: 'pointer',
    },
    dayCellOutsideMonth: {
      display: 'flex',
      flex: '1 0 13%',
      flexDirection: 'column',
      border: '1px solid lightgray',
      backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
      cursor: 'pointer',
    },
    dateNumber: {
      margin: 5,
      height: '28px',
      width: '28px',
      fontSize: '0.85rem',
      color: '#000',
      backgroundColor: 'transparent',
    },
    todayAvatar: {
      margin: 5,
      height: '28px',
      width: '28px',
      fontSize: '0.85rem',
      color: '#fff',
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: '28px',
      width: '28px',
      fontSize: '0.85rem',
      color: '#000',
      backgroundColor: '#f1f1f1',
    },
    focusedTodayAvatar: {
      margin: 5,
      height: '28px',
      width: '28px',
      fontSize: '0.85rem',
      color: '#fff',
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: '100%',
    },
    reminderText: {
      marginTop: '10px',
      wordBreak: 'break-all',
    },
    reminderItem: {
      padding: '10px',
    },
    timeTitle: {
      color: '#1976d2',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    showMoreTitle: {
      color: '#1976d2',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      padding: '10px',
    },
  });

interface DateObj {
  date: Date;
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date;
  dateObj: DateObj;
  onDayClick: (dateObj: DateObj) => void;
  reminders: Reminder[];
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick, reminders } = props;
  const [focused, setFocused] = useState(false);

  const isToday = isSameDay(dateObj.date, new Date());
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {reminders.length !== 0 && (
          <div className={classes.reminderItem}>
            <div className={classes.timeTitle}>
              {formatAMPM(reminders[0].date)}
            </div>
            <div className={classes.reminderText}>{reminders[0].text}</div>
          </div>
        )}
        {reminders.length > 1 && (
          <div
            className={classes.showMoreTitle}
            onClick={() => onDayClick(dateObj)}
          >
            Show more...
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CalendarDay);
