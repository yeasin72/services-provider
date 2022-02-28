const colors = require('colors');
const console = require("console-emoji-log");
const today  = new Date();
class ErrorControler {
    statusControler(type, req) {
        if (type === 'Warn') {
            console.warn(colors.yellow(`${req.method} -> ${req.originalUrl} : ${today.toLocaleDateString("en-US")} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`));
        }else if (type === "Error") {
            console.error(colors.red(`${req.method} -> ${req.originalUrl} : ${today.toLocaleDateString("en-US")} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`));
        }else{
            console.success(colors.blue(`${req.method} -> ${req.originalUrl} : ${today.toLocaleDateString("en-US")} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`));
        }
    }
}
module.exports = new ErrorControler