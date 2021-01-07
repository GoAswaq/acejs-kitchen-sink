function toggleReadonlyUploadbutton(button) {
	
	let uploadbuttonElement = button.parents('.example-container').first().find('[type="uploadbutton"]');
	
	let willBeReadonly = uploadbuttonElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    uploadbuttonElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The uploadbutton element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function toggleRoundedUploadbutton(button) {
	
	let uploadbuttonElement = button.parents('.example-container').first().find('[type="uploadbutton"]');
	
	let willBeRounded = uploadbuttonElement.data($.aceOverWatch.settings.aceSettings).rounded ? false : true;
    uploadbuttonElement.ace('modify',{
        rounded : willBeRounded
    });
    
    $.aceOverWatch.toast.show('success', 'The uploadbutton element is now:' + (willBeRounded ? 'ROUNDED' : 'NOT Rounded'));
}

function getValueUploadbutton(button) {
	let writtenUploadbutton = button.parents('.example-container').first().find('[type="uploadbutton"]').ace('value');

    if ($.aceOverWatch.utilities.isVoid(writtenUploadbutton,true)) {
        $.aceOverWatch.toast.show('error', 'Nothing has been written!');
    }
    else {
        $.aceOverWatch.toast.show('success','Uploadbutton value: <br>' + writtenUploadbutton);
    }
}

function onFileUploadedSucessfully(target, imageUrl, otherData){
	$.aceOverWatch.toast.show('success','The file was uploaded succcessfuly: '+imageUrl);
}