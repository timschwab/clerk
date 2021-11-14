const { spawn } = require('child_process');

let args = process.argv.slice(2);
let mode = args[0];

// Set defaults
mode = mode || 'development';
mode = mode == 'dev' ? 'development' : mode;
mode = mode == 'prod' ? 'production' : mode;

// Build
if (mode == 'development' || mode == 'production') {
	// It would be nice to not have to use spawn() one day
	spawn('webpack', ['--mode=' + mode], { stdio: 'inherit', shell: true });
} else {
	console.log('Mode must be either "dev" or "prod"');
}
