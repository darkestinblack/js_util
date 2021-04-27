'use strict'

/**
 * @description run functions like onion
 * @param {Number} seconds
 */
function onionFunctions() {
  const funcs = [];
  return {
      //add functions
      use: (fun) => typeof fun==='function' && funcs.push(fun),
      // run functions like onion
      run: () => {
          let i = 0;
          function next() {
              const fun = funcs[i++];
              if (!fun) {
                  return;
              }
              return fun(next);
          }
          return next();
      }
  }
}

//test onionFunctions
const app=onionFunctions(); 
app.use( (next) =>{
    console.log(1);    
    next();
    console.log(-1);
});
app.use((next)=> {    
    console.log(2);
    next();
    console.log(-2);
});
app.use((next)=>  {
    console.log(3);
    next();
    console.log(-3);
});
app.run();