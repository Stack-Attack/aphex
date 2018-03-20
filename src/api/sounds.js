// This file is only used to simulate the retrieval of sound files from the backend. It will not be used in production.
const _sounds = [
  {
    id: 0,
    title: "First try",
    file: "cool_tune_0.m4a"
  },
  {
    id: 1,
    title: "Preview of new song",
    file: "cool_tune_1.m4a"
  },
  {
    id: 2,
    title: "Literally the worst",
    file: "cool_tune_2.m4a"
  },
  {
    id: 3,
    title: "Uhhh no comment",
    file: "cool_tune_3.m4a"
  },
  {
    id: 4,
    title: "More fun stuff",
    file: "cool_tune_4.m4a"
  }
];

const TIMEOUT = 100;

export default {
  getSounds: (cb, timeout) => setTimeout(() => cb(_sounds), timeout || TIMEOUT)
};
