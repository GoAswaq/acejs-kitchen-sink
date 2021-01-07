var blurObj = {

}

function toggleBlur(button) {
	
	let target = button.parents('.example-container').first().find('.ks-target');
	
	if( target.hasClass('ace-show') ){
		target.removeClass('ace-show');
	}else{
		target.addClass('ace-show');
	}
}

function toggleDeblur(button) {
	
	let target = button.parents('.example-container').first().find('.ks-target-2');
	
	if( target.hasClass('ace-show') ){
		target.removeClass('ace-show');
	}else{
		target.addClass('ace-show');
	}
}

function toggleBlurAndDeblur(button){
	toggleBlur(button);
	toggleDeblur(button);
}

function onBlurACSelect(target, value, recordData){
	
	let blur = target.parents('.example-container').first().find('.ks-target');
	let deblur = target.parents('.example-container').first().find('.ks-target-2');
	
	if( recordData ){
		blur.addClass('ace-show');
		deblur.addClass('ace-show');
	}else{
		blur.removeClass('ace-show');
		deblur.removeClass('ace-show');
	}
}