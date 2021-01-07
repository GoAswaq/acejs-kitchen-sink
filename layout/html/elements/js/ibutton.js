function toggleReadonlyIButton(button) {
	
	let buttonElement = button.parents('.example-container').first().find('.ks-target[type="iconbutton"]');
	
	let willBeReadonly = buttonElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    buttonElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The button element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueIButton(button) {
	$.aceOverWatch.toast.show('success','IButton value is: ' + button.parents('.example-container').first().find('[type="iconbutton"]').ace('value'));
}

function actionIButtonTest(button){
	$.aceOverWatch.toast.show('success','Hurray, you pressed a button! Well done!');
}