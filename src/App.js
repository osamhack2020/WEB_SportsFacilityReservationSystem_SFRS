import React from "react";
import "./App.css";
import Bars from "./fontawesome/bars";
import Edit from "./fontawesome/edit";
import User from "./fontawesome/user";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Login from "./fontawesome/login";
import Logout from "./fontawesome/logout";
import PrivateRoute from "./privateRoute";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import SignUp from "./signUp";
import MenuList from "@material-ui/core/MenuList";
import SignIn from "./signIn";
import MyInfoPage from "./myInfoPage";
import ApproveCamp from "./approveCamp";
import MyPage from "./myPage";
import BoardPage from "./boardPage";
import AddCamp from "./addCamp";
import ShowReservation from "./showReservation";
import Checkout from "./reservation";
import Reservation from "./reservation";
import app from "./firebase";
import { AuthProvider, AuthContext } from "./auth";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import Test from "./cloudFunctionTestPage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingRight: "15px",
    paddingLeft: "15px",
    // paddingBottom: "200px",
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
    // backgroundImage: 'url(https://source.unsplash.com/random)',
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
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Jua", "sans-serif"].join(","),
  },
});

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef(null);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setAnchorEl(null);
  };

  const post = {
    title: "국군장병들의 건강한 체육활동을 위하여",
    description:
      "간부 병 상관없이 누구나 확률적으로 즐길수있는 공정한 체육시설예약체계 각 부대에서 있는 체육대회에도 많은 관심 부탁드립니다.",
    image: "https://source.unsplash.com/random",
    imgText: "main image description",
    linkText: "Continue reading…",
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <header className="responsive_nav">
            <nav className="navbar">
              <div className="navbar__logo">
                <NavLink exact to="/">
                  <i>
                    <Edit />
                  </i>
                  &nbsp;체육시설 예약체계
                </NavLink>
              </div>
              <ul className="navbar__menu">
                <li>
                  <NavLink to="/reservation">예약신청</NavLink>
                </li>
                <li>
                  <NavLink to="/showReservation">예약확인</NavLink>
                </li>
                <li>
                  <NavLink to="/boardPage">게시판</NavLink>
                </li>
                <li>
                  <NavLink to="/myPage">마이페이지</NavLink>
                </li>
                <AuthContext.Consumer>
                  {({ currentUser, userInfo }) => {
                    if (currentUser && userInfo.admin === true) {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <li>
                            {userInfo.rootAdmin === false ? (
                              <NavLink to="/addCamp">관리자페이지</NavLink>
                            ) : (
                              <div>
                                <span
                                  ref={anchorRef}
                                  onClick={handleClick}
                                  style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    display: "block",
                                    padding: "8px 35px",
                                  }}
                                >
                                  관리자페이지
                                </span>

                                <Popper
                                  open={Boolean(anchorEl)}
                                  anchorEl={anchorRef.current}
                                  role={undefined}
                                  transition
                                  disablePortal
                                >
                                  {({ TransitionProps, placement }) => (
                                    <Grow
                                      {...TransitionProps}
                                      style={{
                                        transformOrigin:
                                          placement === "bottom"
                                            ? "center top"
                                            : "center bottom",
                                      }}
                                    >
                                      <Paper>
                                        <ClickAwayListener
                                          onClickAway={handleClose}
                                        >
                                          <MenuList>
                                            <MenuItem
                                              onClick={handleClose}
                                              style={{
                                                fontFamily: [
                                                  "Jua",
                                                  '"sans-serif"',
                                                ],
                                                padding: 0,
                                              }}
                                            >
                                              <NavLink
                                                to="/addCamp"
                                                onClick={handleClose}
                                              >
                                                부대 관리
                                              </NavLink>
                                            </MenuItem>
                                            <MenuItem
                                              onClick={handleClose}
                                              style={{
                                                fontFamily: [
                                                  "Jua",
                                                  '"sans-serif"',
                                                ],
                                                padding: 0,
                                              }}
                                            >
                                              <NavLink
                                                to="/approveCamp"
                                                onClick={handleClose}
                                              >
                                                관리자 승인
                                              </NavLink>
                                            </MenuItem>
                                          </MenuList>
                                        </ClickAwayListener>
                                      </Paper>
                                    </Grow>
                                  )}
                                </Popper>
                              </div>
                            )}
                          </li>
                        </div>
                      );
                    }
                  }}
                </AuthContext.Consumer>
              </ul>

              <ul className="navbar__icons">
                <li>
                  <User />
                  <AuthContext.Consumer>
                    {({ currentUser }) =>
                      currentUser ? (
                        <NavLink to="/myInfoPage">&nbsp;내정보</NavLink>
                      ) : (
                        <NavLink to="/signUp">&nbsp;회원가입</NavLink>
                      )
                    }
                  </AuthContext.Consumer>
                </li>

                <AuthContext.Consumer>
                  {({ currentUser }) =>
                    currentUser ? (
                      <li>
                        <Logout />
                        <NavLink
                          to="/"
                          onClick={() => {
                            app.auth().signOut();
                          }}
                        >
                          &nbsp;로그아웃
                        </NavLink>
                      </li>
                    ) : (
                      <li>
                        <Login />
                        <NavLink to="/login">&nbsp;로그인</NavLink>
                      </li>
                    )
                  }
                </AuthContext.Consumer>
              </ul>
              <Bars />
            </nav>
          </header>
          <Divider />

          <Switch>
            <Route exact path="/">
              <div className={classes.realRoot}>
                <Container maxWidth="lg" style={{ padding: 0 }}>
                  <main>
                    {/* 새로 작성한 메인 페이지 */}
                    <Paper
                      className={classes.mainFeaturedPost}
                      style={{
                        backgroundImage:
                          "url(" + require("./assets/tennisHD.jpg") + ")",
                      }}
                    >
                      {/* Increase the priority of the hero background image */}
                      {
                        <img
                          style={{ display: "none" }}
                          src={post.image}
                          alt={post.imageText}
                        />
                      }
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
                        <CardActionArea component="a" href="#">
                          <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                              <CardContent>
                                <Typography component="h2" variant="h5">
                                  {post.title}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="textSecondary"
                                >
                                  {post.date}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                  {post.description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                  Continue reading...
                                </Typography>
                              </CardContent>
                            </div>
                            <Hidden xsDown>
                              <CardMedia
                                className={classes.cardMedia}
                                image={post.image}
                                title={post.imageTitle}
                              />
                            </Hidden>
                          </Card>
                        </CardActionArea>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CardActionArea component="a" href="#">
                          <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                              <CardContent>
                                <Typography component="h2" variant="h5">
                                  {post.title}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="textSecondary"
                                >
                                  {post.date}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                  {post.description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                  Continue reading...
                                </Typography>
                              </CardContent>
                            </div>
                            <Hidden xsDown>
                              <CardMedia
                                className={classes.cardMedia}
                                image={post.image}
                                title={post.imageTitle}
                              />
                            </Hidden>
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
                        <Grid
                          container
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <Grid item>asdasdsac</Grid>
                          <Grid item>aasdaskjn</Grid>
                        </Grid>
                      </Link>
                    </Grid>

                    {/* <BackgroundImage
                  filter
                  image={require("./assets/tennisHD.jpg")}
                >
                  <div className={classes.container}>
                    <GridContainer style={{ justifyContent: "center" }}>
                      <GridItem xs={12} sm={12} md={6}>
                        <h1 className={classes.title}>
                          국군장병들의 건강한 체육활동을 위하여
                        </h1>
                        <h2 style={{ fontWeight: "300" }}>
                          간부 병 상관없이 누구나 확률적으로 즐길수있는 공정한
                          체육시설예약체계 각 부대에서 있는 체육대회에도 많은
                          관심 부탁드립니다.
                        </h2>
                      </GridItem>
                    </GridContainer>
                  </div>
                </BackgroundImage> */}
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
                    {"Copyright © 체육시설 예약체계 "}{" "}
                    {new Date().getFullYear()}
                    {"."}
                  </Typography>
                </footer>
              </div>
            </Route>

            <PrivateRoute path="/reservation" component={Reservation} />

            <Route path="/showReservation" component={ShowReservation} />

            <Route path="/login" component={SignIn} />

            <Route path="/boardPage" component={BoardPage} />

            <PrivateRoute path="/myInfoPage" component={MyInfoPage} />

            <PrivateRoute path="/myPage" component={MyPage} />

            <Route path="/test" component={Test} />

            <Route path="/approveCamp" component={ApproveCamp} />

            <PrivateRoute path="/addCamp" component={AddCamp} />

            <Route path="/signUp" component={SignUp} />

            <Route path="/checkout" component={Checkout} />

            <Route path="/">
              <h2>Not found</h2>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
