import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import app from "./firebase";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  top: {
    marginTop: theme.spacing(4),
    alignItems: "center",
  },
  root: {
    width: '100%',
    alignItems: "center",
    backgroundColor: "#0f4c8133",
    marginTop: theme.spacing(2),
  },
  text: {
    textAlign: 'center'
  }
}));

const CampList = () => {
  const classes = useStyles();
  const [camps, setCamps] = React.useState([]);
  // const [facilities, setFacilities] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      const db = app.firestore();
      // db.collection("camp").get().then(snapshot => {
      //   snapshot.forEach(doc => {
      //     setCamps(oldArray => [...oldArray, { name: doc.id }]);
      //   });
      // });
      db.collection("camp").get().then(snapshot => {
        snapshot.forEach(doc => {
          db.collection("camp").doc(doc.id).collection('facility').get().then(snapshot => {
            snapshot.forEach(document => {
              const startTime = moment().startOf('day').subtract(1, 'days').toDate().getTime();
              const endTime = moment().endOf('day').subtract(1, 'days').toDate().getTime();

              db.collection("camp").doc(doc.id).collection('facility').doc(document.id).collection('reservation').where('start', '>=', new Date(startTime)).where('start', '<=', new Date(endTime)).get().then(snapshot => {
                snapshot.forEach(docu => {
                  console.log(docu.data().start.toDate())
                  console.log(docu.data().end.toDate())
                  console.log(docu.data().start.toDate() > docu.data().end.toDate())
                  console.log(docu.data().title)
                })

              })
            })
          })
        });
      });
    };
    fetchData();
  }, []);

  const toFacility = (name) => {
    setCamps([])
    const db = app.firestore();
    db.collection("camp").doc(name).get().then(doc => {
      const data = doc.data();
      for (let i = 1; i < Object.keys(data).length + 1; i++) {
        setCamps(oldArray => [...oldArray, { name: data[i] }]);
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        align="center"
        component="h1"
        variant="h5"
        className={classes.top}
      >
        부대선택
      </Typography>

      <Box boxShadow={5}>
        <div className={classes.root}>
          <List component="nav" className="campList">
            {
              camps.map(camp => (
                <ListItem button key={camp.name} onClick={() => toFacility(camp.name)} >
                  <ListItemText primary={camp.name} className={classes.text} />
                </ListItem>
              ))
            }
          </List>
        </div>
      </Box >

    </Container>
  );
}

export default CampList;
