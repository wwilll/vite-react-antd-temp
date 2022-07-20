import common from './common';

const allDatas = {
  ...common,
};

const zh_CN = {};
const en_US = {};

for (let [k, v] of Object.entries(allDatas)) {
  v = Array.isArray(v) ? v : [v];
  zh_CN[k] = v[0];
  en_US[k] = v[1] === undefined ? v[0] : v[1];
}

export { zh_CN, en_US };
