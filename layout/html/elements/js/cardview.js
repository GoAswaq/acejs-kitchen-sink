var cardViewObj = {
	init : function(){
		this.cardview1 = $('#ex1-cardview');
		this.cardview2 = $('#ex2-cardview');
	}
}

function onSwitchPanel1(target, value){
	$.aceOverWatch.field.cardview.switchTo(cardViewObj.cardview1,parseInt(value));
}

function onSwitchPanel2(target, value){
	$.aceOverWatch.field.cardview.switchTo(cardViewObj.cardview2,parseInt(value));
}

cardViewObj.init();