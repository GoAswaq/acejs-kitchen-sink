function onTextChange(textfield, value) {
    $.aceOverWatch.toast.show('success', 'The text has been changed to:' + value);
}

function toggleLabelPlacementText(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="text"]');
	
	let newPlecement = textElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    textElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function togglePlaceholderText(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="text"]');
	
	let placeholder = textElement.data($.aceOverWatch.settings.aceSettings).placeholder == '' ? 'type something here' : '';
	textElement.ace('modify',{
		placeholder : placeholder
	});
	
	$.aceOverWatch.toast.show('success', placeholder == '' ? 'The palceholder was removed' : 'The field has a palceholder now!');
}

function toggleReadonlyText(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="text"]');
	
	let willBeReadonly = textElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    textElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The text element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueText(button) {
	let writtenText = button.parents('.example-container').first().find('[type="text"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenText,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Text value: <br>' + writtenText);
    }
}