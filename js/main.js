// global vars:
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
		 'github': '"https://github.com/djentleman"',
		 'linkedin': '"https://uk.linkedin.com/in/toddperry93"',
		 'wantedly': '"https://www.wantedly.com/users/29291558"',
                 'medium': '"https://medium.com/@toddperry_78831"',
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
		 'sskill': 'self.skills =',
		 'gcidef': 'def',
		 'gci': 'get_contact_info',
		 'gciparen': '(self):',
		 'gcireturn': 'return',
		 'sgithub': '"github"',
		 'slinkedin': '"linkedin"',
		 'swantedly': '"wantedly"',
                 'smedium': '"medium"',
		 'semail': '"email"',
		 'scv': '"cv"',
		 'cv_en': '"cv_en.pdf"',
		 'cv_jp': '"cv_jp.pdf"',
		 'scv_en': '"english"',
		 'scv_jp': '"japanese"',
		 'spapers': '"research_papers"',
		 'scec15': '"imbalanced_classification_w_cost_sensitive_classifiers"',
		 'cec15': '"ieee_cec_2015.pdf"',
		 'sgecco15': '"genetically_optimized_random_forest"',
		 'gecco15': '"gecco_2015.pdf"',
		 'swcci16': '"function_optimization_with_newtonian_field_theory"',
		 'wcci16': '"ieee_wcci_2016.pdf"',
		 'sbraf18': '"biased_random_forest_for_class_imbalance"',
		 'braf18': '"ieee_tnnls_2018.pdf"',
};

var desc1 = '';
var desc2 = '';
var desc3 = '';
var desc4 = '';

function changeLanguage(new_language) {
        language = new_language;
	document.getElementById('language-en').hidden = false;
	document.getElementById('language-ja').hidden = false;
	document.getElementById('language-ru').hidden = false;
	document.getElementById('language-' + language).hidden = true;
	setLanguage(language);
}

function setLanguage(language) {
	if (language === 'en') {
		site_data.name = '"Todd Perry"';
		site_data.loc = '"London, UK"';
		site_data.job = '"Software Engineer"';
		site_data.english = '"English"';
		site_data.japanese = '"Japanese"';
		site_data.russian = '"Russian"';
		site_data.englishlevel = '"Native Speaker"';
		site_data.japaneselevel = '"Working Proficiency (JLPT N2)"';
		site_data.russianlevel = '"Beginner"';
		site_data.likefood = '"Ramen"';
		site_data.curr_comment = '# Currently Working At';
		site_data.desc_comment = '# TODO: Write a better Introduction!';
		site_data.skill1 = '"Python"';
		site_data.skill2 = '"Linux"';
		site_data.skill3 = '"Machine Learning"';
		site_data.skill4 = '"Docker/Devops"';
		site_data.skill5 = '"AWS/GCP"';
		site_data.comment_cv = '';
		site_data.comment_papers = '';
		desc1 = '"Hello"';
		desc2 = '"Python Engineer Currently Working In London"';
		desc3 = '"Graduated from the University of Portsmouth"';
		desc4 = '"Enjoys: Vim, Mathematics, Languages, Electronics"';
	} else if (language === 'ja') {
		site_data.name = '"ペリー・トッド"';
		site_data.loc = '"イギリス、ロンドン"';
		site_data.job = '"スフトウエア開発者"';
		site_data.english = '"英語"';
		site_data.japanese = '"日本語"';
		site_data.russian = '"ロシア語"';
		site_data.englishlevel = '"母語"';
		site_data.japaneselevel = '"上級（日本語能力試験二級）"';
		site_data.russianlevel = '"初心者"';
		site_data.likefood = '"ラーメン"';
		site_data.curr_comment = '# 現在、この会社に働いている';
		site_data.desc_comment = '# TODO: もっといい自己紹介を書く';
		site_data.skill1 = '"パイソン"';
		site_data.skill2 = '"リナックス"';
		site_data.skill3 = '"機械学習"';
		site_data.skill4 = '"ドッカー/デブオプス"';
		site_data.skill5 = '"AWS/GCP"';
		site_data.comment_cv = '# 履歴書';
		site_data.comment_papers = '# 研究論文（全部英語で書いてある）';
		desc1 = '"初めまして"';
		desc2 = '"ロンドンで働いているパイソン開発者です"';
		desc3 = '"イギリスのポーツマス大学を卒業しました"';
		desc4 = '"気に入ってることは：数学、Vim、言語学習、電子工学"';
	} else if (language === 'ru') {
		site_data.name = '"Тодд Перри"';
		site_data.loc = '"Лондон、Британия"';
		site_data.job = '"Программист"';
		site_data.english = '"Английский"';
		site_data.japanese = '"Японский"';
		site_data.russian = '"Русский"';
		site_data.englishlevel = '"Родной Язык"';
		site_data.japaneselevel = '"Повышенный (Нихонго Норёку Сикэн N2)"';
		site_data.russianlevel = '"Начинающий"';
		site_data.likefood = '"Рамен"';
		site_data.curr_comment = '# Сейчас, я работаю на это компании';
		site_data.desc_comment = '# TODO: пиши хорошее введение';
		site_data.skill1 = '"Питон"';
		site_data.skill2 = '"Линукс"';
		site_data.skill3 = '"Машинное Обучение"';
		site_data.skill4 = '"Докер/Девопс"';
		site_data.skill5 = '"Амазон Беб Сервис/Гугл Клауд Платформ"';
		site_data.comment_cv = '# резюме: сейчас, у меня нет резюме по-русски';
		site_data.comment_papers = '# научно-исследовательские работы (все по-английски)';
		desc1 = '"Здравствуйте!"';
		desc2 = '"Я питон программист в Лондоне"';
		desc3 = '"Я учил информатику в Портсмутском университете"';
		desc4 = '"Мне нравится: Математика, Vim, Языки, Электроника"';
	}

	draw()
}

function deactivate(id) {
	var language_btn = document.getElementById(id)
	language_btn.style.color = '#888';
	language_btn.style.cursor = 'default';
	language_btn.style['pointer-events'] = 'none';
}

function reactivate(id) {
	var language_btn = document.getElementById(id)
	language_btn.style.color = '#FFF';
	language_btn.style.cursor = 'pointer';
	language_btn.style['pointer-events'] = null;
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

		// disable language button
                deactivate('language-en');
                deactivate('language-ja');
                deactivate('language-ru');

		var desc1_render_time = 550; // this is how long it takes the desc1 line to render

		setAttr('desc1', desc1);
		window.setTimeout(function() {
			document.getElementById('desc1bs').hidden = false;
			setAttr('desc2', desc2);
		}, desc1_render_time);

		window.setTimeout(function() {
			document.getElementById('desc2bs').hidden = false;
			setAttr('desc3', desc3);
		}, desc1_render_time + (desc2.length*15));

		window.setTimeout(function() {
			document.getElementById('desc3bs').hidden = false;
			setAttr('desc4', desc4);
		}, desc1_render_time + ((desc2.length + desc3.length)*15));

		window.setTimeout(function() {
			// re-enable language button
			reactivate('language-en');
			reactivate('language-ja');
			reactivate('language-ru');
		}, desc1_render_time + ((desc2.length + desc3.length + desc4.length)*15));
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

// set click event listeners
document.getElementById('language-en').addEventListener('click', function(){changeLanguage('en')});
document.getElementById('language-ja').addEventListener('click', function(){changeLanguage('ja')});
document.getElementById('language-ru').addEventListener('click', function(){changeLanguage('ru')});

changeLanguage(language);

