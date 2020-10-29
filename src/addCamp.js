import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import app from "./firebase";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
import TableBody from "@material-ui/core/TableBody";
import Select from "@material-ui/core/Select";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafa",
    width: 500,
  },
  navigationStyle: {
    "&$navigationSelected": {
      marginTop: "10px",
      fontSize: "14px",
      fontFamily: ["Jua", '"sans-serif"'],
    },
    fontSize: "14px",
    marginTop: "10px",
    fontFamily: ["Jua", '"sans-serif"'],
  },
  navigationSelected: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    paddingTop: "22px",
    paddingBottom: "10px",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
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
  tableCell: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
  },
  tableRow: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
    backgroundColor: "#0f4c8133",
    width: "26%",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 10,
    padding: "4px 2%",
    justifyContent: "flex-end",
    display: "flex",
  },
  breadcrumbsTypography: {
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 12,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(7, 0, 10),
  },
  typography: {
    fontFamily: ["Jua", '"sans-serif"'],
  },
  noPending: {
    paddingLeft: "5%",
    fontSize: "18px",
    fontFamily: ["Jua", '"sans-serif"'],
  },
  modalTypography: {
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  cardButton: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  realRoot: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  tableContainer: {
    maxHeight: 400,
  },
}));

const AddCamp = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const [camps, setCamps] = React.useState([]);
  const [selectedMyCamp, setSelectedMyCamp] = React.useState([]);
  const [authUserId, setAuthUserId] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [choosedCamp, setChoosedCamp] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openProgress, setOpenProgress] = React.useState(false);
  const [campName, setCampName] = React.useState("");
  const [inputFields, setInputFields] = React.useState([
    { facility: "", location: "" },
  ]);
  const [campNameError, setCampNameError] = React.useState("");
  const [facilityError, setFacilityError] = React.useState([
    { facility: "", location: "" },
  ]);
  const [snackBar, setSnackBar] = React.useState(false);
  const [pendingCamps, setPendingCamps] = React.useState([]);
  const handleAddFields = () => {
    setInputFields((oldArray) => [...oldArray, { facility: "", location: "" }]);
    setFacilityError((oldArray) => [
      ...oldArray,
      { facility: "", location: "" },
    ]);
  };
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const handleInputChange = (index, value, location) => {
    const values = [...inputFields];
    if (location === 0) values[index].facility = value;
    else values[index].location = value;
    setInputFields(values);
  };
  const [tournamentModal, setTournamentModal] = React.useState(false);
  const [tournamentCamp, setTournamentCamp] = React.useState("");
  const [tournamentName, setTournamentName] = React.useState("");
  const [tournamentNameError, setTournamentNameError] = React.useState(false);
  const [
    tournamentEnrollNumberError,
    setTournamentEnrollNumberError,
  ] = React.useState(false);
  const [tournamentEnrollNumber, setTournamentEnrollNumber] = React.useState(0);
  const [tournamentSnackbar, setTournamentSnackbar] = React.useState(false);

  const addCamp = async () => {
    setOpenProgress(true);
    setCampNameError("");
    for (let i = 0; i < inputFields.length; i++) {
      const values = [...facilityError];
      values[i].facility = "";
      values[i].location = "";
      setFacilityError(values);
    }
    setTimeout(() => {
      setOpenProgress(false);
    }, 400);

    if (campName === "") {
      setCampNameError(1);
      return;
    } else {
      for (let i = 0; i < inputFields.length; i++) {
        const values = [...facilityError];
        if (inputFields[i].facility === "") {
          values[i].facility = "error";
          return;
        } else if (inputFields[i].location === "") {
          values[i].location = "error";
          return;
        }
        setFacilityError(values);
      }
    }

    await app
      .firestore()
      .collection("pendingApproval")
      .doc(campName)
      .set({ uid: authUserId });

    for (let i = 0; i < inputFields.length; i++) {
      await app
        .firestore()
        .collection("pendingApproval")
        .doc(campName)
        .collection("facility")
        .doc(inputFields[i].facility)
        .set({ location: inputFields[i].location });
    }

    setPendingCamps((oldArray) => [...oldArray, campName]);

    setSnackBar(true);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const modalClose = () => {
    setOpenModal(false);
    setChoosedCamp("");
    setSelectedMyCamp([]);
  };

  const handleClose = () => {
    setOpen(false);
    setChoosedCamp("");
    setCampName("");
    setInputFields([{ facility: "", location: "" }]);
    // setFacilityError([{ facility: "", location: "" }]);
    setSelectedMyCamp([]);
    setCampNameError("");
    for (let i = 0; i < inputFields.length; i++) {
      const values = [...facilityError];
      values[i].facility = "";
      values[i].location = "";
      setFacilityError(values);
    }
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setAuthUserId(user.uid);

        await app
          .firestore()
          .collection("camp")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              setCamps((oldArray) => [...oldArray, doc.id]);
            });
          });

        await app
          .firestore()
          .collection("pendingApproval")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach(async (doc) => {
              setPendingCamps((oldArray) => [...oldArray, doc.id]);
            });
          });
      }
    });
  }, []);

  const showFacility = (camp) => {
    setOpenModal(true);
    setChoosedCamp(camp);
    app
      .firestore()
      .collection("camp")
      .doc(camp)
      .collection("facility")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setSelectedMyCamp((oldArray) => [
            ...oldArray,
            { facility: doc.id, location: doc.data().location },
          ]);
        });
      });
  };

  const modifyPendingCamp = async (camp) => {
    setOpenModal(false);
    setOpen(true);
    setInputFields([]);
    setFacilityError([]);

    // await db.collection("pendingApproval").doc(camp).delete();
    setCampName(camp);

    await app
      .firestore()
      .collection("pendingApproval")
      .doc(camp)
      .collection("facility")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("hello");
          setInputFields((oldArray) => [
            ...oldArray,
            { facility: doc.id, location: doc.data().location },
          ]);

          setFacilityError((oldArray) => [
            ...oldArray,
            { facility: "", location: "" },
          ]);
        });
      });

    console.log(facilityError);
  };

  const showPendingFacility = (camp) => {
    setOpenModal(true);
    setChoosedCamp(camp);
    app
      .firestore()
      .collection("pendingApproval")
      .doc(camp)
      .collection("facility")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setSelectedMyCamp((oldArray) => [
            ...oldArray,
            { facility: doc.id, location: doc.data().location },
          ]);
        });
      });
  };

  const createTournament = (camp) => {
    setTournamentCamp(camp);
    setTournamentModal(true);
  };

  const tournamentClose = () => {
    setTournamentEnrollNumber(0);
    setTournamentCamp("");
    setTournamentName("");
    setTournamentModal(false);
  };

  const addTournament = async () => {
    setOpenProgress(true);
    setTournamentNameError(false);

    if (tournamentName === "") {
      setTournamentNameError(true);
      return;
    } else if (tournamentEnrollNumber === 0) {
      setTournamentEnrollNumberError(true);
      return;
    }

    setTimeout(() => {
      setOpenProgress(false);
    }, 400);

    await app
      .firestore()
      .collection("tournament")
      .doc(tournamentName)
      .set({ camp: tournamentCamp, enrollNumber: tournamentEnrollNumber });

    setTournamentSnackbar(true);
    setTimeout(() => {
      eraseTournament();
    }, 1500);
  };

  const eraseTournament = () => {
    setTournamentModal(false);
    setTournamentEnrollNumberError(false);
    setTournamentNameError(false);
    setTournamentCamp("");
    setTournamentEnrollNumber(0);
    setTournamentName("");
  };

  return (
    <React.Fragment>
      <div className={classes.realRoot}>
        <CssBaseline />
        <main>
          <Breadcrumbs className={classes.breadcrumbs}>
            <Typography
              color="textPrimary"
              className={classes.breadcrumbsTypography}
            >
              HOME
            </Typography>
            <Typography
              color="textPrimary"
              className={classes.breadcrumbsTypography}
            >
              관리자페이지
            </Typography>
            <Typography
              color="textPrimary"
              className={classes.breadcrumbsTypography}
            >
              부대 관리
            </Typography>
          </Breadcrumbs>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                className={classes.typography}
              >
                부대 관리
              </Typography>
            </Container>
          </div>
          <div>
            <Container>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                  >
                    <BottomNavigationAction
                      classes={{
                        label: classes.navigationStyle,
                        selected: classes.navigationSelected,
                      }}
                      label="내가 추가한 부대"
                      value="1"
                      icon={<AddToQueueIcon />}
                    />
                    <BottomNavigationAction
                      classes={{
                        label: classes.navigationStyle,
                        selected: classes.navigationSelected,
                      }}
                      label="승인 대기중인 부대"
                      value="2"
                      icon={<HourglassEmptyIcon />}
                    />
                  </BottomNavigation>
                </Grid>
              </div>
            </Container>
          </div>
          {value === "1" ? (
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {camps.map((camp) => (
                  <Grid item key={camp} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={classes.typography}
                        >
                          {camp}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardButton}>
                        <Button
                          color="primary"
                          onClick={() => showFacility(camp)}
                        >
                          자세히
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => createTournament(camp)}
                        >
                          체육대회 개최
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}

                <Modal
                  id="tournament"
                  className={classes.modal}
                  open={tournamentModal}
                  onClose={tournamentClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Slide direction="up" in={tournamentModal}>
                    <div className={classes.paper}>
                      <Container component="main" maxWidth="md">
                        <Typography className={classes.modalTypography}>
                          체육대회 만들기
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
                                  체육대회명
                                </TableCell>
                                <th>
                                  <FormControl
                                    fullWidth
                                    error={tournamentNameError}
                                  >
                                    <Input
                                      value={tournamentName}
                                      onChange={({ target: { value } }) =>
                                        setTournamentName(value)
                                      }
                                      type="text"
                                      className={classes.textField}
                                      placeholder="체육대회명을 입력해주십시오."
                                    />
                                  </FormControl>
                                </th>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  className={classes.tableRow}
                                >
                                  체육대회 개최 부대
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableCell}
                                >
                                  {tournamentCamp}
                                </TableCell>
                              </TableRow>

                              <TableRow key="campName">
                                <TableCell
                                  component="th"
                                  scope="row"
                                  className={classes.tableRow}
                                >
                                  체육대회 참가팀 수
                                </TableCell>
                                <FormControl
                                  required
                                  variant="outlined"
                                  className={classes.formControl}
                                  fullWidth
                                  error={tournamentEnrollNumberError}
                                >
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    참가팀 수 선택
                                  </InputLabel>
                                  <Select
                                    value={tournamentEnrollNumber}
                                    onChange={({ target: { value } }) =>
                                      setTournamentEnrollNumber(value)
                                    }
                                    label="참가팀 수 선택"
                                  >
                                    <MenuItem value="8">8</MenuItem>
                                    <MenuItem value="16">16</MenuItem>
                                    <MenuItem value="32">32</MenuItem>
                                    <MenuItem value="64">64</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <span className={classes.buttons}>
                          <Button
                            onClick={tournamentClose}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                          >
                            닫기
                          </Button>
                          <Button
                            onClick={addTournament}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            확인
                          </Button>
                          <Snackbar
                            autoHideDuration={2000}
                            open={tournamentSnackbar}
                            onClose={() => setTournamentSnackbar(false)}
                            TransitionComponent={Slide}
                            message="체육대회를 개최하였습니다."
                          />
                        </span>
                      </Container>
                    </div>
                  </Slide>
                </Modal>

                <Modal
                  id="showFacility"
                  className={classes.modal}
                  open={openModal}
                  onClose={modalClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Slide direction="up" in={openModal}>
                    <div className={classes.paper}>
                      <Container component="main" maxWidth="md">
                        <Typography className={classes.modalTypography}>
                          상세보기
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
                                  부대명
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableCell}
                                >
                                  {choosedCamp}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableCell}
                                ></TableCell>
                              </TableRow>

                              {selectedMyCamp.map((input, index) => (
                                <React.Fragment key={`${input}~${index}`}>
                                  <TableRow key={index}>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className={classes.tableRow}
                                    >
                                      체육시설 / 위치
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className={classes.tableCell}
                                    >
                                      {selectedMyCamp[index].facility}
                                    </TableCell>

                                    <TableCell
                                      align="left"
                                      className={classes.tableCell}
                                    >
                                      {selectedMyCamp[index].location}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <span className={classes.modalButtons}>
                          <Button
                            onClick={modalClose}
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

                <Grid item key="addCamp" xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Button
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <AddIcon fontSize="large" />
                      </Button>
                      <Modal
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Slide direction="up" in={open}>
                          <div className={classes.paper}>
                            <Container component="main" maxWidth="md">
                              <Typography className={classes.modalTypography}>
                                부대 및 체육시설 추가하기
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
                                        부대명
                                      </TableCell>
                                      <th>
                                        <FormControl
                                          fullWidth
                                          error={
                                            campNameError === "" ? false : true
                                          }
                                        >
                                          <Input
                                            value={campName}
                                            onChange={({ target: { value } }) =>
                                              setCampName(value)
                                            }
                                            type="text"
                                            className={classes.textField}
                                            placeholder="부대명을 입력해주십시오."
                                          />
                                        </FormControl>
                                      </th>
                                    </TableRow>

                                    {inputFields.map((input, index) => (
                                      <React.Fragment key={`${input}~${index}`}>
                                        <TableRow key={index}>
                                          <TableCell
                                            component="th"
                                            scope="row"
                                            className={classes.tableRow}
                                          >
                                            체육시설
                                          </TableCell>
                                          <th>
                                            <FormControl
                                              fullWidth
                                              error={
                                                facilityError[index]
                                                  .facility === ""
                                                  ? false
                                                  : true
                                              }
                                            >
                                              <Input
                                                value={input.facility || ""}
                                                onChange={({
                                                  target: { value },
                                                }) =>
                                                  handleInputChange(
                                                    index,
                                                    value,
                                                    0
                                                  )
                                                }
                                                type="text"
                                                className={classes.textField}
                                                placeholder="체육시설을 입력해주십시오."
                                              />
                                            </FormControl>
                                            <FormControl
                                              fullWidth
                                              error={
                                                facilityError[index]
                                                  .location === ""
                                                  ? false
                                                  : true
                                              }
                                            >
                                              <Input
                                                value={input.location || ""}
                                                onChange={({
                                                  target: { value },
                                                }) =>
                                                  handleInputChange(
                                                    index,
                                                    value,
                                                    1
                                                  )
                                                }
                                                type="text"
                                                className={classes.textField}
                                                placeholder="위치를 입력해주십시오."
                                              />
                                            </FormControl>
                                          </th>
                                          <th>
                                            <IndeterminateCheckBoxIcon
                                              onClick={() =>
                                                handleRemoveFields(index)
                                              }
                                              style={{
                                                cursor: "pointer",
                                                color: "orangered",
                                              }}
                                            />
                                          </th>
                                        </TableRow>
                                      </React.Fragment>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>

                              <span className={classes.buttons}>
                                <Button
                                  variant="contained"
                                  className={classes.button}
                                  onClick={handleAddFields}
                                >
                                  체육시설 추가하기
                                </Button>

                                <span>
                                  <Button
                                    onClick={addCamp}
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                  >
                                    확인
                                  </Button>
                                  <Snackbar
                                    autoHideDuration={2000}
                                    open={snackBar}
                                    onClose={() => setSnackBar(false)}
                                    TransitionComponent={Slide}
                                    message="부대를 추가하였습니다. 관리자의 승인을 기다립니다."
                                  />
                                  <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                  >
                                    닫기
                                  </Button>
                                </span>
                              </span>
                            </Container>
                          </div>
                        </Slide>
                      </Modal>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {pendingCamps.length === 0 ? (
                  <Typography align="justify" className={classes.noPending}>
                    승인 대기중인 부대가 없습니다.
                  </Typography>
                ) : (
                  pendingCamps.map((camp) => (
                    <Grid item key={camp} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            variant="h5"
                            component="h2"
                            className={classes.typography}
                          >
                            {camp}
                          </Typography>
                        </CardContent>
                        <CardActions className={classes.cardButton}>
                          <Button
                            value={camp}
                            color="primary"
                            onClick={() => showPendingFacility(camp)}
                          >
                            자세히
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => modifyPendingCamp(camp)}
                          >
                            수정
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                )}
                {/* 승인대기중인부대용 모달임 */}

                <Modal
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Slide direction="up" in={open}>
                    <div className={classes.paper}>
                      <Container component="main" maxWidth="md">
                        <Typography className={classes.modalTypography}>
                          부대 및 체육시설 추가하기
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
                                  부대명
                                </TableCell>
                                <th>
                                  <FormControl
                                    fullWidth
                                    error={campNameError === "" ? false : true}
                                  >
                                    <Input
                                      value={campName}
                                      onChange={({ target: { value } }) =>
                                        setCampName(value)
                                      }
                                      type="text"
                                      className={classes.textField}
                                      placeholder="부대명을 입력해주십시오."
                                    />
                                  </FormControl>
                                </th>
                              </TableRow>

                              {inputFields.map((input, index) => (
                                <React.Fragment key={`${input}~${index}`}>
                                  <TableRow key={index}>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className={classes.tableRow}
                                    >
                                      체육시설
                                    </TableCell>
                                    <th>
                                      {/* <FormControl
                                        fullWidth
                                        error={
                                          facilityError[index].facility === ""
                                            ? false
                                            : true
                                        }
                                      > */}
                                      <Input
                                        value={input.facility || ""}
                                        onChange={({ target: { value } }) =>
                                          handleInputChange(index, value, 0)
                                        }
                                        type="text"
                                        className={classes.textField}
                                        placeholder="체육시설을 입력해주십시오."
                                      />
                                      {/* </FormControl>
                                      <FormControl
                                        fullWidth
                                        error={
                                          facilityError[index].location === ""
                                            ? false
                                            : true
                                        }
                                      > */}
                                      <Input
                                        value={input.location || ""}
                                        onChange={({ target: { value } }) =>
                                          handleInputChange(index, value, 1)
                                        }
                                        type="text"
                                        className={classes.textField}
                                        placeholder="위치를 입력해주십시오."
                                      />
                                      {/* </FormControl> */}
                                    </th>
                                    <th>
                                      <IndeterminateCheckBoxIcon
                                        onClick={() =>
                                          handleRemoveFields(index)
                                        }
                                        style={{
                                          cursor: "pointer",
                                          color: "orangered",
                                        }}
                                      />
                                    </th>
                                  </TableRow>
                                </React.Fragment>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <span className={classes.buttons}>
                          <Button
                            variant="contained"
                            className={classes.button}
                            onClick={handleAddFields}
                          >
                            체육시설 추가하기
                          </Button>

                          <span>
                            <Button
                              onClick={addCamp}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              확인
                            </Button>
                            <Backdrop
                              className={classes.backdrop}
                              open={openProgress}
                            >
                              <CircularProgress color="inherit" />
                            </Backdrop>
                            <Snackbar
                              autoHideDuration={2000}
                              open={snackBar}
                              onClose={() => setSnackBar(false)}
                              TransitionComponent={Slide}
                              message="부대를 추가하였습니다. 관리자의 승인을 기다립니다."
                            />
                            <Button
                              onClick={handleClose}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                            >
                              닫기
                            </Button>
                          </span>
                        </span>
                      </Container>
                    </div>
                  </Slide>
                </Modal>

                <Modal
                  id="showFacility"
                  className={classes.modal}
                  open={openModal}
                  onClose={modalClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Slide direction="up" in={openModal}>
                    <div className={classes.paper}>
                      <Container component="main" maxWidth="md">
                        <Typography className={classes.modalTypography}>
                          상세보기
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
                                  부대명
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableCell}
                                >
                                  {choosedCamp}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableCell}
                                ></TableCell>
                              </TableRow>

                              {selectedMyCamp.map((input, index) => (
                                <React.Fragment key={`${input}~${index}`}>
                                  <TableRow key={index}>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className={classes.tableRow}
                                    >
                                      체육시설 / 위치
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className={classes.tableCell}
                                    >
                                      {selectedMyCamp[index].facility}
                                    </TableCell>

                                    <TableCell
                                      align="left"
                                      className={classes.tableCell}
                                    >
                                      {selectedMyCamp[index].location}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <span className={classes.modalButtons}>
                          <Button
                            onClick={modalClose}
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
              </Grid>
            </Container>
          )}
        </main>
        <footer className={classes.footer}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
            style={{
              fontFamily: ["Jua", '"sans-serif"'],
            }}
          >
            홈페이지 관련문의: 정영안 (T.010-9715-1508)
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{
              fontFamily: ["Jua", '"sans-serif"'],
            }}
          >
            {"Copyright © 체육시설 예약체계 "} {new Date().getFullYear()}
            {"."}
          </Typography>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default AddCamp;
