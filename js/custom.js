$(document).ready(function() {
			"use strict";
			$('#fullpage').fullpage({
				sectionsColor: ['#e5e5e5', '#222222', '#e5e5e5', '#222222', '#e5e5e5'],
				anchors: ['firstPage', '2ndPage', '3rdPage', '4thPage', '5thPage'],
				lockAnchors: true,
				menu: '#menu',
				scrollingSpeed: 1000,
				responsiveWidth: 900,
			});
		});