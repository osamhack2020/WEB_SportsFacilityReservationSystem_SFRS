

# <img src="https://user-images.githubusercontent.com/68759940/97770133-1b1d6680-1b74-11eb-927f-39b23ce15d5a.JPG" width="50%"></img>
국군장병들의 원활한 체육시설 이용을 위한 체육시설예약체계


## 팀소개 및 프로잭트 설명 동영상
- 안녕하십니까 체육시설 예약체계를 만들게 된 해군 일병 정영안입니다.  이 체계를 만들게 된 계기는 제가 체육시설을 사용하면서 불편했던 점을 해결하기 위해 만들어 보았습니다. 기존의 체육시설 예약은 사용을 원하는 자가 신청을 하고 관리자가 승인, 미승인 처리를 해주는 시스템이었습니다. 그래서 그러한 점에서 불공정이 존재했고 이를 해결하기 위해서 만들었다.

- 국군 장병들의 원활한 체육시설 사용을 위해 기존의 관리자가 승인 처리하는 예약체계가 아닌 확률적으로 예약이 이루어진다. 길게보면 모두가 공평한 체육시설 이용 순서를 가지게 될 것이다. 또한 이 체계에서 체육대회 이벤트를 만들어 국군장병들의 스트레스를 풀수 있는 중요한 순기능을 제공할 것입니다. 

- 이 체계는 국군장병들의 원활한 접속을 위해 외부 인터넷망을 사용하면 좋을 것 같습니다. 컴퓨터 접근이 용이한 장병들도 있지만 그렇지 못한 장병들이 훨씬 많으므로 인터넷망을 사용하여 장병들의 핸드폰 사용 가능 시간에 예약을 진행하고 체육시설 사용자가 예약자가 맞는 지 확인도 가능합니다.

- 예약체계에서 예약을 진행하게 되면 필연적으로 겹치는 예약들이 발생합니다. 이러한 경우 해당 체육시설을 가장 많은 팀이 사용할 수 있는 경우의 수를 선택하고 동일한 수의 팀이 사용가능한 스케줄이 나온다면 그 중에 하나를 확률적으로 골라 예약이 완료되도록 하였습니다. 이렇게 가장 많은 팀이 사용할 수 있는 경우를 선택하도록 유도하는 알고리즘을 설계하여 사용자들이 이타심을 가지고 최대한 많은 팀들이 체육시설을 이용할 수 있도록 만들었습니다. 


## 기능 설계
 -  발사믹, 카카오 오븐 등 본인이 편한 목업 프레임워크를 이용하여 제작 후 링크 
 - 수기로 작성시 찍어서 올려주세요
 
## Live Demo
 -  Firebase Hosting 기능을 이용하여 체육시설 예약체계를 한번 사용해보십시오! click

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used) 
### Server(back-end)
 -  Node.js
 -  Firebase Cloud Firestore
 -  Firebase Authentication
 -  Firebase Functions  
### front-end
 -  react.js
 -  Create React App
 -  Material UI
 -  FontAwesome
 -  Moment.js
 -  react-big-calendar
 -  React Router

## 설치 안내 (Installation Process)
```bash
$ git clone https://github.com/osamhack2020/WEB_SportsFacilityReservationSystem_SFRS.git
$ yarn 
$ yarn start
```

## 프로젝트 사용법 (Getting Started)
- 위의 설명대로 yarn start 명령어를 치면 인터넷 브라우저가 뜰것이다. 
- 그럼 회원가입을 이용하여 체육시설 예약체계를 사용하면 된다.

 
## 팀 정보 (Team Information)
- 정영안 (duddks1115@gmail.com), Github Id: younganJung1115

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osamhack2020/WEB_SportsFacilityReservationSystem_SFRS/blob/master/license.md)
<Project Name>

Copyright © 2020 Youngan Jung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
