import React from "react";
import app from "./firebase";
import moment from "moment";
import Button from "@material-ui/core/Button";

const Test = () => {
  // const db = app.firestore();
  // db.collection("camp")
  //   .get()
  //   .then((snapshot) => {
  //     // 캠프 컬렉션안의 모든 부대를 돈다.
  //     snapshot.forEach((doc) => {
  //       db.collection("camp")
  //         .doc(doc.id)
  //         .collection("facility")
  //         .get()
  //         .then((snapshot) => {
  //           // 부대내의 모든 체육시설 접근한다.
  //           snapshot.forEach((doc) => {
  //             const startTime = moment()
  //               .startOf("day")
  //               .subtract(1, "days")
  //               .toDate()
  //               .getTime();
  //             const endTime = moment()
  //               .endOf("day")
  //               .subtract(1, "days")
  //               .toDate()
  //               .getTime();

  //             db.collection("camp")
  //               .doc(doc.id)
  //               .collection("facility")
  //               .doc(doc.id)
  //               .collection("reservation")
  //               .where("start", ">=", new Date(startTime))
  //               .where("start", "<=", new Date(endTime))
  //               .get()
  // .then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     console.log(doc.data().start);
  //     console.log(doc.data().end);
  //   });
  // });
  //           });
  //         });
  //     });
  //   });

  const startTime = moment().startOf("day").add(1, "days").toDate().getTime();
  const endTime = moment().endOf("day").add(1, "days").toDate().getTime();
  const [array, setArray] = React.useState([]);
  const [maxScheduleCount, setMaxScheduleCount] = React.useState(0);
  const [maxScheduleCandidate, setMaxScheduleCandidate] = React.useState([]);
  const [uniqueMaxSchedule, setUniqueMaxSchedule] = React.useState([]);

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

          // console.log(doc.id);
          // console.log(doc.data().title);
          // console.log(doc.data().start.toDate());
          // console.log(doc.data().end.toDate());
        });
      });
  }, [startTime, endTime]);

  const clickHandle = () => {
    console.log(array);
  };

  const maxSchedule = () => {
    let endPoint = array[0].end;
    let temp = [array[0].title];

    for (let i = 0; i < array.length; i++) {
      if (endPoint <= array[i].start) {
        endPoint = array[i].end;
        temp.push(array[i].title);
      }
    }
    console.log(temp);
    setMaxScheduleCandidate((oldArray) => [...oldArray, temp]);
    setMaxScheduleCount(temp.length);
  };

  const untilNothingLeft = async (arr, line) => {
    if (arr.length === 1) {
      line.push(array[arr[0]].title);
      if (line.length === maxScheduleCount) {
        for (let k = 0; k < maxScheduleCandidate.length; k++) {
          if (
            !line.every(
              (value, index) => value === maxScheduleCandidate[k][index]
            )
          ) {
            await setMaxScheduleCandidate((oldArray) => [...oldArray, line]);
          }
        }
      }
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      let tempArray = line.slice();
      tempArray.push(array[arr[i]].title);
      untilNothingLeft(returnChildSchedule(arr[i]), tempArray);
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
        untilNothingLeft(temp, [array[i].title]);
      }
    }
  };

  const printMaxPossibleSchedule = () => {
    let arr = maxScheduleCandidate.slice();
    let uniqueArr = [];
    for (let k = 0; k < arr.length; k++) {
      uniqueArr.push(arr[k]);
      for (let i = k + 1; i < arr.length; i++) {
        if (arr[k].every((value, index) => value === arr[i][index])) {
          arr.splice(i, 1);
        }
      }
    }

    let realUniqueArray = [];
    for (let k = 0; k < uniqueArr.length; k++) {
      realUniqueArray.push(uniqueArr[k]);
      for (let i = k + 1; i < uniqueArr.length; i++) {
        if (
          uniqueArr[k].every((value, index) => value === uniqueArr[i][index])
        ) {
          uniqueArr.splice(i, 1);
        }
      }
    }

    setUniqueMaxSchedule(realUniqueArray);
    console.log(realUniqueArray);
    console.log(uniqueMaxSchedule);
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
        test
      </Button>
      <Button
        onClick={printMaxPossibleSchedule}
        variant="contained"
        color="primary"
      >
        가능한 경우 출력
      </Button>
    </div>
  );
};

export default Test;
