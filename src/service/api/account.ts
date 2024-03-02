import axios from "axios";
import { headers } from "next/headers";

const apiData = {
  async login(email: string, password: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const body: any = {
          email: email,
          password: password,
        };
        const api: any = await axios.post(
          `http://localhost:8081/user/login`,
          body
        );
        return resolve(api?.data?.data);
      } catch (err: any) {
        return resolve(err?.response?.data);
      }
    });
  },
  async register(body: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const api: any = await axios.post(
          `http://localhost:8081/user/register`,
          body
        );
        return resolve(api?.data?.data);
      } catch (err: any) {
        return resolve(err?.response?.data);
      }
    });
  },
  async googleAuth(token: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const api: any = await axios.post(
          `http://localhost:8081/user/google-auth`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return resolve(api?.data?.data);
      } catch (err: any) {
        return resolve(err?.response?.data);
      }
    });
  },
  async getProfile(token: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const api: any = await axios.get(
          `http://localhost:8081/user/get-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return resolve(api?.data?.data);
      } catch (err: any) {
        return resolve(err?.response?.data);
      }
    });
  },
};

export default { ...apiData };
