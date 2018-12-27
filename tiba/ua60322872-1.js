(function()  {
	let seq = new Promise(function(resolve,reject){
		let ase=function(ats) {
			let sc=document.createElement('script'); Object.keys(ats).forEach(function(k) { sc.setAttribute(k,ats[k]); });
			document.querySelector('head').appendChild(sc); return sc;
		}
		if(!window.gtag) {
			ase({async:1,src:'https://www.googletagmanager.com/gtag/js?id=UA-60322872-1'});
			window.dataLayer = window.dataLayer || [];	
			window.gtag = function(){dataLayer.push(arguments);}
			gtag('js',new Date());
		}

		window.gtag ? resolve(window.gtag) : reject('gtag not found');
	})
	.then(function(ga) { ga('config', 'UA-60322872-1'); return ga; })
	.then(function(ga) {
		let frms = document.querySelectorAll('form');
		const smsFormId = 'footer_counsel_form';
		const onFormId = 'form1';
		const onFormPath = /^\/?franchise\/counsel\./i;
		const runEvent = 'submit';
		const evCategory = '창업상담';
		let validFormIds = ['footer_counsel_form', 'form1'];
		let onSubmitSmsForm = function(ev) {
			console.log(ev);
			let rg = ev.target.querySelector('select[name="counsel_region"]').value;
			ga('event', 'SMS제출', { event_category: evCategory, event_label: rg, });
		}
		let onSubmitOnlineForm = function(ev) {
			console.log(ev);
			let rg = ev.target.querySelector('select[name*="Region"]').value;
			ga('event', '온라인제출', {event_category: evCategory,event_label: rg,});
		}
		frms.forEach(function(f) {
			if(f.id == smsFormId)
				f.addEventListener(runEvent, onSubmitSmsForm);
			else if(f.id == onFormId && onFormPath.exec(location.pathname))
				f.addEventListener(runEvent, onSubmitOnlineForm); 
		});
	})
	.catch(function(err) { console.error(arguments); });
	return seq;
})();