// globals vars:
var language = 'en';

name = '';
loc = '';
age = '24'; // calculate this later
prof = '';
english = '';
japanese = '';
food = '';
curr_comment = '';
curr = '"huq.io"';
desc_comment = '';
desc = '';

//contact ingo
github = '"https://github.com/djentleman"';
linkedin = '"https://uk.linkedin.com/in/toddperry93"';
wantedly = '"https://www.wantedly.com/users/29291558"';
email = '"todd.perry@myport.ac.uk"';

// misc code bits
hashbang = '#!/usr/bin/python3.6';

classdef = 'class';
classname = 'Todd';
classparen = '(Person):';

init = '__init__';
initparen = '(self):'

superparen = '(Todd, self).__init__()'

sname = 'self.name =';
sloc = 'self.location =';
sage = 'self.age =';
sjob = 'self.job =';
slang = 'self.languages =';
sfood = 'self.favourite_food =';
scurr = 'self.current =';
sdesc = 'self.description =';

gci = 'get_contact_info';
gciparen = '(self):';

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

function setAttr(attribute, str) {
	document.getElementById(attribute).innerHTML = '';
	type(str, attribute)
}

function setLanguage(language) {
	if (language == 'en') {
		name = '"Todd Perry"';
		loc = '"London, UK"';
		prof = '"Software Engineer"';
		english = '"English"';
		japanese = '"Japanese"';
		food = '"Ramen"';
		curr_comment = '# Currently Working At';
		desc_comment = '# TODO: Write Introduction';
		desc = '"Hello"';
	} else if (language = 'ja') {
		name = '"ペリー・トッド"';
		loc = '"イギリス、ロンドン"';
		prof = '"スフトウエア開発者"';
		english = '"英語"';
		japanese = '"日本語"';
		food = '"ラーメン"';
		curr_comment = '# 現在、この会社に働いています';
		desc_comment = '# TODO: 自己紹介を書く！';
		desc = '"初めまして"';
	}
	draw()
}

function draw() {
		// there is probably a niceer way to do this, that involves JSON
		setAttr('name', name);
		setAttr('location', loc);
		setAttr('age', age);
		setAttr('job', prof);
		setAttr('english', english);
		setAttr('japanese',  japanese);
		setAttr('likefood', food);
		setAttr('curr_comment', curr_comment);
		setAttr('curr', curr);
		setAttr('desc_comment', desc_comment);

		setAttr('github', github);
		setAttr('linkedin', linkedin);
		setAttr('wantedly', wantedly);
		setAttr('email', email);

		// code chunks
		setAttr('hashbang', hashbang);

		setAttr('classdef', classdef);
		setAttr('classname', classname);
		setAttr('classparen', classparen);

		setAttr('initdef', 'def');
		setAttr('init', init);
		setAttr('initparen', initparen);

		setAttr('super', 'super');
		setAttr('superparen', superparen);

		setAttr('sname', sname);
		setAttr('sloc', sloc);
		setAttr('sage', sage);
		setAttr('sjob', sjob);
		setAttr('slang', slang);
		setAttr('sfood', sfood);
		setAttr('scurr', scurr);
		setAttr('sdesc', sdesc);

		setAttr('gcidef', 'def');
		setAttr('gci', gci);
		setAttr('gciparen', gciparen);
		setAttr('gcireturn', 'return');
		setAttr('sgithub', '"github"');
		setAttr('slinkedin', '"linkedin"');
		setAttr('swantedly', '"wantedly"');
		setAttr('semail', '"email"');

		// description needs to be handled syncronously
		setAttr('desc1', desc);
}

function type(word, attr) {
	if (word.length == 0) {
		return
	}
	document.getElementById(attr).innerHTML += word[0]
        window.setTimeout(function(){
		type(word.slice(1), attr)
	}, Math.floor(Math.random() * 35));
}


document.getElementById('language').addEventListener('click', changeLanguage);
setLanguage(language);
