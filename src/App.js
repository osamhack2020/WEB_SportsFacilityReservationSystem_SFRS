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
import { AuthProvider } from "./auth";
import Divider from "@material-ui/core/Divider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import Test from "./cloudFunctionTestPage";
import IndexPage from "./indexPage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Jua", "sans-serif"].join(","),
  },
});

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef(null);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(false);

  React.useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(true);

        app
          .firestore()
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              setUserInfo(doc.data());
            });
          });
      }
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setAnchorEl(null);
  };

  const signOut = () => {
    window.location.reload(false);

    app
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(false);
      });
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
                  <NavLink to="/boardPage">체육대회</NavLink>
                </li>
                <li>
                  <NavLink to="/myPage">마이페이지</NavLink>
                </li>
                {currentUser && userInfo.admin === true ? (
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
                            id="kimchi"
                            open={Boolean(anchorEl)}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                            style={{ zIndex: 1 }}
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
                                  <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                      <MenuItem
                                        onClick={handleClose}
                                        style={{
                                          fontFamily: ["Jua", '"sans-serif"'],
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
                                          fontFamily: ["Jua", '"sans-serif"'],
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
                ) : (
                  <span></span>
                )}
              </ul>

              <ul className="navbar__icons">
                <li>
                  <User />
                  {currentUser ? (
                    <NavLink to="/myInfoPage">&nbsp;내정보</NavLink>
                  ) : (
                    <NavLink to="/signUp">&nbsp;회원가입</NavLink>
                  )}
                </li>
                {currentUser ? (
                  <li>
                    <Logout />
                    <NavLink to="/" onClick={signOut}>
                      &nbsp;로그아웃
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <Login />
                    <NavLink to="/login">&nbsp;로그인</NavLink>
                  </li>
                )}
              </ul>
              <Bars />
            </nav>
          </header>
          <Divider />

          <Switch>
            <Route exact path="/" component={IndexPage}></Route>

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
