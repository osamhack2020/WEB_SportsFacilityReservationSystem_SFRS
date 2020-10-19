import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import app from "../firebase";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ko");
moment.updateLocale("ko", { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

const SelectDate = ({ camp, facility, save }) => {
  const [events, setEvents] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [minTime, setMinTime] = React.useState(Date.now());
  const [maxTime, setMaxTime] = React.useState(Date.now());

  React.useEffect(() => {
    fetchData(
      moment().startOf("isoWeek").toDate().getTime(),
      moment().endOf("isoWeek").toDate().getTime()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (startTime, endTime) => {
    if (minTime > startTime && maxTime < endTime) {
      app
        .firestore()
        .collection("camp")
        .doc(camp)
        .collection("facility")
        .doc(facility)
        .collection("reservation")
        .where("start", ">=", new Date(startTime))
        .where("start", "<=", new Date(endTime))
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setEvents((oldArray) => [
              ...oldArray,
              {
                start: doc.data().start.toDate(),
                end: doc.data().end.toDate(),
                title: doc.data().title,
              },
            ]);
          });
        });
      setMinTime(startTime);
      setMaxTime(endTime);
    } else if (minTime > startTime) {
      app
        .firestore()
        .collection("camp")
        .doc(camp)
        .collection("facility")
        .doc(facility)
        .collection("reservation")
        .where("start", ">=", new Date(startTime))
        .where("start", "<=", new Date(minTime))
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setEvents((oldArray) => [
              ...oldArray,
              {
                start: doc.data().start.toDate(),
                end: doc.data().end.toDate(),
                title: doc.data().title,
              },
            ]);
          });
        });
      setMinTime(startTime);
    } else if (maxTime < endTime) {
      app
        .firestore()
        .collection("camp")
        .doc(camp)
        .collection("facility")
        .doc(facility)
        .collection("reservation")
        .where("start", ">=", new Date(maxTime))
        .where("start", "<=", new Date(endTime))
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setEvents((oldArray) => [
              ...oldArray,
              {
                start: doc.data().start.toDate(),
                end: doc.data().end.toDate(),
                title: doc.data().title,
              },
            ]);
          });
        });
      setMaxTime(endTime);
    }
  };

  const handleSelect = async ({ start, end }) => {
    if (count === 0) {
      const title = window.prompt("예약목적을 작성해주십시오.");
      if (title) {
        await setEvents((oldArray) => [...oldArray, { start, end, title }]);
        save({ start: start, end: end, title: title });
        setCount(1);
      }
    }
  };

  const onNavigate = (date) => {
    // DAY:   from moment(date).startOf('day') to moment(date).endOf('day');
    // WEEK:  from moment(date).startOf('isoWeek') to moment(date).endOf('isoWeek');
    // MONTH: from moment(date).startOf('month').subtract(7, 'days') to moment(date).endOf('month').add(7, 'days');

    if (
      moment(date).startOf("isoWeek").toDate().getTime() < minTime ||
      moment(date).endOf("isoWeek").toDate().getTime() > maxTime
    )
      fetchData(
        moment(date).startOf("isoWeek").toDate().getTime(),
        moment(date).endOf("isoWeek").toDate().getTime()
      );
  };
  return (
    <div>
      <Calendar
        onNavigate={onNavigate}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        onSelectSlot={handleSelect}
        views={{ week: true, day: true }}
        onSelectEvent={(event) => alert(event.title)}
      />
    </div>
  );
};

export default SelectDate;
