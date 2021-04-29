'use strict'
/**
 * @description run functions like onion
 * @param {Number} seconds
 */
function onionFunctionsPromise() {
    const app = {};
    app.funcs = [];
    //add functions
    app.use = (fun) => app.funcs.push(fun);  
    // run functions like onion
    app.run = (params, next)=> {
        function next() {
            if (app.funcs.length < 1){
                return Promise.resolve();
            }
            const fun = app.funcs.shift();
            return Promise.resolve(fun(params, next));   
        }
        return Promise.resolve(next());
    }
    return app;
}

// test onionFunctionsPromise
// const app =onionFunctionsPromise();
// app.use(function (params,next) {
//     console.log(1);    
//     next();
//     console.log(-1);

// });
// app.use(function (params,next) {    
//     console.log(2);
//     next();
//     console.log(-2);

// });
// app.use(function (params,next) {
//     console.log(3);
//     next();
//     console.log(-3);

// });
// app.run(); 