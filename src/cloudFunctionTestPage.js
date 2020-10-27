import React from "react";
import app from "./firebase";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { Bracket } from "react-tournament-bracket";

const Test = () => {
  const [array, setArray] = React.useState([]);
  const [maxScheduleCount, setMaxScheduleCount] = React.useState(0);
  const [maxScheduleCandidate, setMaxScheduleCandidate] = React.useState([]);
  const [uniqueMaxSchedule, setUniqueMaxSchedule] = React.useState([]);

  const startTime = moment().add(1, "days").startOf("day").toDate().getTime();
  const endTime = moment().add(1, "days").endOf("day").toDate().getTime();

  React.useEffect(() => {
    app
      .firestore()
      .collection("camp")
      .doc("1함대")
      .collection("facility")
      .doc("풋살장")
      .collection("reservation")
      .where("end", ">=", new Date(startTime))
      .where("end", "<=", new Date(endTime))
      .orderBy("end")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setArray((oldArray) => [
            ...oldArray,
            {
              title: doc.data().title,
              documentId: doc.id,
              start: doc.data().start.seconds,
              end: doc.data().end.seconds,
            },
          ]);
        });
      });
  }, [startTime, endTime]);

  // const getEveryReservation = () => {
  //   const db = app.firestore();
  //   db.collection("camp")
  //     .get()
  //     .then((snapshot) => {
  //       // 캠프 컬렉션안의 모든 부대를 돈다.
  //       snapshot.forEach((doc) => {
  //         db.collection("camp")
  //           .doc(doc.id)
  //           .collection("facility")
  //           .get()
  //           .then((snapshot) => {
  //             // 부대내의 모든 체육시설 접근한다.
  //             snapshot.forEach((doc) => {
  //               const startTime = moment()
  //                 .startOf("day")
  //                 .toDate()
  //                 .getTime();
  //               const endTime = moment()
  //                 .endOf("day")
  //                 .toDate()
  //                 .getTime();

  //               db.collection("camp")
  //                 .doc(doc.id)
  //                 .collection("facility")
  //                 .doc(doc.id)
  //                 .collection("reservation")
  //                 .where("start", ">=", new Date(startTime))
  //                 .where("start", "<=", new Date(endTime))
  //                 .get()
  //                 .then((snapshot) => {
  //                   snapshot.forEach((doc) => {
  //                     console.log(doc.data().start);
  //                     console.log(doc.data().end);
  //                   });
  //                 });
  //             });
  //           });
  //       });
  //     });
  // }

  const clickHandle = () => {
    console.log(array);
  };

  const maxSchedule = () => {
    let endPoint = array[0].end;
    let temp = [array[0].title];

    for (let i = 1; i < array.length; i++) {
      if (endPoint <= array[i].start) {
        endPoint = array[i].end;
        temp.push(array[i].title);
      }
    }
    setMaxScheduleCandidate((oldArray) => [...oldArray, temp]);
    setMaxScheduleCount(temp.length);
  };

  const untilNothingLeft = (arr, line) => {
    if (arr.length === 0) return;

    for (let i = 0; i < arr.length; i++) {
      let tempArray = line.slice();
      tempArray.push(array[arr[i]].title);

      if (tempArray.length === maxScheduleCount)
        setMaxScheduleCandidate((oldArray) => [...oldArray, tempArray]);
      else untilNothingLeft(returnChildSchedule(arr[i]), tempArray);
    }
  };

  const returnChildSchedule = (index) => {
    let temp = [];
    for (let i = index + 1; i < array.length; i++) {
      if (array[i].start >= array[index].end) temp.push(i);
    }
    return temp;
  };

  const allPossibleSchedule = () => {
    for (let i = 0; i < array.length - maxScheduleCount + 1; i++) {
      let temp = [];
      for (let j = i + 1; j < array.length; j++) {
        if (array[i].end <= array[j].start) temp.push(j);
      }
      if (temp !== []) untilNothingLeft(temp, [array[i].title]);
    }
  };

  const printMaxPossibleSchedule = () => {
    let arr = maxScheduleCandidate.slice();

    for (let k = 0; k < arr.length; k++) {
      let uniqueArrIndex = [];
      for (let i = k + 1; i < arr.length; i++) {
        if (arr[k].every((value, index) => value === arr[i][index])) {
          uniqueArrIndex.push(i);
        }
      }

      for (let j = 0; j < uniqueArrIndex.length; j++) {
        arr.splice(uniqueArrIndex[j] - j, 1);
      }
    }

    setUniqueMaxSchedule(arr);
    console.log(uniqueMaxSchedule);
  };

  const selectOneMaximumSchedule = () => {
    console.log(
      uniqueMaxSchedule[
        Math.floor(Math.random() * (uniqueMaxSchedule.length - 1))
      ]
    );
  };

  const game = {
    id: 1,
    name: "Rumble in the Jungle",
    bracketLabel: "BO1",
    scheduled: 1526130150000,
    court: {
      name: "test",
      venue: {
        name: "Gabba",
      },
    },
    sides: {
      home: {
        score: {
          score: 1,
        },
        team: {
          id: 22,
          name: "Australia",
        },
        seed: {
          displayName: "string",
          rank: 1,
          // sourceGame: Game,
          sourcePool: {},
        },
      },
      visitor: {
        score: {
          score: 0,
        },
        team: {
          id: 23,
          name: "USA",
        },
      },
    },
  };

  return (
    <div>
      <h2>This is index page~</h2>
      <Button onClick={clickHandle} variant="contained" color="primary">
        array 만들기
      </Button>{" "}
      <Button onClick={maxSchedule} variant="contained" color="primary">
        최대 가능 스케줄
      </Button>
      <Button onClick={allPossibleSchedule} variant="contained" color="primary">
        가능한 모든 스케줄 확인
      </Button>
      <Button
        onClick={printMaxPossibleSchedule}
        variant="contained"
        color="primary"
      >
        가능한 경우 출력
      </Button>
      <Button
        onClick={selectOneMaximumSchedule}
        variant="contained"
        color="primary"
      >
        여러가지 가능한 스케줄 중에서 랜덤으로 하나 고르기
      </Button>
      <Bracket game={game} />
    </div>
  );
};

export default Test;
