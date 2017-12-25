var vim_console_buffer = '';
var vim_console_enabled = false;

function executeVimConsoleBuffer() {
	if (vim_console_buffer == ':wq' ||
	    vim_console_buffer == ':wq!' ||
	    vim_console_buffer == ':q!' ||
	    vim_console_buffer == ':q') {
		// nuke contents of main div, knock the user into the console
		document.getElementById('vim').innerHTML = '';
		document.getElementById('shell').innerHTML = 'todd@ninja$ ';
		document.getElementById('language').innerHTML = '';
		document.title = 'bash';		
		
	} else {
		document.getElementById('vim-corner').innerHTML = 'E492: Not an editor command: ' + vim_console_buffer;
		document.getElementById('vim-corner').style['background-color'] = 'red';
		vim_console_buffer = '';
		vim_console_enabled = false;
	}
}

// key listener to vimmy goodness
window.onkeypress = function(e) {
	e = e || window.event;
	var charCode = e.keyCode || e.which;
	var charStr = String.fromCharCode(charCode);
	if (charStr == ':') {
		vim_console_enabled = true;
	}
	if (vim_console_enabled && charCode == 13) {
		executeVimConsoleBuffer();
		return;
	} 
	if (vim_console_enabled) {
		vim_console_buffer += charStr
	}
	document.getElementById('vim-corner').innerHTML = vim_console_buffer;
}

// this function is to process non typable characters (nameley backpace)
window.onkeydown = function(e) {
	var charCode = e.keyCode || e.which;
	if (charCode == 8) {
		if (vim_console_buffer.length > 0) {
			vim_console_buffer = vim_console_buffer.slice(0, -1);
			if (vim_console_buffer.length == 0) {
				vim_console_enabled = false;
			}
		}
	}
	document.getElementById('vim-corner').innerHTML = vim_console_buffer;
	document.getElementById('vim-corner').style['background-color'] = null;
}

