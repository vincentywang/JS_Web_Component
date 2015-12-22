var widget = (function(jsonData){
	var qualityTab,
			pageLink,
			priceList,
			ticketCounter,
			priceLabel,
			purchaseButton,
			quality = [];

	function render () {
		loadData();
		// buildQualityTab();
		console.log("call this render function");
	}	

	function loadData () {
		$.ajax({
			url : 'data.json',
			dataType : 'json',
			success : function(data) {
				console.log(data)
				getQualityType(data);
				console.log(quality);
				buildQualityTab(quality);
				buildPageLink();
			}
		})
	}
	
	function getQualityType (jsonData) {
		for (var index in jsonData) {
			if (jsonData.hasOwnProperty(index)) {
				quality.push(index);
			}
		}
	}

	/**
	 * passing in array ['SD', 'HD', '3D', '4K']
	 */
	function buildQualityTab (q) {
		var imgSrc = '',
				sdSrc = '/assets/img/sd.png',
				hdSrc = '/assets/img/hd.png',
				threeDSrc = '/assets/img/3d.png',
				fourKSrc = '/assets/img/4k.png',
				sdFocSrc = '/assets/img/sd_focus.png',
				hdFocSrc ='/assets/img/hd_focus.png',
				threeDFocSrc = '/assets/img/3d_focus.png',
				fourKFocSrc = '/assets/img/4k_focus.png';

		qualityTab = $("<div>", {
			id: 'qualityTab',
			"class": 'purchaseWidgetSpecial',
			text: 'this quality tab'
		}).appendTo('#purchaseWidget');

		for (var index in q) {
			if (q.hasOwnProperty(index)) {
				switch(q[index]) {
					case 'SD':
						imgSrc = sdFocSrc;
						break;
					case 'HD':
						imgSrc = hdSrc;
						break;
					case '3D':
						imgSrc = threeDSrc;
						break;
					case '4K':
						imgSrc = fourKSrc;
						break;
					default:
						imgSrc = sdFocSrc;	
				}
			}

			var imgEle = $("<img>", {src : imgSrc}),
					tabEle = $("<div/>", {
				id : q[index],
				"class" : 'movieQualityIcon movieQualityIcon_click'
			}).append(imgEle);

			tabEle.appendTo(qualityTab);
		}

	}

	function buildPageLink () {
		var link = $("<a>", {
			href : 'http://www.synaptop.com/how-to-watch-movies-with-friends/',
			html : '<span>Watch with friends in sync</span>'
		});
		var linkWrapper = $("<div/>",{
			"class" : 'external_link'
		}).append(link);

		var pageLink = $("<div/>", {
			"class" : "wild_screen"
		}).append(linkWrapper)
		.appendTo("#purchaseWidget");
	}



	return {
		render : render,
		test : getQualityType
	}

})();


