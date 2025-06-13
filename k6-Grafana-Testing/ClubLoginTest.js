import http from 'k6/http';
import { check, sleep } from 'k6';
//import { encodeURIComponent } from 'k6/encoding';

export const options = {
  vus: 1,
  iterations: 10,
};

const clubs = [
  { clubName: 'IEEE NITK', clubType: 'Exclusive', clubSigs: 'EMBS,CS', imageURL: 'https://media.licdn.com/dms/image/v2/C510BAQHD-OMsJXBWNw/company-logo_200_200/company-logo_200_200/0/1630629290476?e=2147483647&v=beta&t=QXBsP37MCojzgRKh3OE-7h37yt990VFaJ1PsQk5Vh2A' },
  { clubName: 'ISTE NITK', clubType: 'Exclusive', clubSigs: 'Robotics,Design', imageURL: 'https://iste.nitk.com/logo.png' },
  { clubName: 'IE Mech', clubType: 'Exclusive', clubSigs: 'CAD,CAM', imageURL: 'https://iemech.com/logo.png' },
  { clubName: 'Rotaract NITK', clubType: 'Non Exclusive', clubSigs: 'Service,Publicity', imageURL: 'https://rotaract.com/logo.png' },
  { clubName: 'NITK Dramatics', clubType: 'Non Exclusive', clubSigs: 'Stage,Backstage', imageURL: 'https://drama.nitk.com/logo.png' },
  { clubName: 'Music Club NITK', clubType: 'Non Exclusive', clubSigs: 'Vocals,Instrumentals', imageURL: 'https://music.nitk.com/logo.png' },
  { clubName: 'ACM NITK', clubType: 'Exclusive', clubSigs: 'Web,ML', imageURL: 'https://media.licdn.com/dms/image/v2/C510BAQGwKGzEbSp61Q/company-logo_200_200/company-logo_200_200/0/1631423069766/acm_nitk_logo?e=2147483647&v=beta&t=zVUtNNWIJYaOKe4Of3oV1TuIhtxKn1gOIjhX6b153Ro' },
  { clubName: 'DebSoc NITK', clubType: 'Non Exclusive', clubSigs: 'Debate,Content', imageURL: 'https://debsoc.com/logo.png' },
  { clubName: 'Dance Club NITK', clubType: 'Non Exclusive', clubSigs: 'HipHop,Classical', imageURL: 'https://dance.nitk.com/logo.png' },
  { clubName: 'NCC NITK', clubType: 'Non Exclusive', clubSigs: 'Army,AirForce', imageURL: 'https://ncc.nitk.com/logo.png' },
];

export default function () {
  const i = __ITER;
  //const club = clubs[i];
  const user = {
    username: `User${i+1000000}`,
    email: `testuser${i+1000000}@load.com`,
    userRole: 'Club Convener',
    password: 'test123',
  };

  const headers = { 'Content-Type': 'application/json' };

  // 1. User Sign Up
  http.post('http://localhost:8006/user/register', JSON.stringify(user), { headers });
  sleep(0.3);

  // 2. User Login → get token
  const loginRes = http.post('http://localhost:8006/user/login', JSON.stringify({
    email: `testuser${i+1000000}@load.com`,
    password: 'test123'
  }), { headers });

  // Extract token from login response
  let token = '';
  check(loginRes, {
      'login status is 200': (r) => r.status === 200,
      'token present': (r) => {
        const body = JSON.parse(r.body);
        //console.log(body.token);
        token = body.token; // <-- Assign token here
        return token !== undefined && typeof token === 'string';
      },
  });

  console.log(clubs[i].clubName);

  const clubData = 
    `clubName=${encodeURIComponent(clubs[i].clubName)}&` +
    `imageURL=${encodeURIComponent(clubs[i].imageURL)}&` +
    `clubType=${encodeURIComponent(clubs[i].clubType)}&` +
    `rounds=3&` +
    `clubSigs=${encodeURIComponent(clubs[i].clubSigs)}&` +
    `password=club123`;

  const authHeaders = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  };

  // 3. Register Club (protected route)
  const clubRes = http.post('http://localhost:8006/club/register', clubData, authHeaders);

  check(clubRes, {
    'club registered': (res) => res.status === 200 || res.status === 201
  });

  sleep(0.3);
}
