var page = require('webpage').create();


page.open('index.html', function() {
	page.viewportSize = { width: 480, height: 1000 };
	page.render('xs.png');
  page.viewportSize = { width: 768, height: 1000 };
	page.render('sm.png');
  page.viewportSize = { width: 992, height: 1000 };
	page.render('md.png');
  page.viewportSize = { width: 1280, height: 1000 };
	page.render('lg.png');
  phantom.exit();
});
