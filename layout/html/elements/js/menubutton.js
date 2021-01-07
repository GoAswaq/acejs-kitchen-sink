var menubuttonObj = {
	visibility : true,
}

function onMenubuttonSelection(index, tag, value){
	$.aceOverWatch.toast.show('success', 'You have selected: TAG: '+tag+', VALUE: '+value+', POSITION: '+index);
}