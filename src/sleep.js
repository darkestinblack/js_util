/**
 * @description 
 * @param {Number} seconds
 */
async function sleep(seconds) {
  return await new Promise(relove => setTimeout(relove, seconds * 1000));
}

//test
// (async ()=>{
//   setInterval((i=1) => console.log(i++), 1000);
//   await sleep(3);
//   console.log("sleep ends")
// })();