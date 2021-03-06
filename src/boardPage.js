import React from "react";
import CardActions from "@material-ui/core/CardActions";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TableCell from "@material-ui/core/TableCell";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Chip from "@material-ui/core/Chip";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Paper from "@material-ui/core/Paper";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import GroupIcon from "@material-ui/icons/Group";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
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
  root: {
    backgroundColor: "#fafafa",
    width: 500,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  tableContainers: {
    maxHeight: 500,
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

  modalButtons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  modalButton: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
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
  const [value, setValue] = React.useState("1");
  const [tournaments, setTournaments] = React.useState([]);
  const [tournamentDetail, setTournamentDetail] = React.useState({});
  const [tournamentDetailModal, setTournamentDetailModal] = React.useState(
    false
  );
  const [tournamentEnrollModal, setTournamentEnrollModal] = React.useState(
    false
  );
  const [enrollTeamName, setEnrollTeamName] = React.useState("");
  const [enrollTeamNameError, setEnrollTeamNameError] = React.useState(false);
  const [enrollTeamMemberLength, setEnrollTeamMemberLength] = React.useState(
    ""
  );
  const [
    enrollTeamMemeberLengthError,
    setEnrollTeamMemberLengthError,
  ] = React.useState(false);
  const [enrollTeamLeaderName, setEnrollTeamLeaderName] = React.useState("");
  const [
    enrollTeamLeaderNameError,
    setEnrollTeamLeaderNameError,
  ] = React.useState(false);
  const [tempInfo, setTempInfo] = React.useState({});
  const [enrollSnack, setEnrollSnack] = React.useState(false);
  const [enrollSnackAgain, setEnrollSnackAgain] = React.useState(false);
  const [authUserId, setAuthUserId] = React.useState("");
  const [isUserEnrolled, setIsUserEnrolled] = React.useState(false);
  const [enrolledSize, setEnrolledSize] = React.useState(0);
  const [tournamentIEnrolled, setTournamentIEnrolled] = React.useState([]);
  const [
    tournamentIEnrolledModal,
    setTournamentIEnrolledModal,
  ] = React.useState(false);
  const [enrolledTeam, setEnrolledTeam] = React.useState([]);

  const detailModalClose = () => {
    setTournamentDetailModal(false);
    setTournamentEnrollModal(false);
    setEnrollTeamMemberLengthError(false);
    setEnrollTeamLeaderNameError(false);
    setEnrollTeamNameError(false);
    setEnrollTeamName("");
    setEnrollTeamLeaderName("");
    setEnrollTeamMemberLength("");
  };

  const closeEnrollModal = () => {
    setTournamentEnrollModal(false);

    setEnrollTeamMemberLengthError(false);
    setEnrollTeamLeaderNameError(false);
    setEnrollTeamNameError(false);
    setEnrollTeamName("");
    setEnrollTeamLeaderName("");
    setEnrollTeamMemberLength("");
  };

  const enrollTournament = (info) => {
    app
      .firestore()
      .collection("tournament")
      .doc(info.title)
      .collection("enroll")
      .where("uid", "==", authUserId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setIsUserEnrolled(true);
        });
      });

    app
      .firestore()
      .collection("tournament")
      .doc(info.title)
      .collection("enroll")
      .get()
      .then((snapshot) => {
        setEnrolledSize(snapshot.size);
      });

    setTournamentEnrollModal(true);
    setTempInfo(info);
  };

  const submitEnrollment = async () => {
    setTournamentIEnrolled([]);
    setOpenProgress(true);
    setEnrollTeamNameError(false);
    setEnrollTeamMemberLengthError(false);
    setEnrollTeamLeaderNameError(false);
    setTimeout(() => {
      setOpenProgress(false);
    }, 400);

    if (isUserEnrolled) {
      setEnrollSnackAgain(true);
      return;
    } else if (enrollTeamName === "") {
      setEnrollTeamNameError(true);
      return;
    } else if (enrollTeamLeaderName === "") {
      setEnrollTeamLeaderNameError(true);
      return;
    } else if (enrollTeamMemberLength === "") {
      setEnrollTeamMemberLengthError(true);
      return;
    }

    app
      .firestore()
      .collection("tournament")
      .doc(tempInfo.title)
      .collection("enroll")
      .add({
        facility: tempInfo.facility,
        camp: tempInfo.camp,
        title: tempInfo.title,
        recruitEndDate: new Date(tempInfo.recruitEndDate),
        currentEnrolledTeamCount: tempInfo.currentEnrolledTeamCount,
        enrollNumber: tempInfo.enrollNumber,
        prize: tempInfo.prize,
        sport: tempInfo.sport,
        enrollTeamName,
        enrollTeamLeaderName,
        enrollTeamMemberLength,
        enrollTime: new Date(),
        uid: authUserId,
      });

    app
      .firestore()
      .collection("tournament")
      .doc(tempInfo.title)
      .update({
        currentEnrolledTeamCount: enrolledSize + 1,
      });

    app
      .firestore()
      .collectionGroup("enroll")
      .where("uid", "==", authUserId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setTournamentIEnrolled((oldArray) => [
            ...oldArray,
            {
              title: doc.data().title,
              recruitEndDate: doc.data().recruitEndDate.seconds * 1000,
              currentEnrolledTeamCount: doc.data().currentEnrolledTeamCount,
              enrollNumber: doc.data().enrollNumber,
            },
          ]);
        });
      });

    setEnrollSnack(true);
    setTimeout(() => {
      detailModalClose();
    }, 1200);
  };

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

  const CollapsibleRow = (props) => {
    const { team } = props;
    const [collapse, setCollapse] = React.useState(false);

    return (
      <React.Fragment key={team.key}>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setCollapse(!collapse)}
            >
              {collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {team.enrollTeamName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  팀 상세정보
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>팀명</TableCell>
                      <TableCell>팀 대표선수</TableCell>
                      <TableCell align="right">팀원 수</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {team.enrollTeamName}
                      </TableCell>
                      <TableCell>{team.enrollTeamLeaderName}</TableCell>
                      <TableCell align="right">
                        {team.enrollTeamMemberLength}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  const showTournamentIEnrolled = (tournamentName) => {
    app
      .firestore()
      .collection("tournament")
      .doc(tournamentName)
      .collection("enroll")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setEnrolledTeam((oldArray) => [
            ...oldArray,
            {
              enrollTeamLeaderName: doc.data().enrollTeamLeaderName,
              enrollTeamMemberLength: doc.data().enrollTeamMemberLength,
              enrollTeamName: doc.data().enrollTeamName,
              uid: doc.data().uid,
              key: doc.id,
            },
          ]);
        });
      });

    setTournamentIEnrolledModal(true);
  };

  const closeEnrolledModal = () => {
    setTournamentIEnrolledModal(false);
    setEnrolledTeam([]);
  };

  const showTournament = (tournament) => {
    setTournamentDetailModal(true);

    app
      .firestore()
      .collection("tournament")
      .doc(tournament.title)
      .get()
      .then((snapshot) => {
        setTournamentDetail({
          isRecruitNotEnd:
            new Date().getTime() < snapshot.data().recruitEndDate.seconds * 1000
              ? true
              : false,
          isRecruitFull:
            snapshot.data().currentEnrolledTeamCount <
            snapshot.data().enrollNumber
              ? false
              : true,
          title: tournament.title,
          camp: snapshot.data().camp,
          facility: snapshot.data().facility,
          enrollNumber: snapshot.data().enrollNumber,
          currentEnrolledTeamCount: snapshot.data().currentEnrolledTeamCount,
          prize: snapshot.data().prize,
          recruitEndDate: snapshot.data().recruitEndDate.seconds * 1000,
          sport: snapshot.data().sport,
          startTournamentDate:
            snapshot.data().startTournamentDate.seconds * 1000,
          uid: snapshot.data().uid,
        });
      });
  };

  React.useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setAuthUserId(user.uid);
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

        app
          .firestore()
          .collectionGroup("enroll")
          .where("uid", "==", user.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              setTournamentIEnrolled((oldArray) => [
                ...oldArray,
                {
                  title: doc.data().title,
                  recruitEndDate: doc.data().recruitEndDate.seconds * 1000,
                  currentEnrolledTeamCount: doc.data().currentEnrolledTeamCount,
                  enrollNumber: doc.data().enrollNumber,
                },
              ]);
            });
          });
      }
    });

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

    app
      .firestore()
      .collection("tournament")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setTournaments((oldArray) => [
            ...oldArray,
            {
              title: doc.id,
              recruitEndDate: doc.data().recruitEndDate.seconds * 1000,
              currentEnrolledTeamCount: doc.data().currentEnrolledTeamCount,
              enrollNumber: doc.data().enrollNumber,
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
            체육대회
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
              체육대회
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
                    label="체육대회"
                    value="1"
                    icon={<GroupIcon />}
                  />
                  <BottomNavigationAction
                    classes={{
                      label: classes.navigationStyle,
                      selected: classes.navigationSelected,
                    }}
                    label="내가 참여하는 체육대회"
                    value="3"
                    icon={<EmojiPeopleIcon />}
                  />
                  <BottomNavigationAction
                    classes={{
                      label: classes.navigationStyle,
                      selected: classes.navigationSelected,
                    }}
                    label="자유게시판"
                    value="2"
                    icon={<FormatQuoteIcon />}
                  />
                </BottomNavigation>
              </Grid>
            </div>
          </Container>
        </div>
        {value === "2" ? (
          <div>
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
                                borderBottom:
                                  "1px solid rgba(224, 224, 224, 1)",
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
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
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
                      <Backdrop
                        className={classes.backdrop}
                        open={openProgress}
                      >
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
                                borderBottom:
                                  "1px solid rgba(224, 224, 224, 1)",
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
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
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
                      <Backdrop
                        className={classes.backdrop}
                        open={openProgress}
                      >
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
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
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
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
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
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
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
          </div>
        ) : value === "1" ? (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {tournaments.length === 0 ? (
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.typography}
                >
                  개최된 체육대회가 존재하지 않습니다.
                </Typography>
              ) : (
                tournaments.map((tournament) => (
                  <Grid item key={tournament.title} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardHeader
                        style={{ padding: "8px" }}
                        avatar={
                          new Date().getTime() < tournament.recruitEndDate ? (
                            tournament.currentEnrolledTeamCount <
                            tournament.enrollNumber ? (
                              <Chip
                                label="모집중"
                                size="small"
                                color="primary"
                              />
                            ) : (
                              <Chip
                                label="모집완료"
                                size="small"
                                color="secondary"
                              />
                            )
                          ) : (
                            <Chip label="모집종료" size="small" />
                          )
                        }
                      />
                      <CardContent
                        className={classes.cardContent}
                        style={{ paddingTop: 5, paddingBottom: 0 }}
                      >
                        <Typography
                          variant="h5"
                          component="h2"
                          className={classes.typography}
                        >
                          {tournament.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.typography}
                          style={{ paddingTop: 5 }}
                        >
                          모집마감일:&nbsp;
                          {moment(new Date(tournament.recruitEndDate)).format(
                            "YYYY년 M월 D일"
                          )}
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          color="primary"
                          onClick={() => showTournament(tournament)}
                        >
                          자세히
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
            <Modal
              className={classes.modal}
              open={tournamentDetailModal}
              onClose={detailModalClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Slide direction="up" in={tournamentDetailModal}>
                <div className={classes.papers}>
                  <Container component="main" maxWidth="md">
                    <Typography className={classes.modalTypography}>
                      {tournamentDetail.title}
                    </Typography>
                    <TableContainer
                      component={Paper}
                      className={classes.tableContainers}
                    >
                      <Table>
                        <TableBody>
                          <TableRow key="title">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              개최부대
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {tournamentDetail.camp}
                            </TableCell>
                          </TableRow>
                          <TableRow key="writerName">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              체육시설
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {tournamentDetail.facility}
                            </TableCell>
                          </TableRow>
                          <TableRow key="content">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              포상
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {tournamentDetail.prize}
                            </TableCell>
                          </TableRow>

                          <TableRow key="sport">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              종목
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {tournamentDetail.sport}
                            </TableCell>
                          </TableRow>

                          <TableRow key="enrollNumber">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              참가팀 수
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {tournamentDetail.enrollNumber}
                            </TableCell>
                          </TableRow>

                          <TableRow key="currentEnrolledTeamCount">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              현재 참가팀 수
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {tournamentDetail.currentEnrolledTeamCount}
                            </TableCell>
                          </TableRow>

                          <TableRow key="recruitEndDate">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              모집 마감일
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {moment(
                                new Date(tournamentDetail.recruitEndDate)
                              ).format("YYYY년 M월 D일")}
                            </TableCell>
                          </TableRow>

                          <TableRow key="startTournamentDate">
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableRow}
                            >
                              체육대회 시작일
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.tableCell}
                            >
                              {moment(
                                new Date(tournamentDetail.startTournamentDate)
                              ).format("YYYY년 M월 D일 ")}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <span className={classes.modalButton}>
                      {tournamentDetail.isRecruitNotEnd ? (
                        !tournamentDetail.isRecruitFull ? (
                          <Button
                            onClick={() => enrollTournament(tournamentDetail)}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                          >
                            참가하기
                          </Button>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <span></span>
                      )}

                      <Modal
                        className={classes.modal}
                        open={tournamentEnrollModal}
                        onClose={closeEnrollModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Slide direction="up" in={tournamentEnrollModal}>
                          <div className={classes.papers}>
                            <Container component="main" maxWidth="md">
                              <Typography className={classes.modalTypography}>
                                {tournamentDetail.title} &nbsp; 참가신청서
                              </Typography>
                              <TableContainer
                                component={Paper}
                                className={classes.tableContainer}
                              >
                                <Table>
                                  <TableBody>
                                    <TableRow key="teamName">
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.tableRow}
                                      >
                                        팀명
                                      </TableCell>
                                      <TableCell style={{ padding: 0 }}>
                                        <FormControl
                                          fullWidth
                                          error={enrollTeamNameError}
                                        >
                                          <Input
                                            value={enrollTeamName}
                                            onChange={({ target: { value } }) =>
                                              setEnrollTeamName(value)
                                            }
                                            type="text"
                                            className={classes.textField}
                                            placeholder="팀명을 입력해주십시오."
                                          />
                                        </FormControl>
                                      </TableCell>
                                    </TableRow>

                                    <TableRow key="teamLeaderName">
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.tableRow}
                                      >
                                        팀대표 성명
                                      </TableCell>
                                      <TableCell style={{ padding: 0 }}>
                                        <FormControl
                                          fullWidth
                                          error={enrollTeamLeaderNameError}
                                        >
                                          <Input
                                            value={enrollTeamLeaderName}
                                            onChange={({ target: { value } }) =>
                                              setEnrollTeamLeaderName(value)
                                            }
                                            type="text"
                                            className={classes.textField}
                                            placeholder="팀대표 성명을 입력해주십시오."
                                          />
                                        </FormControl>
                                      </TableCell>
                                    </TableRow>

                                    <TableRow key="teamMemberLength">
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.tableRow}
                                      >
                                        팀원 수
                                      </TableCell>
                                      <TableCell style={{ padding: 0 }}>
                                        <FormControl
                                          fullWidth
                                          error={enrollTeamMemeberLengthError}
                                        >
                                          <Input
                                            value={enrollTeamMemberLength}
                                            onChange={({ target: { value } }) =>
                                              setEnrollTeamMemberLength(value)
                                            }
                                            type="text"
                                            className={classes.textField}
                                            placeholder="팀원 수를 입력해주십시오."
                                          />
                                        </FormControl>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>

                              <span className={classes.modalButton}>
                                <Button
                                  onClick={submitEnrollment}
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                                >
                                  제출하기
                                </Button>
                                <Backdrop
                                  className={classes.backdrop}
                                  open={openProgress}
                                >
                                  <CircularProgress color="inherit" />
                                </Backdrop>
                                <Snackbar
                                  autoHideDuration={1200}
                                  open={enrollSnack}
                                  onClose={() => setEnrollSnack(false)}
                                  TransitionComponent={Slide}
                                  message="체육대회 참가신청이 완료되었습니다."
                                />
                                <Snackbar
                                  autoHideDuration={1200}
                                  open={enrollSnackAgain}
                                  onClose={() => setEnrollSnackAgain(false)}
                                  TransitionComponent={Slide}
                                  message="이미 해당 체육대회에 참가하셨습니다."
                                />
                                <Button
                                  onClick={closeEnrollModal}
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
                      <Button
                        onClick={detailModalClose}
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
          </Container>
        ) : (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {tournamentIEnrolled.length === 0 ? (
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.typography}
                >
                  참여하신 체육대회가 없습니다.
                </Typography>
              ) : (
                tournamentIEnrolled.map((tournament) => (
                  <Grid item key={tournament.title} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardHeader
                        style={{ padding: "8px" }}
                        avatar={
                          new Date().getTime() < tournament.recruitEndDate ? (
                            tournament.currentEnrolledTeamCount <
                            tournament.enrollNumber ? (
                              <Chip
                                label="모집중"
                                size="small"
                                color="primary"
                              />
                            ) : (
                              <Chip
                                label="모집완료"
                                size="small"
                                color="secondary"
                              />
                            )
                          ) : (
                            <Chip label="모집종료" size="small" />
                          )
                        }
                      />
                      <CardContent
                        className={classes.cardContent}
                        style={{ paddingTop: 5, paddingBottom: 0 }}
                      >
                        <Typography
                          variant="h5"
                          component="h2"
                          className={classes.typography}
                        >
                          {tournament.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.typography}
                          style={{ paddingTop: 5 }}
                        >
                          모집마감일:&nbsp;
                          {moment(new Date(tournament.recruitEndDate)).format(
                            "YYYY년 M월 D일"
                          )}
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          color="primary"
                          onClick={() =>
                            showTournamentIEnrolled(tournament.title)
                          }
                        >
                          자세히
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
              <Modal
                className={classes.modal}
                open={tournamentIEnrolledModal}
                onClose={closeEnrolledModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Slide direction="up" in={tournamentIEnrolledModal}>
                  <div className={classes.papers}>
                    <Container component="main" maxWidth="md">
                      <Typography className={classes.modalTypography}>
                        체육대회 관리하기
                      </Typography>
                      <TableContainer
                        component={Paper}
                        className={classes.tableContainer}
                      >
                        <Table>
                          <TableBody>
                            {enrolledTeam.length === 0 ? (
                              <TableRow>
                                <TableCell>아직 참가 팀이 없습니다.</TableCell>
                              </TableRow>
                            ) : (
                              enrolledTeam.map((team) => (
                                <CollapsibleRow key={team.key} team={team} />
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <span className={classes.modalButtons}>
                        <Button
                          onClick={closeEnrolledModal}
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
            </Grid>
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
  );
};

export default BoardPage;
