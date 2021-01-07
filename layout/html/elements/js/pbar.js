function moveProgressBar(button) {
	button.parents('.example-container').first().find('[type="progressbar"]').each(function(){$(this).ace('value',button.attr('value'));});
}

function toogleProgressBarText(target, value){
	target.parents('.example-container').first().find('[type="progressbar"]').ace('modify',{
		withtext : value == 1 ? true : false
	});
}

function onPBProgress(progressBar, value){
	let type = 'warning';
	if( value == 0 ){
		type = 'error';
	}else{
		if( value == 100 ){
			type = 'success';
		}
	}
	$.aceOverWatch.toast.show(type,'Progress reached: '+value);
}