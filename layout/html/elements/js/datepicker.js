function onDatepickerChange(datepicker, value) {
    $.aceOverWatch.toast.show('success', 'The date has been changed to:' + value);
}

function onDatepickerClose(datepicker, value) {
    $.aceOverWatch.toast.show('success', 'The current selected date is:' + value);
}

function toggleLabelPlacementDatepicker(button) {
	
	let datepickerElement = button.parents('.example-container').first().find('[type="datepicker"]');
	
	let newPlecement = datepickerElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    datepickerElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyDatepicker(button) {
	
	let datepickerElement = button.parents('.example-container').first().find('[type="datepicker"]');
	
	let willBeReadonly = datepickerElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    datepickerElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The datepicker element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueDatepicker(button) {
	let writtenDatepicker = button.parents('.example-container').first().find('[type="datepicker"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenDatepicker,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Datepicker value: <br>' + writtenDatepicker);
    }
}

