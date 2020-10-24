import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SelectCamp from "./checkoutform/SelectCamp";
import SelectFacility from "./checkoutform/SelectFacility";
import SelectDate from "./checkoutform/SelectDate";
import app from "./firebase";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
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
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  table: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
}));

const steps = ["부대 선택", "체육시설 선택", "예약 보기"];

const Copyright = () => {
  return (
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
  );
};

export default function Checkout() {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectCamp next={handleNext} save={selectCamp} />;
      case 1:
        return (
          <SelectFacility
            name={selectedCamp}
            next={handleNext}
            save={selectFacility}
          />
        );
      case 2:
        return (
          <SelectDate
            camp={selectedCamp}
            facility={selectedFacility}
            save={saveRestInfo}
            isView={true}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedCamp, setSelectedCamp] = React.useState("");
  const [selectedFacility, setSelectedFacility] = React.useState("");
  const [restInfo, setRestInfo] = React.useState({});
  const [visitCheck, setVisitCheck] = React.useState(0);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);

  const selectCamp = (name) => {
    setSelectedCamp(name);
  };
  const selectFacility = (name) => {
    setSelectedFacility(name);
  };
  const saveRestInfo = (object) => {
    setRestInfo(object);
  };
  const handleNext = () => {
    if (activeStep === steps.length - 1 && Object.keys(restInfo).length === 0) {
      setSnackbarOpen(true);
      return;
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    const tempFunction = async () => {
      if (activeStep === steps.length) {
        app.auth().onAuthStateChanged(async (user) => {
          if (visitCheck === 0) {
            if (user) {
              const start = new Date(restInfo.start);
              const end = new Date(restInfo.end);
              await app
                .firestore()
                .collection("camp")
                .doc(selectedCamp)
                .collection("facility")
                .doc(selectedFacility)
                .collection("reservation")
                .add({ start, end, uid: user.uid, title: restInfo.title });
            } else setSnackbar(true);

            await setVisitCheck(1);
          }
        });
      }
    };
    tempFunction();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.realRoot}>
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
              예약확인
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
                예약확인
              </Typography>
            </Container>
          </div>
          <div className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                style={{
                  fontFamily: ["Jua", '"sans-serif"'],
                }}
              >
                체육시설 예약 현황
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Snackbar
                autoHideDuration={2200}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                TransitionComponent={Slide}
                message="시간을 선택해주십시오."
              />
              <Snackbar
                autoHideDuration={2200}
                open={snackbar}
                onClose={() => setSnackbar(false)}
                TransitionComponent={Slide}
                message="로그인 오류 발생! 다시 한번 시도해주십시오."
              />

              <React.Fragment>
                <React.Fragment>
                  {getStepContent(activeStep)}
                  {activeStep !== 0 && (
                    <div className={classes.buttons}>
                      <Button
                        variant="contained"
                        onClick={handleBack}
                        className={classes.button}
                      >
                        이전
                      </Button>
                    </div>
                  )}
                </React.Fragment>
              </React.Fragment>
            </Paper>
          </div>
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
          <Copyright />
        </footer>
      </div>
    </React.Fragment>
  );
}
