import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import app from "./firebase";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import moment from "moment";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
  title: {
    margin: "1.75rem 0 0.875rem",
    fontWeight: "400",
    fontFamily: `"Jua", sans-serif`,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
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
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "require(./assets/tennisHD.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  typography: {
    padding: "5px",
  },
}));

const post = {
  title: "국군장병들의 건강한 체육활동을 위하여",
  description:
    "간부 병 상관없이 누구나 확률적으로 즐길수있는 공정한 체육시설예약체계 각 부대에서 있는 체육대회에도 많은 관심 부탁드립니다.",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const IndexPage = () => {
  const classes = useStyles();
  const [futureReservation, setFutureReservation] = React.useState([]);
  const [isLogined, setIsLogined] = React.useState(false);

  React.useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogined(true);
        await app
          .firestore()
          .collectionGroup("reservation")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (
                doc.data().start.seconds >
                moment().endOf("day").toDate().getTime() / 1000
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
      } else setIsLogined(false);
    });
  }, []);

  return (
    <div className={classes.realRoot}>
      <Container maxWidth="lg">
        <main>
          <Paper
            className={classes.mainFeaturedPost}
            style={{
              backgroundImage: "url(" + require("./assets/tennisHD.jpg") + ")",
            }}
          >
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    {post.description}
                  </Typography>
                  <Link variant="subtitle1" href="#">
                    {post.linkText}
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardActionArea component={NavLink} to="/myPage">
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        오늘의 내 예약 보기
                      </Typography>

                      {isLogined ? (
                        futureReservation.length === 0 ? (
                          <Typography
                            variant="h4"
                            className={classes.typography}
                          >
                            <AnnouncementIcon style={{ marginRight: "5px" }} />
                            내 예약이 없습니다.
                          </Typography>
                        ) : (
                          futureReservation.map((reservation) => (
                            <Typography
                              variant="subtitle1"
                              key={reservation.key}
                              className={classes.typography}
                            >
                              {reservation.camp} {reservation.facility}에서{" "}
                              {moment(reservation.start.toDate()).format(
                                "YYYY/MM/DD hh:mm"
                              )}
                              &nbsp;~&nbsp;
                              {moment(reservation.end.toDate()).format("hh:mm")}
                              의{reservation.title} 예약이 존재합니다.
                            </Typography>
                          ))
                        )
                      ) : (
                        <Typography
                          variant="subtitle1"
                          className={classes.typography}
                        >
                          내 예약을 보시려면 먼저 로그인을 부탁드립니다.
                        </Typography>
                      )}
                      <Typography variant="subtitle1" color="primary">
                        이어서 보기...
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Grid>

            <Grid item xs={12} md={6}>
              <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        지금 개최중인 체육대회 확인하기
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {post.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        이어서 보기...
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </CardActionArea>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography variant="h6" gutterBottom>
                asd
              </Typography>
              <Typography>asd</Typography>
            </Paper>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.sidebarSection}
            >
              Archives
            </Typography>
            2010 123912390123 1232 342 342 3423 4
            <Typography
              variant="h6"
              gutterBottom
              className={classes.sidebarSection}
            >
              Social
            </Typography>
            <Link display="block" variant="body1" href="#">
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>asdasdsac</Grid>
                <Grid item>aasdaskjn</Grid>
              </Grid>
            </Link>
          </Grid>
        </main>
      </Container>

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
  );
};

export default IndexPage;
