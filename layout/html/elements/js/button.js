function toggleReadonlyButton(button) {
	
	let buttonElement = button.parents('.example-container').first().find('.ks-target[type="button"]');
	
	let willBeReadonly = buttonElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    buttonElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The button element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function toggleIconPositionButton(button) {
	
	let buttonElement = button.parents('.example-container').first().find('.ks-target[type="button"]');
	
	let newPosition = buttonElement.data($.aceOverWatch.settings.aceSettings).iconposition == 'before' ? 'after' : 'before';
	buttonElement.ace('modify',{
		iconposition : newPosition
	});
	
	$.aceOverWatch.toast.show('success', 'The icon is now:' + newPosition);
}

function getValueButton(button) {
	$.aceOverWatch.toast.show('success','Button value is: ' + button.parents('.example-container').first().find('[type="button"]').ace('value'));
}

function actionButtonTest(button){
	$.aceOverWatch.toast.show('success','Hurray, you pressed a button! Well done!');
}