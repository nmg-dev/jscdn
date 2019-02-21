(function(kmid) { const kmsrc = window.location.protocol + '//t1.daumcdn.net/adfit/static/kp.js';
	var kp = function() { return kakaoPixel(kmid); }
	var el = function(tag,opts) { let e = document.createElement(tag); for(k in opts) { e.setAttribute(k,opts[k]); } return e; };
	var tts = [
		{p: /\/?member\/(onlineMember|memberShip)Succes/i, f: function() { kp().completeRegistration(); }},
		{p: /^\/?([^\/]+)\/(G[\w]+)\/good/i, f: function(){kp().viewContent({id: window._godNo || /\/([^\/]+)\/(G[\w]+)\/good/i.exec(pt)[2]});}},
		{p: /^\/?public\/cart\/list/i, f: function(){kp().viewCart();}},
		{p: /^\/?secured\/order\/OD\d+\/view/, f: function() {
		let oinfo = {currency: 'KRW'}; let cq = function(s,pp){ s+=parseInt(pp.quantity); return s; }; let pq = function(s,pp){ s+=parseInt(pp.price); return s; };
		if(window.dataLayer) {
			oinfo = window.dataLayer.reduce(function(agg,d) {
			if(d.event=='purchase' && d.ecommerce && d.ecommerce.purchase) {
			let pur = d.ecommerce.purchase;
			let prs = pur.products;
			let oi = pur.actionField;
			agg.total_quantity = prs.reduce(cq, 0);
			agg.total_price = parseInt(oi.revenue);
			agg.products = prs; }
			return agg; }, oinfo);
		} else if(window.emnet_tagm_products) {
			let prs = emnet_tagm_products;
			agg.total_quantity = prs.reduce(cq,0);
			agg.total_price = prs.reduce(pq,0);
			agg.products = prs;
		} else { return; }
		kp().purchase(oinfo);}}];
	let scr = el('script', {src: kmsrc, charset: 'UTF8'});
	scr.onload = function() {
		console.log('OK on load working');
		kp().pageView();
		console.log('page view pass');
		pt = window.location.pathname;
		console.log('location', pt);
		tts.forEach(function(act){ 
			console.log('check pattern', act);
			if(pt.match(act.p)) { 
				console.log('location matched', act.p);
				act.f.bind(this)();
				console.log(act.f, 'proceeded');
			} 
		}); } document.head.appendChild(scr); })('9177313383537918022');