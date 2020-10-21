import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import app from "./firebase";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 6),
  },
  root: {
    width: 500,
  },
  navigationStyle: {
    "&$navigationSelected": {
      marginTop: "5px",
      fontSize: "15px",
      fontFamily: ["Jua", '"sans-serif"'],
    },
    fontSize: "15px",
    marginTop: "5px",
    fontFamily: ["Jua", '"sans-serif"'],
  },
  tableCell: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
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
  tableRow: {
    fontSize: 16,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
    backgroundColor: "#0f4c8133",
    width: "30%",
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
  realRoot: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 10,
    padding: "4px 2%",
    justifyContent: "flex-end",
    display: "flex",
  },
  breadcrumbsTypography: {
    fontSize: 12,
    fontFamily: ["Jua", '"sans-serif"'],
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
  const [requestedCamp, setRequestedCamp] = React.useState("");
  const [requestedFacility, setRequestedFacility] = React.useState([]);
  const [value, setValue] = React.useState("1");
  const [camps, setCamps] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openProgress, setOpenProgress] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState(false);

  const approveCamp = async () => {
    const db = app.firestore();

    setOpenProgress(true);
    setTimeout(() => {
      setOpenProgress(false);
    }, 500);

    await db
      .collection("camp")
      .doc(requestedCamp)
      .set({ uid: requestedFacility[0].uid });

    for (let i = 0; i < requestedFacility.length; i++) {
      await app
        .firestore()
        .collection("camp")
        .doc(requestedCamp)
        .collection("facility")
        .doc(requestedFacility[i].facility)
        .set({ location: requestedFacility[i].location });
    }

    await db.collection("pendingApproval").doc(requestedCamp).delete();

    setCamps([]);
    await db
      .collection("pendingApproval")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setCamps((oldArray) => [...oldArray, doc.id]);
        });
      });

    setSnackBar(true);
    setTimeout(() => {
      handleClose();
    }, 1700);
  };

  const handleClose = () => {
    setOpen(false);

    setRequestedFacility([]);
    setRequestedCamp("");
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      app
        .firestore()
        .collection("pendingApproval")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setCamps((oldArray) => [
              ...oldArray,
              { camp: doc.id, uid: doc.data().uid },
            ]);
          });
        });
    });
  }, []);

  const showFacility = (camp) => {
    setRequestedCamp(camp.camp);
    app
      .firestore()
      .collection("pendingApproval")
      .doc(camp.camp)
      .collection("facility")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setRequestedFacility((oldArray) => [
            ...oldArray,
            { facility: doc.id, location: doc.data().location, uid: camp.uid },
          ]);
        });
      });
    setOpen(true);
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
              관리자 승인
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
                관리자 승인
              </Typography>
              {/* <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
                className={classes.typography}
              >
                각 부대관리자들이 추가한 부대들을 승인 또는 거절할 수 있습니다.
                관리자들이 신청한 부대를 승인한다면 실제 사용자들이 바로 예약을
                진행할 수 있습니다.
              </Typography> */}
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
                      label="승인 대기중인 부대"
                      value="1"
                      icon={<HourglassEmptyIcon />}
                    />
                    <BottomNavigationAction
                      classes={{
                        label: classes.navigationStyle,
                        selected: classes.navigationSelected,
                      }}
                      label="나중에 뭐 추가할수도 있음"
                      value="2"
                      icon={<AddToQueueIcon />}
                    />
                  </BottomNavigation>
                </Grid>
              </div>
            </Container>
          </div>
          {value === "1" ? (
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {camps.length === 0 ? (
                  <Typography align="justify" className={classes.noPending}>
                    승인 대기중인 추가될 부대가 없습니다.
                  </Typography>
                ) : (
                    camps.map((camp) => (
                      <Grid item key={camp.camp} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardContent className={classes.cardContent}>
                            <Typography
                              variant="h5"
                              component="h2"
                              className={classes.typography}
                            >
                              {camp.camp}
                            </Typography>
                          </CardContent>
                          <CardActions className={classes.cardButton}>
                            <Button
                              value={camp.camp}
                              color="primary"
                              onClick={() => showFacility(camp)}
                            >
                              승인 / 미승인
                          </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  )}

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
                          추가된 부대 승인하기
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
                                  {requestedCamp}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className={classes.tableCell}
                                ></TableCell>
                              </TableRow>

                              {requestedFacility.map((input, index) => (
                                <React.Fragment key={`${input}~${index}`}>
                                  <TableRow key={index}>
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className={classes.tableRow}
                                    >
                                      체육시설
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className={classes.tableCell}
                                    >
                                      {requestedFacility[index].facility}
                                    </TableCell>

                                    <TableCell
                                      align="left"
                                      className={classes.tableCell}
                                    >
                                      {requestedFacility[index].location}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <span className={classes.buttons}>
                          <span>
                            <Button
                              onClick={approveCamp}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              승인
                            </Button>
                            <Button
                              onClick={approveCamp}
                              variant="contained"
                              // color="primary"
                              className={classes.button}
                            >
                              미승인
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
                              message="부대를 추가하였습니다."
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
              </Grid>
            </Container>
          ) : (
              <div>asd</div>
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
