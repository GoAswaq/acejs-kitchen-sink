var displayObj = {
	lastYNRendererValue : 1,
	getOtherYNRendererValue : function(){
		this.lastYNRendererValue = this.lastYNRendererValue == 1 ? 0 : 1; 
		return this.lastYNRendererValue;
	}
};

function getValueDisplay(button) {
	let writtenText = button.parents('.example-container').first().find('[type="display"]').ace('value');

	$.aceOverWatch.toast.show('success','Display value: <br>' + writtenText);
}

function toggleDisplayYNRendererValue(button){
	button.parents('.example-container').first().find('[type="display"]').ace('value',displayObj.getOtherYNRendererValue());
}

function toggleLabelPlacementDisplay(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="display"]');
	
	let newPlecement = textElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    textElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}