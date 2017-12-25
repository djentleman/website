var vim_console_buffer = '';
var vim_console_enabled = false;

var shell_prompt = 'todd@server$ ';
var shell_history = shell_prompt;
var shell_buffer = '';

var vim_mode = true;
var shell_mode = false;

vim_corner = document.getElementById('vim-corner');
shell = document.getElementById('shell');

function executeVimConsoleBuffer() {
	if (vim_console_buffer == ':wq' ||
	    vim_console_buffer == ':wq!' ||
	    vim_console_buffer == ':q!' ||
	    vim_console_buffer == ':q') {
		// nuke contents of main div, knock the user into the console
		document.getElementById('vim').hidden = true;
		document.getElementById('language').hidden = true;
		shell.hidden = false;
		shell.innerHTML = shell_history + shell_buffer;
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

function executeShellBuffer() {
	var response = '';
	var do_clear = false;
	// command parsing logic goes here
	if (shell_buffer == 'vi todd.py') {
		// re-open cv data
		document.getElementById('vim').hidden = false;
		document.getElementById('language').hidden = false;
		shell.hidden = true;
		document.title = 'vim - todd.py';
		shell_mode = false;
		vim_mode = true;
	} else if (shell_buffer == 'ls') {
		response = 'todd.py'
	} else if (shell_buffer == 'clear') {
		do_clear = true;
	} else if (shell_buffer != '') {
		response = shell_buffer + ': command not found';
	}

	if (do_clear) {
		shell_history = shell_prompt;
	} else {
		if (response == '') {
			shell_history += shell_buffer + '<br>' + shell_prompt;
		} else {
			shell_history += shell_buffer + '<br>' + response + '<br>' + shell_prompt;
		}
	}
	shell_buffer = '';
	shell.innerHTML = shell_history + shell_buffer;
}

// key listener to vimmy goodness
window.onkeypress = function(e) {
	e = e || window.event;
	var charCode = e.keyCode || e.which;
	var charStr = String.fromCharCode(charCode);
	if (shell_mode) {
		// do shell things
		if (charCode == 13) {
			executeShellBuffer();
			return;
		} 
		shell_buffer += charStr;
		shell.innerHTML = shell_history + shell_buffer;
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
		if (charCode == 8) {
			if (shell_buffer.length > 0) {
				shell_buffer = shell_buffer.slice(0, -1);
			}
		}
		shell.innerHTML = shell_history + shell_buffer;
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

