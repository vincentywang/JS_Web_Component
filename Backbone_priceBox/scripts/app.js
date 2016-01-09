var Price = Backbone.Model.extend({});

var data = {
	"SD" : {
		"1" : "3.99",
		"2" : "3.49",
		"3" : "2.99"
	},
	"HD" : {
		"1" : "4.99",
		"2" : "4.49",
		"3" : "3.99"
	}
};

var price = new Price(data);

