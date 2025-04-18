var multicheckObj = {
	wasItInit : false,
	valuesAddedToMulticheck3 : {},
	
	init : function(){
		if( this.wasItInit ){
			return;
		}
		this.wasItInit = false;
		
		this.ex3ComboEl = $('#multicheck-example-3');
		this.ex3TextEl = $('#text-example-3');
		this.ex3CheckEl = $('#checkbox-example-3');
		this.ex4ComboEl = $('#multicheck-example-4');
		this.ex5ComboEl = $('#multicheck-example-5');
	},
	
	addValueToMulticheck3 : function(value){
		value = value.trim();
		if( value.length == 0 ){
			return;
		}
		if( this.valuesAddedToMulticheck3[value] ){
			$.aceOverWatch.toast.show('error', 'Aceasta valoarea  fost deja adaugata');
			return;
		}
		this.valuesAddedToMulticheck3[value] = true;
		this.ex3TextEl.ace('value','');
		
		$.aceOverWatch.field.multicheck.setData(
				this.ex3ComboEl,//which multicheck
		        [
		            {
		                'name': value,
		                'id': value
		            }
		        ],
		        null,//unknown how many more
		        true,//add to existing
        );
		
		$.aceOverWatch.toast.show('success', 'A new value was added to the multicheck: '+value);
		
		if( this.ex3CheckEl.ace('value') == 1 ){
			this.ex3ComboEl.ace('value',value);
		}
	},
	
	importFrommulticheck3toMulticheck4 : function(){
		
		$.aceOverWatch.field.multicheck.setData(this.ex4ComboEl,
	            $.aceOverWatch.field.multicheck.getData(this.ex3ComboEl));
        $.aceOverWatch.field.multicheck.setData(this.ex3ComboEl, []);
        
        this.valuesAddedToMulticheck3 = {};
	},
	
	loadMulticheckFromServer : function(){
		this.ex5ComboEl.ace('load');
	},
	
};

function toggleLabelPlacementMulticheck(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="multicheck"]');
	
	let newPlecement = textElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    textElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyMulticheck(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="multicheck"]');
	textElement.data($.aceOverWatch.settings.aceSettings).readonly
	
	let willBeReadonly = textElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    textElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The multicheck element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueMulticheck(button) {
	$.aceOverWatch.toast.show('success','Selected value: ' + button.parents('.example-container').first().find('[type="multicheck"]').ace('value'));
}

function toogleSelectionColumnsNumberMulticheck(button){
	let targetMultiCheck = button.parents('.example-container').first().find('[type="multicheck"]');
	let colNumber = parseInt(targetMultiCheck.data('colNumber'));
	if( isNaN(colNumber) || colNumber < 1 ){ colNumber = 0; }
	colNumber++;
	if( colNumber > 3 ){ colNumber = 1; }
	let targetClass = '';
	switch( colNumber ){
		case 1: targetClass = 'ace-col-12'; break;
		case 2: targetClass = 'ace-col-6'; break;
		case 3: targetClass = 'ace-col-4'; break;
	}
	targetMultiCheck.ace('modify',{customtoptionsselectionclasses:targetClass});
	$.aceOverWatch.toast.show('success','Selectio box column number changed to: ' + colNumber);
	targetMultiCheck.data('colNumber',colNumber);
}

function getRecordMulticheck(button) {
	let record = $.aceOverWatch.field.multicheck.getRecord(button.parents('.example-container').first().find('[type="multicheck"]'));
	if( !record ){
		$.aceOverWatch.toast.show('success','The multicheck has nothing currently selected');
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

function onChangeMulticheck(target, value, record){
	$.aceOverWatch.toast.show('success', 'Value selected: '+value);
}

function onEnterDynamicComboText(target, val){
	multicheckObj.addValueToMulticheck3(val);
}

function importDataFromEx3(){
	multicheckObj.importFrommulticheck3toMulticheck4();
}

function loadMulticheckFromServer(){
	multicheckObj.loadMulticheckFromServer();
}

multicheckObj.init();