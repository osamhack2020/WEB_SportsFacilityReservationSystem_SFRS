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
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import app from "./firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 10,
    padding: "4px 2%",
    justifyContent: "flex-end",
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  textField: {
    fontFamily: ["Jua", '"sans-serif"'],
    marginTop: theme.spacing(0),
    fontSize: 16,
    marginBottom: theme.spacing(0),
    padding: "2%",
    paddingLeft: "5%",
    width: "100%",
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
  tableCell: {
    fontSize: 15,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "4%",
  },
  tableRow: {
    fontSize: 15,
    fontFamily: ["Jua", '"sans-serif"'],
    paddingLeft: "5%",
    backgroundColor: "#0f4c8133",
    width: "26%",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(4),
      padding: theme.spacing(3),
    },
  },
  breadcrumbsTypography: {
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 12,
  },
  modalTypography: {
    fontFamily: ["Jua", '"sans-serif"'],
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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
    minHeight: "150vh",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  papers: {
    "@media (min-width: 600px)": {
      width: "70%",
    },
    width: "95%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 3),
  },
  modalButtons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
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
}));

const BoardPage = () => {
  const classes = useStyles();

  const [showAddButton, setShowAddButton] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [contentError, setContentError] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [content, setContent] = React.useState("");
  const [boardContent, setBoardContent] = React.useState([]);
  const [openProgress, setOpenProgress] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [boardCount, setBoardCount] = React.useState(0);

  const modalClose = () => {
    setContent("");
    setTitle("");
    setTitleError(false);
    setOpenModal(false);
  };

  const modalCloseAndUpdate = async () => {
    setContent("");
    setTitle("");
    setTitleError(false);
    setOpenModal(false);

    setBoardContent([]);
    await app
      .firestore()
      .collection("board")
      .orderBy("writeDate", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setBoardContent((oldArray) => [
            ...oldArray,
            {
              title: doc.data().title,
              writer: doc.data().writer,
              writeDate: doc.data().writeDate,
            },
          ]);
        });
      });
  };

  const addBoard = () => {
    setOpenProgress(true);
    setTitleError(false);
    setContentError(false);
    setTimeout(() => {
      setOpenProgress(false);
    }, 400);

    if (title === "") setTitleError(true);
    else if (content === "") setContentError(true);
    else {
      app.firestore().collection("board").add({
        writeDate: new Date(),
        writer: userData,
        title,
        content,
      });

      app
        .firestore()
        .collection("board")
        .doc("count")
        .update({ count: boardCount });

      setSnackbar(true);
      setTimeout(() => {
        modalCloseAndUpdate();
      }, 1400);
    }
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setShowAddButton(true);
        await app
          .firestore()
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              setUserData(
                `${doc.data().military} ${doc.data().rank} ${doc.data().name}`
              );
            });
          });
      }
    });

    app
      .firestore()
      .collection("board")
      .doc("count")
      .get()
      .then((snapshot) => {
        setBoardCount(snapshot.data().count + 1);
      });

    app
      .firestore()
      .collection("board")
      .orderBy("writeDate", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setBoardContent((oldArray) => [
            ...oldArray,
            {
              title: doc.data().title,
              writer: doc.data().writer,
              writeDate: doc.data().writeDate,
            },
          ]);
        });
      });
  }, []);

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
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>제목</TableCell>
                  <TableCell>작성자</TableCell>
                  <TableCell>등록일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {boardContent.map((content, index) => (
                  <TableRow key={index}>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>{content.writer}</TableCell>
                    <TableCell>
                      {moment(content.writeDate.toDate()).format(
                        "YYYY/MM/DD hh:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Pagination count={10} className={classes.modal} color="primary" />
          <div className={classes.buttons}>
            {showAddButton ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                글쓰기
              </Button>
            ) : (
              <div></div>
            )}
          </div>
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
            <div className={classes.papers}>
              <Container component="main" maxWidth="md">
                <Typography className={classes.modalTypography}>
                  자유게시판
                </Typography>
                <TableContainer
                  component={Paper}
                  className={classes.tableContainer}
                >
                  <Table>
                    <TableBody>
                      <TableRow key="title">
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRow}
                        >
                          제목
                        </TableCell>
                        <th
                          style={{
                            borderBottom: "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          <FormControl fullWidth error={titleError}>
                            <Input
                              value={title}
                              onChange={({ target: { value } }) =>
                                setTitle(value)
                              }
                              type="text"
                              className={classes.textField}
                              placeholder="제목을 입력하십시오."
                            />
                          </FormControl>
                        </th>
                      </TableRow>
                      <TableRow key="writerName">
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRow}
                        >
                          작성자
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          {userData}
                        </TableCell>
                      </TableRow>
                      <TableRow key="content">
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableRow}
                        >
                          내용
                        </TableCell>
                        <th>
                          <FormControl fullWidth error={contentError}>
                            <Input
                              value={content}
                              onChange={({ target: { value } }) =>
                                setContent(value)
                              }
                              multiline
                              rows={4}
                              type="text"
                              className={classes.textField}
                              placeholder="내용을 입력하십시오."
                            />
                          </FormControl>
                        </th>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <span className={classes.modalButtons}>
                  <Button
                    onClick={addBoard}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    확인
                  </Button>
                  <Backdrop className={classes.backdrop} open={openProgress}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <Snackbar
                    autoHideDuration={2000}
                    open={snackbar}
                    onClose={() => setSnackbar(false)}
                    TransitionComponent={Slide}
                    message="글이 등록되었습니다."
                  />
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
