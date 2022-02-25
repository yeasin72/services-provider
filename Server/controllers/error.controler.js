const colors = require('colors');
const console = require("console-emoji-log");
class ErrorControler {
    statusControler(type, req) {
        if (type === 'Warn') {
            console.warn(colors.yellow(`${req.method} -> ${req.originalUrl}`));
        }else if (type === "Error") {
            console.error(colors.red(`${req.method} -> ${req.originalUrl}`));
        }else{
            console.success(colors.blue(`${req.method} -> ${req.originalUrl}`));
        }
    }
}
module.exports = new ErrorControler