Template.highChart.helpers({
	getPositionData: function() {
		console.log('called');
		var dataToUseObject = PositionOverTime.findOne();
		var dataToUse = dataToUseObject[data];
		//return dataToUse;
	}
});


Template.highChart.events = {
	'click #graphLoading' : function(event) {
		var positionData = this;
		$('#container').highcharts({
	        title: {
	            text: 'Position vs. Time',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'a simulation',
	            x: -20
	        },
	        yAxis: {
	            title: {
	                text: 'Position'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: 'mm'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Position',
	            data: positionData
	        }]
	    });
	}
}
