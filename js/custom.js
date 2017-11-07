$(document).ready(function() {
			"use strict";
			$('#fullpage').fullpage({
				sectionsColor: ['#f7f7f7', '#000000', '#f7f7f7', '#000000', '#f7f7f7','#000000'],
				anchors: ['firstPage', '2ndPage', '3rdPage', '4thPage', '5thPage', '6thPage'],
				lockAnchors: true,
				menu: '#menu',
				scrollingSpeed: 1000,
				responsiveWidth: 900,
			});
		});