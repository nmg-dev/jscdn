window.dataLayer = window.dataLayer || [];
function appendScriptElement(attrs) {
	let sc = document.createElement('script');
	Object.keys(attrs).forEach(function(ak) {
		sc.setAttribute(ak, attrs[ak]);
	});
	document.querySelector('head').appendChild(sc);
	return sc;
}

if(!window.gtag) {
	appendScriptElement({async: 1, src: 'https://www.googletagmanager.com/gtag/js?id=UA-60322872-1' });	
	window.gtag = window.gtag || function(){dataLayer.push(arguments);}
	gtag('js',new Date());	
}
// append gtag
gtag('config', 'UA-60322872-1');
(function(ga) {
	let frms = document.querySelectorAll('form');
	const smsFormId = 'footer_counsel_form';
	const onFormId = 'form1';
	const onFormPath = /^\/?franchise\/counsel\./i;
	const runEvent = 'click';

	const evCategory = '창업상담';

	// let onlineFrmPath = /^\/?franchise\/counsel\./i;
	let validFormIds = ['footer_counsel_form', 'form1'];
	let onSubmitSmsForm = function(ev) {
		console.log(arguments);
		let region = ev.target.querySelector('select[name="counsel_region"]').value;
		console.log(ev.target, region);
		ga('event', 'SMS제출', {
			event_category: evCategory, 
			event_label: region,
		});
	}
	let onSubmitOnlineForm = function(ev) {
		console.log(arguments);
		let region = ev.target.querySelector('select[name*="Region"]').value;
		console.log(ev.target, region);
		ga('event', '온라인제출', {
			event_category: evCategory,
			event_label: region,
		});
	}

	frms.forEach(function(f) {
		// 
		if(f.id == smsFormId)
			f.addEventListener(runEvent, onSubmitSmsForm);
		else if(f.id == onFormId && onFormPath.exec(location.pathname))
			f.addEventListener(runEvent, onSubmitOnlineForm);

		f.action = '://localhost/';
	});
})(window.gtag);