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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";

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
    fontFamily: ["Jua", '"sans-serif"'],
  },
  tableBody: {
    fontFamily: ["Jua", '"sans-serif"'],
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
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
    minHeight: "100vh",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  buttons: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: theme.spacing(1),
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
  const [adminBoardContent, setAdminBoardContent] = React.useState([]);
  const [openProgress, setOpenProgress] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [boardCount, setBoardCount] = React.useState(0);
  const [showMoreButton, setShowMoreButton] = React.useState(true);
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);
  const [openAdminModal, setOpenAdminModal] = React.useState(false);
  const [openContentModal, setOpenContentModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [isModify, setIsModify] = React.useState(false);
  const [modifySuccessSB, setModifySuccessSB] = React.useState(false);
  const [deleteSuccessSB, setDeleteSuccessSB] = React.useState(false);

  const showMore = async () => {
    const lastContent = boardContent[boardContent.length - 1].writeDate;
    await app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", false)
      .orderBy("writeDate", "desc")
      .startAfter(lastContent)
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setBoardContent((oldArray) => [
            ...oldArray,
            {
              title: doc.data().title,
              key: doc.id,
              writer: doc.data().writer,
              writeDate: doc.data().writeDate,
            },
          ]);
        });
      });

    if (boardContent.length + 10 >= boardCount) setShowMoreButton(false);
  };

  const modalClose = () => {
    setContent("");
    setTitle("");
    setTitleError(false);
    setOpenModal(false);
    setOpenAdminModal(false);
    setOpenContentModal(false);
  };

  const modalCloseAndUpdate = () => {
    modalClose();

    app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", false)
      .get()
      .then((snapshot) => {
        let count = 0;
        snapshot.forEach(() => {
          count++;
        });
        setBoardCount(count);
        if (count === 0) setShowMoreButton(false);
      });

    setBoardContent([]);
    app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", false)
      .orderBy("writeDate", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setBoardContent((oldArray) => [
            ...oldArray,
            {
              key: doc.id,
              title: doc.data().title,
              writer: doc.data().writer,
              writeDate: doc.data().writeDate,
            },
          ]);
        });
      });
    setShowMoreButton(true);

    setAdminBoardContent([]);
    app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", true)
      .orderBy("writeDate", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setAdminBoardContent((oldArray) => [
            ...oldArray,
            {
              key: doc.id,
              title: doc.data().title,
              writer: doc.data().writer,
              writeDate: doc.data().writeDate,
            },
          ]);
        });
      });
  };

  const addBoard = (isAdminWrite) => {
    setOpenProgress(true);
    setTitleError(false);
    setContentError(false);
    setTimeout(() => {
      setOpenProgress(false);
    }, 400);

    if (title === "") setTitleError(true);
    else if (content === "") setContentError(true);
    else {
      if (isModify) {
        app
          .firestore()
          .collection("board")
          .doc(modalContent.documentId)
          .update({ title, content, writeDate: new Date() });

        setModifySuccessSB(true);
      } else {
        app.firestore().collection("board").add({
          writeDate: new Date(),
          writer: userData,
          title,
          content,
          adminWrite: isAdminWrite,
          userId: userId,
        });

        setSnackbar(true);
      }

      setTimeout(() => {
        modalCloseAndUpdate();
      }, 1200);
    }
  };

  const showMoreContent = (documentId) => {
    app
      .firestore()
      .collection("board")
      .doc(documentId)
      .get()
      .then((snapshot) => {
        setModalContent({
          title: snapshot.data().title,
          writer: snapshot.data().adminWrite
            ? "관리자"
            : snapshot.data().writer,
          writeDate: snapshot.data().writeDate,
          content: snapshot.data().content,
          adminWrite: snapshot.data().adminWrite,
          userId: snapshot.data().userId,
          documentId,
        });

        setOpenContentModal(true);
      });
  };

  const modifyModal = (adminWrite) => {
    setOpenContentModal(false);
    setTitle(modalContent.title);
    setContent(modalContent.content);
    setIsModify(true);

    if (adminWrite) setOpenAdminModal(true);
    else setOpenModal(true);
  };

  const deleteModal = async (documentId) => {
    await app.firestore().collection("board").doc(documentId).delete();

    setDeleteSuccessSB(true);
    modalCloseAndUpdate();
  };

  React.useEffect(() => {
    app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", false)
      .get()
      .then((snapshot) => {
        let count = 0;
        snapshot.forEach(() => {
          count++;
        });
        setBoardCount(count);
        if (count === 0) setShowMoreButton(false);
      });

    app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", false)
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
              key: doc.id,
            },
          ]);
        });
      });

    app
      .firestore()
      .collection("board")
      .where("adminWrite", "==", true)
      .orderBy("writeDate", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setAdminBoardContent((oldArray) => [
            ...oldArray,
            {
              title: doc.data().title,
              writer: doc.data().writer,
              writeDate: doc.data().writeDate,
              key: doc.id,
            },
          ]);
        });
      });

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
              if (doc.data().admin) setIsUserAdmin(true);
              setUserId(user.uid);
              setUserData(
                `${doc.data().military} ${doc.data().rank} ${doc.data().name}`
              );
            });
          });
      }
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
          <div className={classes.buttons}>
            {isUserAdmin ? (
              <Button
                // variant="contained"
                color="secondary"
                onClick={() => setOpenAdminModal(true)}
              >
                관리자 글쓰기
              </Button>
            ) : (
              <div></div>
            )}
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

          <Paper className={classes.paper}>
            <Table className={classes.typography}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>작성자</TableCell>
                  <TableCell>등록일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {adminBoardContent.map((content) => (
                  <TableRow
                    key={content.key}
                    hover
                    onClick={() => showMoreContent(content.key)}
                  >
                    <TableCell style={{ paddingLeft: "11px" }}>
                      <NotificationsIcon fontSize="small" />
                    </TableCell>
                    <TableCell>{content.title}</TableCell>
                    <TableCell>관리자</TableCell>
                    <TableCell>
                      {moment(content.writeDate.toDate()).format(
                        "YYYY/MM/DD hh:mm"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {boardContent.map((content, index) => (
                  <TableRow
                    key={content.key}
                    hover
                    onClick={() => showMoreContent(content.key)}
                  >
                    <TableCell>{boardCount - index}</TableCell>
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

          {showMoreButton ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className={classes.modal}
              onClick={showMore}
            >
              <ExpandMoreIcon style={{ fontSize: 40 }} />
            </IconButton>
          ) : (
            <div></div>
          )}
        </div>
        <Snackbar
          autoHideDuration={1200}
          open={snackbar}
          onClose={() => setSnackbar(false)}
          TransitionComponent={Slide}
          message="글이 등록되었습니다."
        />
        <Snackbar
          autoHideDuration={1200}
          open={modifySuccessSB}
          onClose={() => setModifySuccessSB(false)}
          TransitionComponent={Slide}
          message="글이 수정되었습니다."
        />{" "}
        <Snackbar
          autoHideDuration={1200}
          open={deleteSuccessSB}
          onClose={() => setDeleteSuccessSB(false)}
          TransitionComponent={Slide}
          message="글이 삭제되었습니다."
        />
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
                    onClick={() => addBoard(false)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    확인
                  </Button>
                  <Backdrop className={classes.backdrop} open={openProgress}>
                    <CircularProgress color="inherit" />
                  </Backdrop>

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
        <Modal
          className={classes.modal}
          open={openAdminModal}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide direction="up" in={openAdminModal}>
            <div className={classes.papers}>
              <Container component="main" maxWidth="md">
                <Typography className={classes.modalTypography}>
                  관리자 글쓰기
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
                          관리자
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
                    onClick={() => addBoard(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    확인
                  </Button>
                  <Backdrop className={classes.backdrop} open={openProgress}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
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
        <Modal
          className={classes.modal}
          open={openContentModal}
          onClose={modalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide direction="up" in={openContentModal}>
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
                        <TableCell align="left" className={classes.tableCell}>
                          {modalContent.title}
                        </TableCell>
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
                          {modalContent.writer}
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
                        <TableCell align="left" className={classes.tableCell}>
                          {modalContent.content}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <span className={classes.modalButtons}>
                  {modalContent.userId === userId ? (
                    <span>
                      <Button
                        onClick={() => deleteModal(modalContent.documentId)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        삭제
                      </Button>
                      <Button
                        onClick={() => modifyModal(modalContent.adminWrite)}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        수정
                      </Button>
                    </span>
                  ) : (
                    <span></span>
                  )}
                  <Button
                    onClick={modalClose}
                    variant="contained"
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
