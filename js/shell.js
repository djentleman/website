var vim_console_buffer = '';
var vim_console_enabled = false;


// array - list of all executed commands
var bash_history = [''];
var bash_history_pointer = 0; // this points to the latest command


var vim_mode = true;
var shell_mode = false;

var curr_dir = 'home/todd'

function getPrompt() {
	// this should be used to get the prompt
	var base = 'todd@server:';
	dir = curr_dir.split('/')[curr_dir.split('/').length-1]
	if (dir == ''){
		return base + '/$ ';
	}
	return base + dir + '$ ';
}
// shell history here is basically just everything you display in the shell screen
var shell_history = getPrompt();
var shell_buffer = '';
// this pointer defines where the users cursor is
// its referenced from the rightmost charatcer
var shell_pointer = 0;

var file_structure = {'home': 
		         {'todd': 
			     {'files': ['todd.py']}
                         }
		     };

// these are some commonly used DOM elements
var vim_corner = document.getElementById('vim-corner');
var shell = document.getElementById('shell');


function addHighlight(text, ptr) {
	return text.slice(0, ptr) +
	       '<span style="background: white; color: black;">' +
	       text[ptr] + '</span>' + text.slice(ptr+1, text.length)
}

function printShell() {
	var to_write = shell_history + shell_buffer + '\xa0';
	var ptr = to_write.length - 1 - shell_pointer;
	shell.innerHTML = addHighlight(to_write, ptr);
}

function executeVimConsoleBuffer() {
	if (vim_console_buffer == ':wq' ||
	    vim_console_buffer == ':wq!' ||
	    vim_console_buffer == ':q!' ||
	    vim_console_buffer == ':q') {
		// nuke contents of main div, knock the user into the console
		document.getElementById('vim').hidden = true;
		document.getElementById('language').hidden = true;
		shell.hidden = false;
		printShell();
		document.title = 'bash';
		shell_mode = true;
		vim_mode = false;
		vim_console_buffer = '';
		vim_corner.innerHTML = '';
		vim_console_enabled = false;
		
	} else {
		vim_corner.innerHTML = 'E492: Not an editor command: ' + vim_console_buffer;
		vim_corner.style['background-color'] = 'red';
		vim_console_buffer = '';
		vim_console_enabled = false;
	}
}

function handleCd(path) {
	var target = shell_buffer.split(' ')[1];
	if (target != undefined) {	
		if (target == '.') { // do nothing
		} else if (target == '..') {
			curr_dir = path.splice(0, path.length - 1).join('/');
		} else if (directories.indexOf(target) != -1) {
			path = path.concat([target]);
			curr_dir = path.join('/');
		} else {
			return '-bash: cd: ' + target + ': No such file or directory';
		}
	}
	return '';
}

function handleVim(work_dir) {
	var vim_args = shell_buffer.split(' ')[1];
	if (vim_args != undefined) {
		vim_args = vim_args.split('/');
		var vim_path = work_dir;
		var do_vim = true;
		for (var i = 0; i < vim_args.length - 1; i++) {
			if (Object.keys(vim_path).indexOf(vim_args[i]) != -1) {
				vim_path = vim_path[vim_args[i]]
			} else {
				// this isnt actually vim behavior...
				do_vim = false;
				response = 'vim: ' + shell_buffer.split(' ')[1] + ': No such file or directory';
				break;
			}
		}
		if (do_vim) {
			// handle todd.py
			var vim_filename = vim_args[vim_args.length-1]
			if (vim_filename == 'todd.py' && vim_path.files != undefined) {
				if (vim_path.files.indexOf(vim_filename) != -1) {
					document.getElementById('vim').hidden = false;
					document.getElementById('language').hidden = false;
					shell.hidden = true;
					document.title = 'vim - todd.py';
					shell_mode = false;
					vim_mode = true;
				}
			} else {
				return 'vim: ' + shell_buffer.split(' ')[1] + ': No such file or directory';
			}
		}
	}
	return '';
}

