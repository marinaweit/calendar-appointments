import { connect } from 'react-redux';
import CalendarDay from './CalendarDay';
import { openAgenda } from '../../redux/actions';
import { Reminder } from '../../interfaces/reminders';
import { isSameDay } from 'date-fns';

interface Props {
  calendarDate: Date;
  dateObj: { date: Date };
}

interface State {
  reminders: { remindersArr: Reminder[] };
}

interface DateObj {
  date: Date;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  let reminders = state.reminders.remindersArr
    .filter((reminder) => isSameDay(reminder.date, ownProps.dateObj.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return { ...ownProps, reminders };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj));
    },
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;
