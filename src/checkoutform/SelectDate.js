import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import app from "../firebase";
import TableContainer from "@material-ui/core/TableContainer";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import TableRow from "@material-ui/core/TableRow";
import HelpIcon from "@material-ui/icons/Help";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ko");
moment.updateLocale("ko", { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableRow: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
    backgroundColor: "#0f4c8133",
    width: "30%",
  },
  tableCell: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
  },
  paper: {
    "@media (min-width: 600px)": {
      width: "70%",
    },
    width: "95%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 3),
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    fontFamily: ["Jua", '"sans-serif"'],
    marginTop: theme.spacing(0),
    fontSize: 16,
    marginBottom: theme.spacing(0),
    padding: "3%",
    paddingLeft: "5%",
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  modalTypography: {
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 24,
    margin: 20,
    textAlign: "center",
  },
  tableContainer: {
    maxHeight: 400,
  },
}));

const SelectDate = ({ camp, facility, save, isView }) => {
  const classes = useStyles();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [minTime, setMinTime] = React.useState(Date.now());
  const [maxTime, setMaxTime] = React.useState(Date.now());
  const [open, setOpen] = React.useState(false);
  const [reservationTitle, setReservationTitle] = React.useState("");
  const [reservationTitleError, setReservationTitleError] = React.useState("");
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(0);
  const [userData, setUserData] = React.useState({});
  const [userDataOpen, setUserDataOpen] = React.useState(false);
  const [uid, setUid] = React.useState("");
  const [overlappedSnack, setOverlappedSnack] = React.useState(false);

  React.useEffect(() => {
    fetchData(
      moment().startOf("isoWeek").toDate().getTime(),
      moment().endOf("isoWeek").toDate().getTime()
    );

    app.auth().onAuthStateChanged(async (user) => {
      if (user) setUid(user.uid);
    });

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
                uid: doc.data().uid,
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
    let overlapped = false;
    if (start.getTime() > moment().endOf("day").toDate().getTime()) {
      events.forEach((value) => {
        if (
          value.uid === uid &&
          value.start.getTime() >=
            moment(start).startOf("day").toDate().getTime() &&
          value.end.getTime() <= moment(end).endOf("day").toDate().getTime()
        )
          overlapped = true;
      });

      if (!overlapped) {
        setReservationTitleError("");
        setStart(start);
        setEnd(end);

        if (start.getDate() === end.getDate()) {
          if (count === 0) {
            setOpen(true);
          }
        }
      } else setOverlappedSnack(true);
    } else setSnackbarOpen(true);
  };

  const addReservationTitle = () => {
    if (reservationTitle !== "") {
      setEvents((oldArray) => [
        ...oldArray,
        { start, end, title: reservationTitle, uid },
      ]);
      save({ start: start, end: end, title: reservationTitle });
      setCount(1);
      setOpen(false);
    } else {
      setStart(0);
      setEnd(0);
      setReservationTitleError(1);
    }
  };

  const handleClose = () => {
    setReservationTitle("");
    setReservationTitleError("");
    setOpen(false);
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

  const doNothing = () => {};

  const clickEvent = async (event) => {
    await app
      .firestore()
      .collection("users")
      .where("uid", "==", event.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setUserData({
            ...doc.data(),
            title: event.title,
            start: event.start,
            end: event.end,
          });
        });
      });

    setUserDataOpen(true);
  };

  const closeUserData = () => {
    setUserDataOpen(false);
  };

  return (
    <div>
      <Calendar
        min={new Date(0, 0, 0, 7, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        onNavigate={onNavigate}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        onSelectSlot={isView ? doNothing : handleSelect}
        views={{ week: true, day: true }}
        onSelectEvent={(event) => clickEvent(event)}
      />

      <Snackbar
        autoHideDuration={1000}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        TransitionComponent={Slide}
        message="오늘로부터 하루지난 예약만 가능합니다."
      />
      <Snackbar
        autoHideDuration={1000}
        open={overlappedSnack}
        onClose={() => setOverlappedSnack(false)}
        TransitionComponent={Slide}
        message="해당일에 이미 예약을 하셨습니다."
      />

      {/* 예약현황에서 캘린더를 클릭하면 세부사항 보여주는 모달 */}
      <Modal
        className={classes.modal}
        open={userDataOpen}
        onClose={closeUserData}
        closeAfterTransition
      >
        <Slide direction="up" in={userDataOpen}>
          <div className={classes.paper}>
            <Container component="main" maxWidth="md">
              <Typography className={classes.modalTypography}>
                체육시설 예약 추가정보
              </Typography>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        예약명
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {userData.title}
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        예약자
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {userData.military +
                          " " +
                          userData.rank +
                          " " +
                          userData.name}
                      </TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        군번
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {userData.serialNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        시작시간
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {moment(userData.start).format("YYYY년M월D일 HH:mm")}
                      </TableCell>
                    </TableRow>
                    <TableRow key="5">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        종료시간
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {moment(userData.end).format("YYYY년M월D일 HH:mm")}
                      </TableCell>
                    </TableRow>
                    <TableRow key="6">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        예약한 체육시설
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {camp + " " + facility}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <span className={classes.buttons}>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">
                        수정을 원하실 경우 마이페이지의 내 예약 부분을
                        사용하십시오.
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>

                <Button
                  onClick={closeUserData}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  닫기
                </Button>
              </span>
            </Container>
          </div>
        </Slide>
      </Modal>

      {/* 시간 선택하고 예약명을 물을때 사용하는 모달 */}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Slide direction="up" in={open}>
          <div className={classes.paper}>
            <Container component="main" maxWidth="md">
              <Typography className={classes.modalTypography}>
                체육시설 예약 추가정보
              </Typography>
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table>
                  <TableBody>
                    <TableRow key="campName">
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableRow}
                      >
                        예약명
                      </TableCell>
                      <th>
                        <FormControl
                          fullWidth
                          error={reservationTitleError === "" ? false : true}
                        >
                          <Input
                            value={reservationTitle}
                            onChange={({ target: { value } }) =>
                              setReservationTitle(value)
                            }
                            type="text"
                            className={classes.textField}
                            placeholder="예약명을 입력해주십시오."
                          />
                        </FormControl>
                      </th>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <span className={classes.buttons}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  닫기
                </Button>
                <Button
                  onClick={addReservationTitle}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  추가
                </Button>
              </span>
            </Container>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default SelectDate;
