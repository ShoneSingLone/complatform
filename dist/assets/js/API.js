import { b4 as axios, f as xU } from "./index.js";
const reqInterceptor = (config) => {
  return config;
};
const resInterceptor = async (response) => {
  const { data } = response;
  return Promise.resolve(data == null ? void 0 : data.data);
};
const resErrorHandler = async (error) => {
  var _a, _b;
  const { response } = error;
  console.log(response);
  logError((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data);
  if (((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.msg) === "auth") {
    stateApp.token = "";
    await xU.sleep(1e3);
    window.location.reload();
  }
  return Promise.reject(error);
};
function genAjax(options = {}) {
  options.baseURL = options.baseURL;
  options.reqInterceptor = options.reqInterceptor || reqInterceptor;
  options.resInterceptor = options.resInterceptor || resInterceptor;
  options.resErrorHandler = options.resErrorHandler || resErrorHandler;
  const ajax2 = axios.create({
    baseURL: options.baseURL,
    timeout: 2e4
  });
  ajax2.interceptors.request.use(
    options.reqInterceptor,
    (error) => Promise.reject(error)
  );
  ajax2.interceptors.response.use(
    options.resInterceptor,
    options.resErrorHandler
  );
  return ajax2;
}
function logError(msg) {
  if (!msg)
    return;
  xU.notification.error({
    message: msg
  });
  console.error(msg);
}
genAjax();
const ajax = genAjax({
  baseURL: `${window.__BASE_URL}/s/wyapi`,
  reqInterceptor: (i) => i,
  resInterceptor: (i) => {
    var _a;
    if (((_a = i == null ? void 0 : i.data) == null ? void 0 : _a.code) === 200) {
      return i.data;
    }
    return i;
  }
});
const API = {
  music: {
    async loadAllMusicClient() {
      let res = [];
      try {
        const { status, data } = await axios.get(
          `${window.__BASE_URL}/s/0/media/AllMusicClient.json?_t=${Date.now()}`
        );
        if (status === 200) {
          res = data;
        }
      } catch (error) {
        console.error(error);
      } finally {
        return res;
      }
    },
    async search(params = { limit: 60, offset: 1 }) {
      return await ajax({
        method: "GET",
        url: "/search",
        params
      });
    },
    async getPersonalizedNewSong(limit = 1e3) {
      return await ajax({
        method: "GET",
        url: "/personalized/newsong",
        params: { limit }
      });
    },
    async getSongUrlBuId(id) {
      return await ajax({
        method: "GET",
        url: "/song/url",
        params: { id }
      });
    },
    async getSongDetailBuId(id) {
      return await ajax({
        method: "GET",
        url: "/song/detail",
        params: { id }
      });
    }
  }
};
export {
  API as A
};
