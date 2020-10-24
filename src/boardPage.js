import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import app from "./firebase";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 10,
    padding: "4px 2%",
    justifyContent: "flex-end",
    display: "flex",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    maxHeight: 400,
  },
  tableHead: {
    color: theme.palette.common.white,
  },
  tableBody: {
    backgroundColor: "#fafafa",
  },
  paper: {
    margin: "3% 10%",
    marginBottom: "2%",
    display: "flex",
    justifyContent: "center",
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
  realRoot: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10%",
  },
}));

const customers = [
  {
    id: 1,
    name: "홍길동",
    birthday: "961222",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    name: "나동빈",
    birthday: "960508",
    gender: "남자",
    job: "프로그래머",
  },
  {
    id: 3,
    name: "이순신",
    birthday: "961127",
    gender: "남자",
    job: "디자이너",
  },
];

const BoardPage = () => {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);

  const modalClose = () => {
    setOpenModal(false);
  };

  // React.useEffect(() => {
  //   app.auth().onAuthStateChanged(async (user) => {
  //     if (user) {
  //       await app
  //         .firestore()
  //         .collection("camp")
  //         .doc("1함대")
  //         .collection("facility")
  //         .doc("축구장")
  //         .collection("reservation")
  //         .where("uid", "==", user.uid)
  //         .get()
  //         .then((snapshot) => {
  //           snapshot.forEach((doc) => {
  //             console.log(doc.data());
  //             console.log(doc.id);
  //           });
  //         });
  //     }
  //   });
  // }, []);

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
            마이페이지
          </Typography>
          <Typography
            color="textPrimary"
            className={classes.breadcrumbsTypography}
          >
            자유게시판
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
              자유게시판
            </Typography>
          </Container>
        </div>
        <Paper className={classes.paper}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.birthday}</TableCell>
                  <TableCell>{c.gender}</TableCell>
                  <TableCell>{c.job}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            글쓰기
          </Button>
        </div>
        <Modal
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
                        <TableCell align="left" className={classes.tableCell}>
                          abracadabra
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                        ></TableCell>
                      </TableRow>
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
  );
};

export default BoardPage;