// TODO: refactor this mess lmao
function executeShellBuffer() {
	var response = '';
	var do_clear = false;
	var path = curr_dir.split('/').filter(word => word != '');
	//console.log(path);
	var work_dir = file_structure;
	for (var i = 0; i < path.length; i++) {
		work_dir = work_dir[path[i]];
	}
	directories = Object.keys(work_dir).filter(word => word != 'files');
	files = work_dir.files;
	// command parsing logic goes here
	if (shell_buffer.slice(0, 2) == 'vi') {
		response = handleVim(work_dir)
	} else if (shell_buffer == 'ls') {
		response = (directories.concat(files)).join(' ');
	} else if (shell_buffer.slice(0, 2) == 'cd') {
		response = handleCd(path);
	} else if (shell_buffer == 'pwd') {
		response = '/' + curr_dir
	} else if (shell_buffer == 'clear') {
		do_clear = true;
	} else if (shell_buffer != '') {
		response = shell_buffer + ': command not found';
	}

	if (shell_buffer != '') {
		bash_history[bash_history_pointer] = shell_buffer;
		// current end of history is not empty command
		if (bash_history[bash_history.length-1] != '') {
			bash_history_pointer = bash_history.length;
			bash_history.push('');
		} else {
			// already got an emoty command at the end
			bash_history_pointer = bash_history.length - 1;
		}
	}

	if (do_clear) {
		shell_history = getPrompt();
	} else {
		if (response == '') {
			shell_history += shell_buffer + '<br>' + getPrompt();
		} else {
			shell_history += shell_buffer + '<br>' + response + '<br>' + getPrompt();
		}
	}
	shell_buffer = '';
	printShell();
}

// key listener to vimmy goodness
window.onkeypress = function(e) {
	e = e || window.event;
	var charCode = e.keyCode || e.which;
	var charStr = String.fromCharCode(charCode);
	if (shell_mode) {
		// do shell things
		if (charCode == 13) {
			shell_pointer = 0; // reset shell pointer
			executeShellBuffer();
			return;
		} 
		var offset = shell_buffer.length - shell_pointer;
		shell_buffer = shell_buffer.slice(0, offset) +  charStr + shell_buffer.slice(offset, shell_buffer.length);
		printShell();
	} else if (vim_mode) {
		if (charStr == ':') {
			vim_console_enabled = true;
		}
		if (vim_console_enabled && charCode == 13) {
			executeVimConsoleBuffer();
			return;
		} 
		if (vim_console_enabled) {
			vim_console_buffer += charStr;
		}
		vim_corner.innerHTML = vim_console_buffer;
	}
}

// this function is to process non typable characters (nameley backpace)
window.onkeydown = function(e) {
	var charCode = e.keyCode || e.which;
	if (shell_mode) {
		// do shell things
		// handler for deletions
		if (charCode == 8) {
			if (shell_buffer.length > 0) {
				shell_buffer = shell_buffer.slice(0, -1);
			}
		}
		// handler for up key
		if (charCode == 38) {
			// save current buffer to bash history
			bash_history[bash_history_pointer] = shell_buffer;
			// update pointer
			if (bash_history_pointer > 0) {
				bash_history_pointer--;
				shell_buffer = bash_history[bash_history_pointer];
			}
		}
		// down key
		if (charCode == 40) {
			// save current buffer to bash history
			bash_history[bash_history_pointer] = shell_buffer;
			// update pointer
			if (bash_history_pointer < bash_history.length -1) {
				bash_history_pointer++;
				shell_buffer = bash_history[bash_history_pointer];
			}
		}
		// left	
		if (charCode == 37) {
			if (shell_pointer < shell_buffer.length) {
				shell_pointer++;
			}
		}
		// right
		if (charCode == 39) {
			if (shell_pointer > 0) {
				shell_pointer--;
			}
		}
		printShell();
	} else if (vim_mode) {
		if (charCode == 8) {
			if (vim_console_buffer.length > 0) {
				vim_console_buffer = vim_console_buffer.slice(0, -1);
				if (vim_console_buffer.length == 0) {
					vim_console_enabled = false;
				}
			}
		}
		vim_corner.innerHTML = vim_console_buffer;
		vim_corner.style['background-color'] = null;
	}
}

