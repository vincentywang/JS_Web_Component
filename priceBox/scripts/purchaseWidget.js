var widget = (function(jsonData){

	var $purchaseWidget,  
		$qualityTab,      
		$textLink,        
		$priceList,       
		$ticketCounter,   
		$priceLabel,      
		$payButton,
		$numTicket;

	var	dataSource = {
		originData : null,
		quality : [],
		linkMsg : 'https://www.github.com',
		getQualityType : function() {
			for (var index in this.originData) {
				if (this.originData.hasOwnProperty(index)) {
					this.quality.push(index);
				}
			}
			return this.quality;
		},
		getTextLinkMsg : function() {
			return this.linkMsg;
		},
		getQualityPrice : function(qualityTag) { // SD, HD
			for (var index in this.originData) {
				if (this.originData.hasOwnProperty(index)) {
					if (index === qualityTag) {
						return this.originData[index];
					}
				}
			}
		}
	};

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
		
		$purchaseWidget =  $("<div></div>", {"id" : "purchaseWidget"});
		$qualityTab =      $("<div></div>", {"id" : "qualityTab"});
		$textLink =        $('<div></div>', {"id" : "textLink"});
		$priceList =       $('<div></div>', {"id" : "priceList"});
		$ticketCounter =   $('<div></div>', {"id" : "ticketCounter"});
		$priceLabel =      $('<div></div>', {"id" : "priceLabel"});
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
				console.log(data);
				dataSource.originData = data;
				// dataSource.getQualityType();
				buildQualityTab();
				buildTextLink();
				buildPriceList('SD');
				buildTicketCounter();
			}
		});
	}
	
	

	/**
	 * passing in array ['SD', 'HD', '3D', '4K']
	 */
	function buildQualityTab () {
		// console.log('buildQualityTab.call');
		var imgSrc = '',
			sdSrc = '/assets/img/sd.png',
			hdSrc = '/assets/img/hd.png',
			threeDSrc = '/assets/img/3d.png',
			fourKSrc = '/assets/img/4k.png',
			sdFocSrc = '/assets/img/sd_focus.png',
			hdFocSrc ='/assets/img/hd_focus.png',
			threeDFocSrc = '/assets/img/3d_focus.png',
			fourKFocSrc = '/assets/img/4k_focus.png';

		var quality = dataSource.getQualityType();
		// console.log(quality);

		var qualityTabEle = function(src) {
			var tab = $("<div>", {
				"class" : 'single-quality-tab',
				"html" : '<div class="tab-wrapper"><div class="tab"><img src="' + src + '"></div></div>'
			});
			return tab;
		};

		for (var index in quality) {
			// console.log('if i am in the for loop')
			if (quality.hasOwnProperty(index)) {
				switch(quality[index]) {
					case 'SD':
						imgSrc = sdSrc;
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

			qualityTabEle(imgSrc).appendTo($qualityTab);

		}
		var clearEle = $("<div>", {
			"class" : "clear-both"
		});
		$qualityTab.append(clearEle);

	}

	function buildTextLink () {

		var href = dataSource.getTextLinkMsg();
		var link = $("<a>", {
			href : href,
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


	/**
	 *  
	 *
	 */
	function buildPriceList (qualityTag) {

		var oPriceList = dataSource.getQualityPrice(qualityTag);

		// var priceList = $('<div/>', {
		// 	id : "purchaseWidgetLeft",
		// 	"class" : "purchase-widget-top"
		// }).appendTo('#purchaseWidget');
		var priceElement = function(num, price) {
			var ticketNum = num,
				singlePrice = price,
				ticketText;

			if (ticketNum > 1) {
				ticketText = "tickets";
			} else {
				ticketText = "ticket";
			}

			var ele = $("<div></div>", {
				'class' : 'single-price-ele-wrapper',
				'html' : '<li><div class="single-price-box"><div></div></div><div class="single-price-ele">' + num + ticketText + price + '/user' +'</div></li>'
			});

			return ele;
		};

		var $ul = $('<ul/>');
		// $ul.appendTo(priceList);
		console.log(oPriceList);

		for (var index in oPriceList) {
			console.log('do i run this function');
			if (oPriceList.hasOwnProperty(index)) {
				priceElement(index, oPriceList[index]).appendTo($ul);
			}
		}

		$ul.appendTo($priceList);
		
	}

	/**
	 * This function should work for all quality types
	 * @return {[type]}
	 */
	function initPriceList () {	
		console.log("initPriceList.call");
		// init price list select the first one
		$("div.single-price-box").eq(0).addClass('select');
		// init ticket counter set the number 1
		numTicket = 1;
		$("div.ticket-num").html(numTicket);

	}

	function buildPriceLabel (price, priceHolder) {
		
	}

	// leason event about user click, update number according to the index
	function buildTicketCounter () {
		var labelText = "Number of tickets";
		var labelTextEle = $("<div>", {
			"class" : "ticket-label-text",
			"text" : labelText
		});
		var upperarrow = $("<div>", {
			id : "up_arrow",
			html : "<span class=\"mk-moon-arrow-up\"></span>"
		});
		var downarrow = $("<div>", {
			id : "down_arrow",
			html : "<span class=\"\"></span>"
		});
		var labelTicketNum = $("<div>", {
			"class" : "ticket-num"
		});
		var controlPan = $("<div>", {
			"class" : "control-pan"
		});
		controlPan.append(upperarrow).append(downarrow);
		var counter = $("<div>", {
			"class" : "ticket-counter"
		});
	
		counter.append(labelTicketNum).append(controlPan);

		labelTextEle.appendTo($ticketCounter);
		counter.appendTo($ticketCounter);
		initPriceList();
		registerTicketArrows();
	}

	function registerTicketArrows () {
		$('div#up_arrow').on('click', function(){
			console.log("click up arrow");
			addOneTicket();
		});
		$('div#down_arrow').on('click', function(){
			console.log("click down arrow");
			subOneTicket();
		});
	}

	function registerQualityChange () {
		var qualityTab = $('quality');
		qualityTab.on('click', function() {
			var quality = $(this).data('tag');
			var oPricet = getPrice(quality);
			buildPriceList(oPricet); // render update page, 
		});
	}

	function addOneTicket () {
		numTicket ++ ;
		updateTicketNum(numTicket);
	}

	function subOneTicket () {
		numTicket --;
		updateTicketNum(numTicket);
	}

	function updateTicketNum (numTicket) {
		$('div.ticket-num').html(parseInt(numTicket));
	}

	return {
		render : render,
		test : testFun,
		init : init
	};

})();


