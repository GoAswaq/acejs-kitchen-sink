var radiogroupObj = {
	wasItInit : false,
	valuesAddedToRadiogroup3 : {},
	
	init : function(){
		if( this.wasItInit ){
			return;
		}
		this.wasItInit = false;
		
		this.ex3RadigroupEl = $('#radiogroup-example-3');
	},
	
	loadRadiogroupFromServer : function(){
		this.ex3RadigroupEl.ace('load');
	},
	
};

function toggleReadonlyRadiogroup(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="radiogroup"]');
	textElement.data($.aceOverWatch.settings.aceSettings).readonly
	
	let willBeReadonly = textElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    textElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The radiogroup element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueRadiogroup(button) {
	$.aceOverWatch.toast.show('success','Selected value: ' + button.parents('.example-container').first().find('[type="radiogroup"]').ace('value'));
}

function getRecordRadiogroup(button) {
	let record = $.aceOverWatch.field.radiogroup.getRecord(button.parents('.example-container').first().find('[type="radiogroup"]'));
	if( !record ){
		$.aceOverWatch.toast.show('success','The radiogroup has nothing currently selected');
		return;
	}
	let recordData = record.convert();
	let fieldsInfo = []
	for(let field in recordData){
		fieldsInfo.push(field + ': '+recordData[field]);
	}
	
	$.aceOverWatch.prompt.show(
			'<b>Current selected record fields</b>:<br>'+ fieldsInfo.join('<br>'),
	        '',{type:'alert'});
}

function onChangeRadiogroup(target, value, record){
	$.aceOverWatch.toast.show('success', 'Value selected: '+value);
}

function loadRadiogroupFromServer(){
	radiogroupObj.loadRadiogroupFromServer();
}

radiogroupObj.init();