var pamObj = {
	init : function(){
		this.paddingElements = $('#padding-test-elements .ks-padding-controll');
		this.marginElements = $('#margin-test-elements .ks-margin-controll');
	},
	togglePaddingControlClass : function(fromButton){
		this.paddingElements.toggleClass(fromButton.attr('label'));
	},
	toggleMarginControlClass : function(fromButton){
		this.marginElements.toggleClass(fromButton.attr('label'));
	}
}

function togglePaddingModifier(button,value){
	pamObj.togglePaddingControlClass(button);
}
function toggleMarginModifier(button,value){
	pamObj.toggleMarginControlClass(button);
}

pamObj.init();
