// globals vars:
var language = 'en';

var site_data = {'name': '',
		 'loc': '',
		 'age': parseInt((Date.now() - new Date(1993, 07, 25)) / (1000*60*60*24*365.25)).toString(),
		 'job': '',
		 'english': '',
		 'japanese': '',
		 'likefood': '',
		 'curr_comment': '',
		 'curr': '"huq.io"',
		 'desc_comment': '',
//		 'desc1': '',
		 'github': '"https://github.com/djentleman"',
		 'linkedin': '"https://uk.linkedin.com/in/toddperry93"',
		 'wantedly': '"https://www.wantedly.com/users/29291558"',
		 'email': '"todd.perry@myport.ac.uk"',
		 'hashbang': '#!/usr/bin/python3.6',
		 'classdef': 'class',
		 'classname': 'Todd',
		 'classparen': '(Person):',
		 'initdef': 'def',
		 'init': '__init__',
		 'initparen': '(self):',
		 'super': 'super',
		 'superparen': '(Todd, self).__init__():',
		 'sname': 'self.name =',
		 'sloc': 'self.location =',
		 'sage': 'self.age =',
		 'sjob': 'self.job =',
		 'slang': 'self.languages =',
		 'sfood': 'self.favourite_food =',
		 'scurr': 'self.current =',
		 'sdesc': 'self.description =',
		 'gcidef': 'def',
		 'gci': 'get_contact_info',
		 'gciparen': '(self):',
		 'gcireturn': 'return',
		 'sgithub': '"github"',
		 'slinkedin': '"slinkedin"',
		 'swantedly': '"wantedly"',
		 'semail': '"email"'
};

var desc1 = '';
var desc2 = '';
var desc3 = '';
var desc4 = '';

function changeLanguage() {
	if (language == 'en') {
		// go from english to japanese
		language = 'ja';
		document.getElementById('language').innerHTML = 'English';
	} else if (language == 'ja') {
		// go from japanese to english
		language = 'en';
		document.getElementById('language').innerHTML = '日本語';
	}
	setLanguage(language);
}

function setLanguage(language) {
	if (language == 'en') {
		site_data.name = '"Todd Perry"';
		site_data.loc = '"London, UK"';
		site_data.job = '"Software Engineer"';
		site_data.english = '"English"';
		site_data.japanese = '"Japanese"';
		site_data.likefood = '"Ramen"';
		site_data.curr_comment = '# Currently Working At';
		site_data.desc_comment = '# TODO: Write a better Introduction!';
		desc1 = '"Hello"';
		desc2 = '"Python Engineer Currently Working In London"';
		desc3 = '"Graduated from the University of Portsmouth"';
		desc4 = '"Enjoys: Vim, Python, Electronics"';
	} else if (language = 'ja') {
		site_data.name = '"ペリー・トッド"';
		site_data.loc = '"イギリス、ロンドン"';
		site_data.job = '"スフトウエア開発者"';
		site_data.english = '"英語"';
		site_data.japanese = '"日本語"';
		site_data.likefood = '"ラーメン"';
		site_data.curr_comment = '# 現在、この会社に働いています';
		site_data.desc_comment = '# TODO: もっといい自己紹介を書く';
		desc1 = '"初めまして"';
		desc2 = '"ロンドンで働いているパイソン開発者です"';
		desc3 = '"イギリスのポーツマス大学を卒業しました"';
		desc4 = '"気に入ってることは：パイソン、Vim、電子工学"';
	}
	draw()
}

function draw() {
		for (var key in site_data) {
			//console.log(key)
			setAttr(key, site_data[key])
		}
		// there is probably a niceer way to do this, that involves JSON


		// description needs to be handled syncronously
		// todo: make this a bit less manual.better
		document.getElementById('desc1').innerHTML = '';
		document.getElementById('desc2').innerHTML = '';
		document.getElementById('desc3').innerHTML = '';
		document.getElementById('desc4').innerHTML = '';
		document.getElementById('desc1bs').hidden = true;
		document.getElementById('desc2bs').hidden = true;
		document.getElementById('desc3bs').hidden = true;
		setAttr('desc1', desc1);
		window.setTimeout(function() {
			document.getElementById('desc1bs').hidden = false;
			setAttr('desc2', desc2);
			window.setTimeout(function() {
				document.getElementById('desc2bs').hidden = false;
				setAttr('desc3', desc3);
	                        window.setTimeout(function() {
					document.getElementById('desc3bs').hidden = false;
        	                        setAttr('desc4', desc4);
                	        }, desc3.length*15);
			}, desc2.length*15);
		}, 550);
}

function setAttr(attribute, str) {
	document.getElementById(attribute).innerHTML = '';
	type(str, attribute)
}

function type(word, attr) {
	if (word.length == 0) {
		return
	}
	document.getElementById(attr).innerHTML += word[0]
        window.setTimeout(function() {
		type(word.slice(1), attr)
	}, Math.floor(Math.random() * 30));
}

// set click event listener
document.getElementById('language').addEventListener('click', changeLanguage);

setLanguage(language);

