import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    signup_and_login: {
      executor: 'per-vu-iterations',
      vus: 100,            // 100 virtual users
      iterations: 1,       // Each VU runs once
      maxDuration: '3m',
    },
  },
};

export default function () {
  const userId = __VU; // __VU is 1-based and unique per VU
  const email = `testuser_${userId}@load.com`;
  const password = 'pass123';

  // 1️⃣ Signup
  const signupPayload = JSON.stringify({
    username: `TestUser${userId}`,
    email: email,
    userRole: 'Student',
    password: password,
  });

  const headers = { 'Content-Type': 'application/json' };

  const signupRes = http.post('http://localhost:8006/user/register', signupPayload, { headers });

  check(signupRes, {
    'signup status is 201 or 200': (r) => r.status === 201 || r.status === 200,
  });

  // 2️⃣ Login
  const loginPayload = JSON.stringify({
    email: email,
    password: password,
  });

  const loginRes = http.post('http://localhost:8006/user/login', loginPayload, { headers });

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'token present': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.token !== undefined && typeof body.token === 'string';
      } catch (e) {
        return false;
      }
    },
  });

  sleep(1);
}
