var accordionObj = {
	visibility : true,
}

function onAccordionSelection(tag, data){
	
	let actualTag = tag;
	
	if( data.tag != actualTag ){
		/*
		 * this can happen when the item has been loaded remotely from the server
		 */
		actualTag = data.tag;
	}
	
	$.aceOverWatch.toast.show(
	        'success',
	        'The following tag has been activated:'+actualTag,
	    );
}

function openAllAccordionTags(button){
	$.aceOverWatch.field.accordion.openAllTags(button.parents('.example-container').first().find('.ks-target[type="accordion"]'));
}

function closeAllAccordionTags(button){
	$.aceOverWatch.field.accordion.closeAllTags(button.parents('.example-container').first().find('.ks-target[type="accordion"]'));
}

function toggleFreezeAccordion(button){
	let accordionoElement = button.parents('.example-container').first().find('.ks-target[type="accordion"]');
	
	let willBeExpandable = accordionoElement.data($.aceOverWatch.settings.aceSettings).enabledexpand ? false : true;
    accordionoElement.ace('modify',{
    	enabledexpand : willBeExpandable
    });
    
    $.aceOverWatch.toast.show('success', 'The accordion is now:' + (willBeExpandable ? 'UN-FROZEN' : 'FROZEN'));
}

function toggleCheckAllAccordion(button){
	let accordionoElement = button.parents('.example-container').first().find('.ks-target[type="accordion"]');
	
	let willBeChecked = accordionoElement.data($.aceOverWatch.settings.aceSettings).checkall ? false : true;
	accordionoElement.ace('modify',{
		checkall : willBeChecked
	});
	
	$.aceOverWatch.toast.show('success', 'The accordion is now:' + (willBeChecked ? 'CHECKED!' : 'Unchecked!'));
}

function getCheckedTags(button){
	let tags = $.aceOverWatch.field.accordion.getCheckedTags(button.parents('.example-container').first().find('.ks-target[type="accordion"]'));
	$.aceOverWatch.toast.show('success', 'The checked tags are:' + tags.join(', '));
}

function getCheckedLeaves(button){
	let tags = $.aceOverWatch.field.accordion.getCheckedLeaves(button.parents('.example-container').first().find('.ks-target[type="accordion"]'));
	$.aceOverWatch.toast.show('success', 'The checked leaves are:' + tags.join(', '));
}