var widget = (function(jsonData){

	var $purchaseWidget,  
		$qualityTab,      
		$textLink,        
		$priceList,       
		$ticketCounter,   
		$priceLabel,      
		$payButton,
		$numTicket,
		iOneTicPrice,
		iTwoTicPrice,
		iThreeTicPrice;

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
			if (this.originData) {
				for (var index in this.originData) {
					if (this.originData.hasOwnProperty(index)) {
						if (index === qualityTag) {
							return this.originData[index];
						}
					}
				}	
			} else {
				console.error("dataSource.originData not set");
			}
		},

		setQualityPrice : function(qualityTag) {
			qualityTag = qualityTag || 'SD' ;
			var aPrice = this.getQualityPrice(qualityTag);
			iOneTicPrice = parseFloat(aPrice[1]);
			iTwoTicPrice = parseFloat(aPrice[2]);
			iThreeTicPrice = parseFloat(aPrice[3]);
		},

		getTicketPrice : function(numTic) {
			var price,
				num = parseInt(numTic);
			switch (num) {
				case 1:
					price = num * parseFloat(iOneTicPrice);
					break;
				case 2:
					price = num * parseFloat(iTwoTicPrice);
					break;
				default:
					price = num * parseFloat(iThreeTicPrice);
					break;
			}
			return price;
		},

		getQualityBasicPrice : function(qualityTag) {
			qualityTag = qualityTag || 'SD' ;
			console.log(qualityTag);
			var aPrice = this.getQualityPrice(qualityTag);
			console.dir(aPrice);
			return aPrice[1];
		}
	};

	function init (qualityTag) {
		// initBasicHtml();
		qualityTag = qualityTag || 'SD' ;
		bindEvent(qualityTag);
		loadData();
		render(); 
	}

	
	/**
	 * initialize basic HTML
	 * @return object a jQuery object contain the app's basic HTML structure
	 */
	function initBasicHtml () {
		
		$purchaseWidget =  $("<div></div>", {"id" : "purchaseWidget"});
		$qualityTab =      $("<div></div>", {"id" : "qualityTab"});
		$textLink =        $('<div></div>', {"id" : "textLink"});
		$priceList =       $('<div></div>', {"id" : "priceList"});
		$ticketCounter =   $('<div></div>', {"id" : "ticketCounter"});
		$priceLabel =      $('<div></div>', {"id" : "priceLabel"});
		$payButton =       $('<div></div>', {"id" : "payButton"});

		return $purchaseWidget
			.append($qualityTab)
			.append($textLink)
			.append($priceList)
			.append($ticketCounter)
			.append($priceLabel)
			.append($payButton);
	}
	

	/**
	 * render price list and price label when click different quality tab
	 * render price label when click up and down arrow
	 * 
	 * @param  string qualityTag [description]
	 * @return int num            [description]
	 */
	function render (qualityTag, num) {
		console.log("what is the qualityTag");
		console.log(qualityTag);

		if (typeof qualityTag === 'undefined') { // initialize render
			qualityTag = qualityTag || 'SD' ;
			var eleTag = 'div#myApp';
			// var price = this.dataSource.getQualityBasicPrice(qualityTag);
			// console.log(price);
			$(eleTag).append(initBasicHtml());
		} else { // update render
			dataSource.setQualityPrice(qualityTag);
			var price = dataSource.getTicketPrice(num);
			buildPriceList(qualityTag);
			buildPriceLabel(price);
		}
	
		// buildQualityTab();
		console.log("render.call");
	}	

	function loadData () {
		$.ajax({
			url : 'data.json',
			dataType : 'json',
			success : function(data) {
				$(document)
					.trigger("widget/load/success", data)
					.trigger("widget/build/qualityTab")
					.trigger("widget/build/textLink")
					.trigger("widget/build/priceList")
					.trigger("widget/build/ticketCounter")
					.trigger("widget/build/priceLabel");
			}
		});
	}

	function bindEvent (qualityTag) {
		$(document)
			.on("widget/load/success", function(event, data){
				console.log(data);
				dataSource.originData = data;
			})
			.on("widget/build/qualityTab", function() {
				buildQualityTab();
			})
			.on("widget/build/textLink", function() {
				buildTextLink();
			})
			.on("widget/build/priceList", function() {
				buildPriceList(qualityTag);
			})
			.on("widget/build/ticketCounter", function() {
				buildTicketCounter();
			})
			.on("widget/build/priceLabel", function(){
				dataSource.setQualityPrice(qualityTag);
				buildPriceLabel(dataSource.getTicketPrice(1));
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
			fourKSrc = '/assets/img/4k.png';

		var quality = dataSource.getQualityType();
		// console.log(quality);

		var qualityTabEle = function(src, tag) {
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
			qualityTag = quality[index];
			qualityTabEle(imgSrc, qualityTag).attr({
				"data-tag" : qualityTag
			}).appendTo($qualityTab);

		}
		var clearEle = $("<div>", {
			"class" : "clear-both"
		});
		$qualityTab.append(clearEle);
		registerQualityChange();

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
		console.log(oPriceList);

		// var priceList = $('<div/>', {
		// 	id : "purchaseWidgetLeft",
		// 	"class" : "purchase-widget-top"
		// }).appendTo('#purchaseWidget');
		var priceElement = function(num, price) {
			var ticketNum = num,
				singlePrice = price,
				ticketText;

			ticketText = (ticketNum > 1) ? 'tickets' : 'ticket';

			var ele = $("<div></div>", {
				'class' : 'single-price-ele-wrapper',
				'html' : '<li><div class="single-price-box"><div></div></div><div class="single-price-ele">' + num + ' ' + ticketText + ' ' + price + '/user' +'</div></li>'
			});

			return ele;
		};

		var $ul = $('<ul/>');
		// $ul.appendTo(priceList);
		console.log(oPriceList);

		for (var index in oPriceList) {
			if (oPriceList.hasOwnProperty(index)) {
				priceElement(index, oPriceList[index]).appendTo($ul);
			}
		}

		$priceList.html($ul);
		
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

	// leason event about user click, update number according to the index
	function buildTicketCounter () {

		var labelText = "Number of tickets";
		var labelTextEle = $("<div>", {
			"class" : "ticket-label-text",
			"text" : labelText
		});
		var upperarrow = $("<div>", {
			class : "up_arrow",
			html : "<span class=\"mk-moon-arrow-up\"></span>"
		});
		var downarrow = $("<div>", {
			class : "down_arrow",
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

	
	function buildPriceLabel (price) {
		price = price || 0 ;
		var priceLabel = $("<div>", {
			class : "price-label",
			html : '<div class="price-label-text"></div><div class="price-wrapper"><div class="price">' + price +'</div></div>'
		});
		$priceLabel.html(priceLabel);

	}

	function registerTicketArrows () {

		$('div.control-pan').on('click', 'div', function(){
			var $this = $(this);
			if ($this.hasClass('up_arrow')) {
				console.log("click up arrow");
				addOneTicket();
			} else if ($this.hasClass('down_arrow')) {
				console.log("click down arrow");
				subOneTicket();
			}
		});


		// $('div#up_arrow').on('click', function(){
		// 	console.log("click up arrow");
		// 	addOneTicket();
		// });
		// $('div#down_arrow').on('click', function(){
		// 	console.log("click down arrow");
		// 	subOneTicket();
		// });
	}

	function registerQualityChange () {
		var	defaultTicNum = 1 ;
		$('div.single-quality-tab').on('click', function() {
			var quality = $(this).data('tag');
			console.log("clicked " + quality + " tab");
			render(quality, defaultTicNum);
		});
	}

	function addOneTicket () {
		numTicket ++ ;
		updateTicketNum(numTicket);
		buildPriceLabel(dataSource.getTicketPrice(numTicket));
	}

	function subOneTicket () {
		
		if (numTicket > 1) {
			numTicket --;
			updateTicketNum(numTicket);
			buildPriceLabel(dataSource.getTicketPrice(numTicket));
		}
	}

	function updateTicketNum (numTicket) {
		$('div.ticket-num').html(parseInt(numTicket));
	}

	return {
		render : render,
		init : init
	};

})();


