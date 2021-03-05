import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda } from '../../redux/actions';
import { Reminder } from '../../interfaces/reminders';
import * as dateFns from 'date-fns';

interface Props {}

interface State {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  reminders: { remindersArr: Reminder[] };
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus } = state;
  const reminders = state.reminders.remindersArr
    .filter((reminder) => dateFns.isSameDay(reminder.date, agendaStatus.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return { agendaStatus, reminders };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda());
    },
  };
};

const AgendaDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDay);

export default AgendaDayContainer;
