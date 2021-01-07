var comboboxObj = {
	wasItInit : false,
	valuesAddedToCombobox3 : {},
	
	init : function(){
		if( this.wasItInit ){
			return;
		}
		this.wasItInit = false;
		
		this.ex3ComboEl = $('#combobox-example-3');
		this.ex3TextEl = $('#text-example-3');
		this.ex3CheckEl = $('#checkbox-example-3');
		this.ex4ComboEl = $('#combobox-example-4');
		this.ex5ComboEl = $('#combobox-example-5');
	},
	
	addValueToCombobox3 : function(value){
		value = value.trim();
		if( value.length == 0 ){
			return;
		}
		if( this.valuesAddedToCombobox3[value] ){
			$.aceOverWatch.toast.show('error', 'Aceasta valoarea  fost deja adaugata');
			return;
		}
		this.valuesAddedToCombobox3[value] = true;
		this.ex3TextEl.ace('value','');
		
		$.aceOverWatch.field.combobox.setData(
				this.ex3ComboEl,//which combobox
		        [
		            {
		                'name': value,
		                'id': value
		            }
		        ],
		        null,//unknown how many more
		        true,//add to existing
        );
		
		$.aceOverWatch.toast.show('success', 'A new value was added to the combobox: '+value);
		
		if( this.ex3CheckEl.ace('value') == 1 ){
			this.ex3ComboEl.ace('value',value);
		}
	},
	
	importFromcombobox3toCombobox4 : function(){
		
		$.aceOverWatch.field.combobox.setData(this.ex4ComboEl,
	            $.aceOverWatch.field.combobox.getData(this.ex3ComboEl));
        $.aceOverWatch.field.combobox.setData(this.ex3ComboEl, []);
        
        this.valuesAddedToCombobox3 = {};
	},
	
	loadComboboxFromServer : function(){
		this.ex5ComboEl.ace('load');
	},
	
};

function toggleLabelPlacementCombobox(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="combobox"]');
	
	let newPlecement = textElement.data($.aceOverWatch.settings.aceSettings).labelalign == 'top' ? 'left' : 'top';
    textElement.ace('modify',{
        labelalign : newPlecement
    });
    
    $.aceOverWatch.toast.show('success', 'The label is now alligned to:' + newPlecement);
}

function toggleReadonlyCombobox(button) {
	
	let textElement = button.parents('.example-container').first().find('[type="combobox"]');
	textElement.data($.aceOverWatch.settings.aceSettings).readonly
	
	let willBeReadonly = textElement.data($.aceOverWatch.settings.aceSettings).readonly ? false : true;
    textElement.ace('modify',{
        readonly : willBeReadonly
    });
    
    $.aceOverWatch.toast.show('success', 'The combobox element is now:' + (willBeReadonly ? 'READONLY' : 'NOT Readonly'));
}

function getValueCombobox(button) {
	$.aceOverWatch.toast.show('success','Selected value: ' + button.parents('.example-container').first().find('[type="combobox"]').ace('value'));
}

function getRecordCombobox(button) {
	let record = $.aceOverWatch.field.combobox.getRecord(button.parents('.example-container').first().find('[type="combobox"]'));
	if( !record ){
		$.aceOverWatch.toast.show('success','The combobox has nothing currently selected');
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

function onChangeCombobox(target, value, record){
	$.aceOverWatch.toast.show('success', 'Value selected: '+value);
}

function onEnterDynamicComboText(target, val){
	comboboxObj.addValueToCombobox3(val);
}

function importDataFromEx3(){
	comboboxObj.importFromcombobox3toCombobox4();
}

function loadComboboxFromServer(){
	comboboxObj.loadComboboxFromServer();
}

comboboxObj.init();