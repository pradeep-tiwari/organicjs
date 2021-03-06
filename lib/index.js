/**
 * Module dependencies.
 */
var chalk = require('chalk');
var commands = require('./commands');
var welcomeView = require('./views/welcome');

/**
 * Command map.
 */
var CMD_MAP = {
	'new': commands.newProject,
	'component': commands.newComponent
};

/**
 * Function: getCommandHandler
 * Returns the appropriate command handler.
 *
 * @param {args} The arguments array.
 */
function getCommandHandler(args) {
    
	var cmd = args[0];
    
	if(!CMD_MAP[cmd]) {
		console.error(chalk.red.bold('Err: The command is not supported'));
        process.exit(1);
	} else {
		return new CMD_MAP[cmd](args.slice(1));
	}
	
}

/**
 * Function: initCLI
 * Initializes the command line request.
 *
 * @param {args} The arguments array with first two element stripped off.
 */
function initCLI(args) {
    
	if (args.length === 0) {
        welcomeView.render();
		return;
    }
	
	getCommandHandler(args).run();
	
}

/**
 * Initialize CLI script handling passing it only the relevant arguments.
 */
initCLI(process.argv.slice(2));