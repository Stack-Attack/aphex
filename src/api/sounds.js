import _sounds from './testData.json';

const TIMEOUT = 100;

export default {
    getSounds: (cb, timeout) => setTimeout(() => cb(_sounds), timeout || TIMEOUT)
}