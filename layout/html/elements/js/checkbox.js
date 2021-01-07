function onCheckboxChange(checkboxfield, value) {
    $.aceOverWatch.toast.show('success', 'The checkbox has been changed to:' + value);
}

function toggleLabelPlacementCheckbox(button) {
	
	let checkboxElement = button.parents('.example-container').first().find('[type="checkbox"]');
	
	let newPlecement = checkboxElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    checkboxElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyCheckbox(button) {
	
	let checkboxElement = button.parents('.example-container').first().find('[type="checkbox"]');
	
	let willBeReadonly = checkboxElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    checkboxElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The checkbox element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueCheckbox(button) {
	$.aceOverWatch.toast.show('success','Checkbox value is: ' + button.parents('.example-container').first().find('[type="checkbox"]').ace('value'));
}