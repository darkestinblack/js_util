'use strict';

/**
 * @description retry function
 * rerun func until reach max times or get the expected result
 * @param {Function} func 
 * @param {Object} args 
 * @param {Array} flapArray 
 * @param {Number} times max excute times
 * @return {Object} result
 */
async function retry(func, args, flapArray = [], times = 10) {
  const result = { success: false, msg: '', data: {} };
  let runTimes = 0;
  if (typeof func !== 'function') {
    result.msg += 'func should be a function!';
  } else {
    while (runTimes++ < times) {
      try {
        result.data = await func(args);
        if (flapArray.length <= 1) {
          result.success = result.data === flapArray[0];
        } else {
          result.success = flapArray.reduce(function (acc, it, idx, arr) {
            if (!(arr instanceof Array) || arr.length < 1) {
              return false;
            }
            if (arr.length === 2) {
              return result.data[acc] === it;
            }
            if (idx === 1) {
              return result.data[acc][it];
            }
            if (idx === arr.length - 1) {
              return it === acc;
            }
            return acc[it];
          });
        }
        if (result.success) {
          result.msg += `executed ${runTimes} times,`;
          runTimes = times;
        }
      } catch (error) {
        result.msg += error.message;
      }
    }
  }
  return result;
}

// test
// retry(11, { a: { b: { c: { d: 1 } } } }, ['a', 'b', 'c', 'd', 1]).then(res => console.log(res));
// retry(args => args, { a: { b: { c: { d: 1 } } } }, ['a', 'b', 'c', 'd', 1]).then(res => console.log(res));
// retry(args => args, { a: 'ss'}, ['a', 'ss']).then(res => console.log(res));
// setTimeout(() =>console.log(11),500);