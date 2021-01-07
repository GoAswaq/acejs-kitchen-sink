function onSwitchChange(switchfield, value) {
    $.aceOverWatch.toast.show('success', 'The switch has been changed to:' + value);
}

function toggleLabelPlacementSwitch(button) {
	
	let switchElement = button.parents('.example-container').first().find('[type="switch"]');
	
	let newPlecement = switchElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    switchElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlySwitch(button) {
	
	let switchElement = button.parents('.example-container').first().find('[type="switch"]');
	
	let willBeReadonly = switchElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    switchElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The switch element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueSwitch(button) {
	$.aceOverWatch.toast.show('success','Switch value is: ' + button.parents('.example-container').first().find('[type="switch"]').ace('value'));
}