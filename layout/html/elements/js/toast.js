function displaySuccessToast(){
	$.aceOverWatch.toast.show(
        'success',
        'Hurray! We are the champions, my friend!',
    );
}

function displayWarningToast(){
	$.aceOverWatch.toast.show(
        'warning',
        'Watch out! Behind you!',
    );
}

function displayErrorToast(){
	$.aceOverWatch.toast.show(
        'error',
        "OH NO! You've done it now! RUN!",
    );
}

function displayHelpToast(){
	$.aceOverWatch.toast.show(
			'help',
			"Help! Help! Help!",
	);
}

function displayToastHistory(){
	var logs = [];
    for (let idx = 0; idx < $.aceOverWatch.toast.history.length && idx < 5; idx++) {
        logs.push((idx+1)+') '+$.aceOverWatch.toast.history[idx]['type']+' at '+$.aceOverWatch.toast.history[idx]['time']+': '+$.aceOverWatch.toast.history[idx]['message']);
    }
    $.aceOverWatch.prompt.show(
        '<b>The last 5 toast messages have been:</b><br>' + logs.join('<br>'),
        '',
        {type: 'alert'}
    );
}