$(document).ready(function() {
			"use strict";
			$('#fullpage').fullpage({
				sectionsColor: ['#f7f7f7', '#222222', '#f7f7f7', '#222222', '#f7f7f7'],
				anchors: ['firstPage', '2ndPage', '3rdPage', '4thPage', '5thPage'],
				lockAnchors: true,
				menu: '#menu',
				scrollingSpeed: 1000,
				responsiveWidth: 900,
			});
		});