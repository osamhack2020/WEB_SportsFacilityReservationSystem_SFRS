const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment");

admin.initializeApp();
const db = admin.firestore();

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule("1 0 * * *")
  .timeZone("Asia/Seoul")
  .onRun((context) => {
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
                  .where(
                    "start",
                    ">=",
                    new Date(moment().startOf("day").toDate().getTime())
                  )
                  .where(
                    "start",
                    "<=",
                    new Date(moment().endOf("day").toDate().getTime())
                  )
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

                      printMaxPossibleSchedule();

                      let lucky =
                        uniqueMaxSchedule[
                          Math.floor(
                            Math.random() * (uniqueMaxSchedule.length - 1)
                          )
                        ];

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
    return null;
  });

//함수 deploy 방법 : firebase deploy --only functions
