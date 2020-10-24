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
import BackgroundImage from "./backgroundImage";
import GridContainer from "./gridContainer.js";
import GridItem from "./gridItem.js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import Test from "./cloudFunctionTestPage";
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
}));

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

  return (
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
              <BackgroundImage filter image={require("./assets/tennisHD.jpg")}>
                <div className={classes.container}>
                  <GridContainer style={{ justifyContent: "center" }}>
                    <GridItem xs={12} sm={12} md={6}>
                      <h1 className={classes.title}>
                        국군장병들의 건강한 체육활동을 위하여
                      </h1>
                      <h2 style={{ fontWeight: "300" }}>
                        간부 병 상관없이 누구나 확률적으로 즐길수있는 공정한
                        체육시설예약체계 각 부대에서 있는 체육대회에도 많은 관심
                        부탁드립니다.
                      </h2>
                    </GridItem>
                  </GridContainer>
                </div>
              </BackgroundImage>
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
          </Route>

          <PrivateRoute path="/reservation" component={Reservation} />

          <Route path="/showReservation" component={ShowReservation} />

          <Route path="/login" component={SignIn} />

          <Route path="/boardPage" component={BoardPage} />

          <Route path="/myInfoPage" component={MyInfoPage} />

          <Route path="/myPage" component={MyPage} />

          <Route path="/test" component={Test} />

          <Route
            path="/approveCamp"
            component={ApproveCamp}
            // render={() => <AddFacility user={currentUser} />}
          />

          <PrivateRoute path="/addCamp" component={AddCamp} />

          <Route path="/signUp" component={SignUp} />

          <Route path="/checkout" component={Checkout} />

          <Route path="/">
            <h2>Not found</h2>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
