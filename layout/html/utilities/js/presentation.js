var presentationObj = {
		
	init : function(){

	},

}

function togglePresentationInfoHideOnMobile(checkBox,value){
	let target = checkBox.parents('.example-container').first().find('.ks-target');

	if( value == 1 ){
		target.find('.ace-presentation-container').addClass('ace-presentation-hide-mobile-info');
	}else{
		target.find('.ace-presentation-container').removeClass('ace-presentation-hide-mobile-info');
	}
}

function togglePresentationInfoLeftAlign(checkBox,value){
	let target = checkBox.parents('.example-container').first().find('.ks-target');

	if( value == 1 ){
		target.find('.ace-presentation-container').addClass('ace-presentation-container-reverse');
	}else{
		target.find('.ace-presentation-container').removeClass('ace-presentation-container-reverse');
	}
}

function togglePresentationInfoHideExplicit(checkBox,value){
	let target = checkBox.parents('.example-container').first().find('.ks-target');

	if( value == 1 ){
		target.find('.ace-presentation-container').addClass('ace-presentation-hidden-info');
	}else{
		target.find('.ace-presentation-container').removeClass('ace-presentation-hidden-info');
	}
}


presentationObj.init();