var popoverObj = {
		

}

function showPopover(button){
	button.parent().find('.ace-popover').addClass('ace-show');
}

function hidePopover(button){
	button.parents('.ace-popover').first().removeClass('ace-show');
}

