const child_process = require('child_process');



exports.restart = function () {
	var workerProcess = child_process.exec('forever restart ./www', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
   
    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
        
    });
};
