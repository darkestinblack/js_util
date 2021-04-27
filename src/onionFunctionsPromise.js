/** 
 *   
 * @public
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