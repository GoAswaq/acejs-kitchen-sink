function onDaterangepickerChange(daterangepicker, value) {
    $.aceOverWatch.toast.show('success', 'The date has been changed to:' + value);
}

function onDaterangepickerClose(daterangepicker, value) {
    $.aceOverWatch.toast.show('success', 'The current selected date is:' + value);
}

function toggleLabelPlacementDaterangepicker(button) {
	
	let daterangepickerElement = button.parents('.example-container').first().find('[type="daterangepicker"]');
	
	let newPlecement = daterangepickerElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    daterangepickerElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyDaterangepicker(button) {
	
	let daterangepickerElement = button.parents('.example-container').first().find('[type="daterangepicker"]');
	
	let willBeReadonly = daterangepickerElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    daterangepickerElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The daterangepicker element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueDaterangepicker(button) {
	let writtenDaterangepicker = button.parents('.example-container').first().find('[type="daterangepicker"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenDaterangepicker,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Daterangepicker value: <br>' + writtenDaterangepicker);
    }
}

