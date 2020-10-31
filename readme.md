# <img src="https://user-images.githubusercontent.com/68759940/97770133-1b1d6680-1b74-11eb-927f-39b23ce15d5a.JPG" width="50%"></img>
국군장병들의 원활한 체육시설 이용을 위한 체육시설예약체계


## 팀소개 및 프로젝트 설명 동영상

  [![Watch the video](https://img.youtube.com/vi/z2MGD6jGkZg/0.jpg)](https://www.youtube.com/watch?v=z2MGD6jGkZg)

### 체육시설 예약체계를 만들게 된 계기

- 안녕하십니까 체육시설 예약체계를 만들게 된 해군 일병 정영안입니다.  이 체계를 만들게 된 계기는 제가 체육시설을 사용하면서 불편했던 점을 해결해보자는 생각이 들었기 때문입니다. 기존의 체육시설 예약은 사용자가 신청을 하고 관리자가 승인, 미승인 처리를 해주는 시스템이었습니다. 이러한 방식은 관리자가 매일 승인처리를 해줘야한다는 불편함과 관리자의 개입으로 불공정한 예약이 진행될 수 있다는 단점이 있습니다. 또한 예약시스템이 없는 체육시설은 선착순으로 먼저온 사용자가 뒷 사용자를 배려하지 않고 너무 오래 사용한다는 단점도 존재합니다. 

### 기존의 예약체계의 단점들을 해결하기 위한 솔루션

- 우선 체육시설 예약체계에서는 관리자의 개입을 최소한으로 줄였습니다. 관리자는 체육대회 개최나 공지사항등을 게시판에 쓸 수 있는 권한이 주어졌고 체육시설 예약에는 일반사용자와 동일한 기능만을 제공했습니다.
- 만약 체육시설 예약에서 동일한 시간대에 중복되는 예약이 존재할 경우에는 이를 관리자가 임의로 선택하는 것이 아닌 Firebase의 cloud function을 이용하여 매일 0시 1분 기준에 랜덤으로 겹치는 예약에 대해서 승인 또는 미승인 처리가 되게됩니다.
- 서버에서 동작하는 함수 역할을 해주는 cloud function은 중복되는 예약들 사이에서 최대한 많은 예약들이 이루어질 수 있도록 알고리즘을 설계하였습니다. 매일 0시 1분에 각 체육시설마다 예약된 스케줄을 가져와 우선 최대한 많은 팀이 해당 체육시설을 이용할 수 있는 경우를 얻고 그와 동일한 팀수가 되는 예약 스케줄을 찾은 뒤 그러한 스케줄 중에서 하나의 스케줄을 임의로 선정하게 됩니다. 이러한 알고리즘 설계로 체육시설 참가자들이 이타심을 가지고 최대한 많은 팀이 즐거운 체육활동을 할 수 있을 것 입니다.

###  체육시설을 사용하는 장병들을 서로 연결하기 위한 솔루션
- 체육시설 예약체계에는 각 부대 관리자들에게 체육대회를 개최할 수 있는 기능을 구현하였습니다. 관리자가 체육대회를 개최하면 사용자는 그 체육대회에 참가하여 관리자가 설정한 포상을 목표로 즐거운 체육대회를 즐기고 스트레스를 해소할 수 있을 것입니다. 
- 체계에 게시판을 구현하여 체육시설에서 같이 운동을 하고자 하는 사용자를 찾을 수 있습니다. 실제 제가 체육시설을 사용하는데 생기는 문제점은 체육활동을 할만한 인원을 모으는 것이 힘들다는 점 입니다. 이러한 문제 해결을 위해 게시판을 만들어 해소하고자 했습니다. 



## 기능 설계
 -  Firebase Hosting 기능을 이용하여 체육시설 예약체계를 한번 사용해보십시오!   [click](https://reservsportsfacility.web.app/)



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

## 설치 안내 (Installation Process) 및 프로젝트 사용법 (Getting Started)

```bash
$ git clone https://github.com/osamhack2020/WEB_SportsFacilityReservationSystem_SFRS.git
$ yarn 
```
- db로 사용한 firebase 접근을 위해 .env 파일을 설정해줘야 합니다. 
- (만약 env 파일이 필요하시다면  youngan.jung@gmail.com 으로 연락 부탁드립니다.)
- 제 프로젝트에서 루트 권한 설정이 필요하시다면 youngan.jung@gmail.com 으로 연락 부탁드립니다.

```bash
$ yarn start 
```
- .env 파일을 설정했다면 위 명령어 입력하시면 완료입니다!
## 팀 정보 (Team Information)
- 정영안 (duddks1115@gmail.com), Github Id: younganJung1115

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osamhack2020/WEB_SportsFacilityReservationSystem_SFRS/blob/master/license.md)
<Project Name>

Copyright © 2020 Youngan Jung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
