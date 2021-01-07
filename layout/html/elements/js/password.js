function onPasswordChange(passwordfield, value) {
    $.aceOverWatch.toast.show('success', 'The password has been changed to:' + value);
}

function toggleLabelPlacementPassword(button) {
	
	let passwordElement = button.parents('.example-container').first().find('[type="password"]');
	
	let newPlecement = passwordElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    passwordElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function togglePlaceholderPassword(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="password"]');
	
	let placeholder = textElement.data($.aceOverWatch.settings.aceSettings).placeholder == '' ? 'type something here' : '';
	textElement.ace('modify',{
		placeholder : placeholder
	});
	
	$.aceOverWatch.toast.show('success', placeholder == '' ? 'The palceholder was removed' : 'The field has a palceholder now!');
}


function toggleReadonlyPassword(button) {
	
	let passwordElement = button.parents('.example-container').first().find('[type="password"]');
	
	let willBeReadonly = passwordElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    passwordElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The password element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValuePassword(button) {
	let writtenPassword = button.parents('.example-container').first().find('[type="password"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenPassword,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Password value: <br>' + writtenPassword);
    }
}