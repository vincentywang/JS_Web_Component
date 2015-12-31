var widget = (function(jsonData){

	var $purchaseWidget,  
		$qualityTab,      
		$textLink,        
		$priceList,       
		$ticketCounter,   
		$priceLabel,      
		$payButton,
		quality = [];

	var	dataSource = {
		originData : null,
		quality : [],
		getQualityType : function() {
			for (var index in this.originData) {
				if (this.originData.hasOwnProperty(index)) {
					quality.push(index);
				}
			}
		}
	}

	function init (argument) {
		initBasicHtml();
		render();
		testFun();
	}

	function testFun () {
		console.trace(dataSource.quality);
	}

	// init html wrapper to set up variables
	function initBasicHtml (argument) {
		// #purchaseWidget
		// #qualityTab
		// #textLink
		// #priceList
		// #ticketsCounter
		// #priceLabel
		// #payButton
		
		$purchaseWidget =  $("<div></div>", {"id" : "purchaseWidget"}),
		$qualityTab =      $("<div></div>", {"id" : "qualityTab"}),
		$textLink =        $('<div></div>', {"id" : "textLink"}),
		$priceList =       $('<div></div>', {"id" : "priceList"}),
		$ticketCounter =   $('<div></div>', {"id" : "ticketCounter"}),
		$priceLabel =      $('<div></div>', {"id" : "priceLabel"}),
		$payButton =       $('<div></div>', {"id" : "payButton"});

		$purchaseWidget
			.append($qualityTab)
			.append($textLink)
			.append($priceList)
			.append($ticketCounter)
			.append($priceLabel)
			.append($payButton);

		// $purchaseWidget.appendTo($('div#myApp'));
		$('div#myApp').append($purchaseWidget);

	}
	

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
				dataSource.originData = data;
				// dataSource.getQualityType();
				// console.log(quality);
				buildQualityTab(quality);
				buildTextLink();
			}
		})
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

		tab = $("<div>", {
			id: 'qualityTab',
			"class": 'purchaseWidgetSpecial',
			text: 'this quality tab'
		}).appendTo($qualityTab);

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

			tabEle.appendTo($qualityTab);
		}

	}

	function buildTextLink () {
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
		.appendTo($textLink);
	}

	function buildPriceList (oPriceList) {

		var priceList = $('<div/>', {
			id : "purchaseWidgetLeft",
			"class" : "purchase-widget-top"
		}).appendTo('#purchaseWidget');
		var $ul = $('<ul/>');
		$ul.appendTo(priceList);

		for (var index in oPriceList) {
			if (oPriceList.hasOwnProperty(index)) {
				$('<li/>', {
					html : "<div><div class=\"pricebox\"><div class=\"price_item\"><div class=\"clearboth\"></div></div></div></div>"
				}).appendTo($ul);
			}
		}
	}
	function buildPriceLabel (price, priceHolder) {
		
	}

	// leason event about user click, update number according to the index
	function buildTicketCounter () {
		var labelText = "Number of tickets";
		var upperarrow = $("div", {
			id : "up_arrow",
			html : "<span class=\"mk-moon-arrow-up\"></span>"
		});
		var downarrow = $("div", {
			id : "down_arrow",
			html : "<span class=\"\"></span>"
		})
	}

	return {
		render : render,
		test : testFun,
		init : init
	}

})();


