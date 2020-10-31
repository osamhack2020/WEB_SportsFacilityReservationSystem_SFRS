import React from "react";
import app from "./firebase";
import moment from "moment";
import Button from "@material-ui/core/Button";

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
      .doc("교육사령부")
      .collection("facility")
      .doc("농구장")
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
              id: doc.id,
              start: doc.data().start.seconds,
              end: doc.data().end.seconds,
            },
          ]);
        });
      });
  }, [startTime, endTime]);

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const getEveryReservation = () => {
    let arr = [];
    let maxScheduleCandidate = [];
    let uniqueMaxSchedule = [];
    let maxScheduleCount = 0;

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
      uniqueMaxSchedule = arr;
    };

    const returnChildSchedule = (index) => {
      let temp = [];
      for (let i = index + 1; i < arr.length; i++) {
        if (arr[i].start >= arr[index].end) temp.push(i);
      }
      return temp;
    };

    const untilNothingLeft = (arrr, line) => {
      if (arrr.length === 0) return;

      for (let i = 0; i < arrr.length; i++) {
        let tempArray = line.slice();
        tempArray.push(arr[arrr[i]].id);

        if (tempArray.length === maxScheduleCount)
          maxScheduleCandidate.push(tempArray);
        else untilNothingLeft(returnChildSchedule(arrr[i]), tempArray);
      }
    };

    const db = app.firestore();

    db.collection("camp")
      .get()
      .then((snapshot) => {
        // 캠프 컬렉션안의 모든 부대를 돈다.
        snapshot.forEach((doc) => {
          db.collection("camp")
            .doc(doc.id)
            .collection("facility")
            .get()
            .then((snap) => {
              // 부대내의 모든 체육시설 접근한다.
              snap.forEach((document) => {
                db.collection("camp")
                  .doc(doc.id)
                  .collection("facility")
                  .doc(document.id)
                  .collection("reservation")
                  .where("start", ">=", new Date(startTime))
                  .where("start", "<=", new Date(endTime))
                  .get()
                  .then(async (snapshots) => {
                    arr = [];
                    snapshots.forEach((docs) => {
                      arr.push({
                        id: docs.id,
                        start: docs.data().start.seconds,
                        end: docs.data().end.seconds,
                        camp: docs.data().camp,
                        facility: docs.data().facility,
                      });
                    });
                    if (arr.length !== 0) {
                      maxScheduleCandidate = [];
                      uniqueMaxSchedule = [];
                      maxScheduleCount = 0;

                      //가장 긴 스케줄 구하기
                      let endPoint = arr[0].end;
                      let temp = [arr[0].id];

                      for (let i = 1; i < arr.length; i++) {
                        if (endPoint <= arr[i].start) {
                          endPoint = arr[i].end;
                          temp.push(arr[i].id);
                        }
                      }

                      maxScheduleCandidate.push(temp);
                      console.log("가장 긴 스케줄");
                      console.log(temp);

                      maxScheduleCount = temp.length;

                      for (
                        let i = 0;
                        i < arr.length - maxScheduleCount + 1;
                        i++
                      ) {
                        let tempp = [];
                        for (let j = i + 1; j < arr.length; j++) {
                          if (arr[i].end <= arr[j].start) tempp.push(j);
                        }
                        if (tempp !== []) untilNothingLeft(tempp, [arr[i].id]);
                      }

                      console.log("가능한 모든 스케줄");
                      console.log(maxScheduleCandidate);

                      printMaxPossibleSchedule();

                      console.log("중복제거한 max schedule");
                      console.log(uniqueMaxSchedule);

                      let lucky =
                        uniqueMaxSchedule[
                          Math.floor(
                            Math.random() * (uniqueMaxSchedule.length - 1)
                          )
                        ];

                      console.log("survived 스케줄");
                      console.log(lucky);
                      console.log("전체");
                      console.log(arr);

                      let saved = false;
                      arr.forEach((reservation) => {
                        lucky.forEach((luck) => {
                          if (luck === reservation.id) saved = true;
                        });
                        if (!saved) {
                          db.collection("camp")
                            .doc(reservation.camp)
                            .collection("facility")
                            .doc(reservation.facility)
                            .collection("reservation")
                            .doc(reservation.id)
                            .delete();
                        }
                        saved = false;
                      });
                    }
                  });
              });
            });
        });
      });
  };

  const clickHandle = () => {
    console.log(array);
  };

  const maxSchedule = () => {
    let endPoint = array[0].end;
    let temp = [array[0].id];

    for (let i = 1; i < array.length; i++) {
      if (endPoint <= array[i].start) {
        endPoint = array[i].end;
        temp.push(array[i].id);
      }
    }
    setMaxScheduleCandidate((oldArray) => [...oldArray, temp]);
    setMaxScheduleCount(temp.length);
  };

  const untilNothingLeft = (arr, line) => {
    if (arr.length === 0) return;

    for (let i = 0; i < arr.length; i++) {
      let tempArray = line.slice();
      tempArray.push(array[arr[i]].id);

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
      if (temp !== []) untilNothingLeft(temp, [array[i].id]);
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
      <Button onClick={getEveryReservation} variant="contained" color="primary">
        모든 부대 체육시설 조회하기
      </Button>
    </div>
  );
};

export default Test;
