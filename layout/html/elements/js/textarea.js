function toggleLabelPlacementTextarea(button) {
	
	let textareaElement = button.parents('.example-container').first().find('[type="textarea"]');
	
	let newPlecement = textareaElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    textareaElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyTextarea(button) {
	
	let textareaElement = button.parents('.example-container').first().find('[type="textarea"]');
	
	let willBeReadonly = textareaElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    textareaElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The textarea element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueTextarea(button) {
	let writtenTextarea = button.parents('.example-container').first().find('[type="textarea"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenTextarea,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Textarea value: <br>' + writtenTextarea);
    }
}

function onFocusInTextArea(textArea){
	$.aceOverWatch.toast.show('success','The text area element has input focus now!');	
}