function onAutocompleteChange(autocompletefield, value) {
    $.aceOverWatch.toast.show('success', 'The autocomplete has been changed to:' + value);
}

function toggleLabelPlacementAutocomplete(button) {
	
	let autocompleteElement = button.parents('.example-container').first().find('[type="autocomplete"]');
	
	let newPlecement = autocompleteElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    autocompleteElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyAutocomplete(button) {
	
	let autocompleteElement = button.parents('.example-container').first().find('[type="autocomplete"]');
	
	let willBeReadonly = autocompleteElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    autocompleteElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The autocomplete element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueAutocomplete(button) {
	let writtenAutocomplete = button.parents('.example-container').first().find('[type="autocomplete"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenAutocomplete,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Autocomplete value: <br>' + writtenAutocomplete);
    }
}