import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import app from "./firebase";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SportsTennisIcon from "@material-ui/icons/SportsTennis";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import moment from "moment";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  realRoot: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
  const [futureReservation, setFutureReservation] = React.useState([]);

  React.useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        app
          .firestore()
          .collectionGroup("reservation")
          // .where(
          //   "end",
          //   "<",
          //   new Date(moment().startOf("day").toDate().getTime())
          // )
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (
                doc.data().end.seconds <
                moment().add(2, "days").startOf("day").toDate().getTime() / 1000
              ) {
                setFutureReservation((oldArray) => [
                  ...oldArray,
                  {
                    key: doc.id,
                    camp: doc.data().camp,
                    facility: doc.data().facility,
                    title: doc.data().title,
                    uid: doc.data().uid,
                    start: doc.data().start,
                    end: doc.data().end,
                  },
                ]);
              }
            });
          });
      }
    });
  }, []);

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
              마이페이지
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
                마이페이지
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
                      label="내 예약"
                      value="1"
                      icon={<SportsTennisIcon />}
                    />
                    <BottomNavigationAction
                      classes={{
                        label: classes.navigationStyle,
                        selected: classes.navigationSelected,
                      }}
                      label="이용실적"
                      value="2"
                      icon={<SportsHandballIcon />}
                    />
                  </BottomNavigation>
                </Grid>
              </div>
            </Container>
          </div>
          {value === "1" ? (
            <Paper className={classes.paper}>
              <Table className={classes.typography}>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>번호</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>부대</TableCell>
                    <TableCell>체육시설</TableCell>
                    <TableCell>시작시간</TableCell>
                    <TableCell>종료시간</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {futureReservation.map((content, index) => (
                    <TableRow
                      key={content.key}
                      hover
                      // onClick={() => showMoreContent(content.key)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{content.title}</TableCell>
                      <TableCell>{content.camp}</TableCell>
                      <TableCell>{content.facility}</TableCell>
                      <TableCell>
                        {moment(content.start.toDate()).format(
                          "YYYY/MM/DD hh:mm"
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(content.end.toDate()).format("YYYY/MM/DD hh")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          ) : (
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}></Grid>
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
