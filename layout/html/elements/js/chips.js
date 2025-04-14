var chipsObj = {
	visibility : true,
}

function toggleReadonlyChips(button) {
	
	let chipsElement = button.parents('.example-container').first().find('[type="chips"]');
	
	let willBeReadonly = chipsElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    chipsElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The chips element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function toggleClickOnChips(button) {

	let chipsElement = button.parents('.example-container').first().find('[type="chips"]');

	let willBeClickable = chipsElement.data($.aceOverWatch.settings.aceSettings).clickonchips ? false : true;
	chipsElement.ace('modify',{
		clickonchips : willBeClickable
	});

	$.aceOverWatch.toast.show('success', 'Chips may be removed:' + (willBeClickable ? 'by clicking on X' : 'by clicking anywhere on X'));
}

function getValueChips(button) {
	let chipsData = button.parents('.example-container').first().find('[type="chips"]').ace('value');
	
	let chipsDataTexts = [];
	for(let idx in chipsData ){
		chipsDataTexts.push(chipsData[idx].val('name')+'['+chipsData[idx].val('value')+']');
	}

    if ($.aceOverWatch.utilities.isVoid(chipsDataTexts,true)) {
        $.aceOverWatch.toast.show('error', 'There are currently no chips specified!');
    }
    else {
        $.aceOverWatch.toast.show('success','The current chips, and their values are: <br>' + chipsDataTexts.join(', '));
    }
}

function allowChipTextToBeAdded(target, value){
	if( $.aceOverWatch.utilities.isVoid(value) ){
		value = '';
	}
	if( value.length > 3 ){
		$.aceOverWatch.toast.show(
		        'error',
		        'The text you have entered is too big! Please enter texts of no more than 3 characters!',
		    );
		return false;
	}
	return true;
}

function onChipAdded(chips, record){
	$.aceOverWatch.toast.show(
	        'success',
	        'A new chip has been added: '+record.val('name')+', value: '+record.val('value')
	    );
}

function onChipRemoved(chips, idx, record){
	$.aceOverWatch.toast.show(
	        'warning',
	        'A chip has been removed: '+record.val('name')+', value: '+record.val('value')+', at the position: '+idx
	    );
}