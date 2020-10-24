import React, { useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase";
import { AuthContext } from "./auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { NavLink } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        fontFamily: ["Jua", '"sans-serif"'],
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
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
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 12,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 6),
  },
  typography: {
    fontFamily: ["Jua", '"sans-serif"'],
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    fontFamily: ["Jua", '"sans-serif"'],
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  marginTop: {
    marginTop: theme.spacing(1),
    fontFamily: ["Jua", '"sans-serif"'],
  },
}));

const SignIn = ({ location }) => {
  const classes = useStyles();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    const { email, password } = event.target.elements;
    try {
      setLoginProgress(true);
      setTimeout(() => {
        setLoginProgress(false);
      }, 500);
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setEmailError("잘못된 이메일 형식입니다.");
          break;
        case "auth/user-disabled":
          setEmailError("관리자가 사용중지한 계정입니다.");
          break;
        case "auth/user-not-found":
          setEmailError("존재하지 않는 아이디입니다.");
          break;
        case "auth/wrong-password":
          setPasswordError("잘못된 비밀번호입니다.");
          break;
        default:
      }
    }
  };

  const { from } = location.state || { from: { pathname: "/" } };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Redirect to={from.pathname} />;

  return (
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
            로그인
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
              로그인
              </Typography>
          </Container>
        </div>
        <Container component="main" maxWidth="xs" className={classes.typography}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.marginTop}>
              로그인
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleLogin}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="이메일 입력"
                  name="email"
                  InputProps={{
                    className: classes.typography,
                  }}
                  autoComplete="email"
                  autoFocus
                />
              </ThemeProvider>
              <p className="errorMessage">{emailError}</p>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호 입력"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </ThemeProvider>
              <p className="errorMessage">{passwordError}</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                로그인
              </Button>
              <Grid container >
                <Grid item xs>
                  <Link href="#" variant="body2" className={classes.typography}>
                    비밀번호 찾기
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to="/signUp" variant="body2" className={classes.typography} style={{ color: '#3f51b5' }}>
                    회원가입
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </main>

      <Backdrop
        className={classes.backdrop}
        open={loginProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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

export default withRouter(SignIn);
