import React from "react";
import app from "./firebase";
import moment from "moment";

const IndexPage = () => {
  const db = app.firestore();

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

  const startTime = moment()
    .startOf("day")
    .subtract(1, "days")
    .toDate()
    .getTime();
  const endTime = moment().endOf("day").subtract(1, "days").toDate().getTime();

  db.collection("camp")
    .doc("10함대")
    .collection("facility")
    .doc("야구장")
    .collection("reservation")
    .where("start", ">=", new Date(startTime))
    .where("start", "<=", new Date(endTime))
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data().start.toDate());
        console.log(doc.data().end.toDate());
      });
    });

  return (
    <div>
      <h2>This is index page~</h2>
    </div>
  );
};

export default IndexPage;
