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

	ex3 : {

		studentIds : 0,
		studentRecords : {},

		getForm : function(){
			if( !this.form ){
				this.form = $('#ace-multicheck-form-ex-3').ace('create',{
					type		: 'form',
					ftype		: 'popup',

					displayinfullscreenonmobile: true,

					template 	: 'ace-multicheck-form-ex-3-template',
					renderto	: 'ace-multicheck-form-ex-3',

					autoloadfieldsonshow : false,

					displaysavebtn : false,
					displaycancelbtn : false,

					validate : true,

					idfield : 'student_id',

					checkdirtyoncancel : false,

					oninit : function(form){
						multicheckObj.ex3.oninit($(form));
					},

					onafterloadrecord : function(form, record){
						multicheckObj.ex3.onAfterLoadRecord(record);
					},

					onlocalsavesuccessfull : function(form, record){
						multicheckObj.ex3.savesuccessfull(record);
					},

				});

				this.exampleControls = $('#example-controls-ex3');

			}
			return this.form;
		},

		oninit : function(f){
			this.studentsSelectedField = f.find('[fieldname="selected_students"]');
		},

		onAfterLoadRecord : function(){
			if( this.typeOfMulticheckInit == 'singleselectionplus' ) {
				this.studentsSelectedField.ace('value', 2, {explicitdisplayname: 'Freddy Mercury'});
			}
		},

		savesuccessfull : function(record){
			$.aceOverWatch.toast.show(
				'success',
				'The student data has been saved! '+record.val('selected_students'),
			);
			this.form.ace('hide');
		},

		typeOfMulticheckInit : 'noselection',
		displayForm : function(){
			let record = $.aceOverWatch.record.create({});

			switch( this.typeOfMulticheckInit ){

				case 'singleselection':
					//just a single value
					record.val('selected_students',2);
					break;

				case 'object':
					//an object, where each property name is the value, and the property value is the display name
					record.val('selected_students',{8:'Elton John',2:'Freddy Mercury'});
					break;

				case 'json':
					//json format of an object, where each property name is the value, and the property value is the display name
					record.val('selected_students',JSON.stringify({1:'Bob Marley',2:'Freddy Mercury'}));
					break;

				case 'noselection':
				case 'singleselectionplus'://the data will be set on after record loaded manually
				default:
					record.val('selected_students','');//no selection; works if an emtpy object is passed as well
					break;

			}

			this.getForm().ace('value',record);
			this.getForm().ace('show');
		},

		displayForonMulticheckTypeSelectionChange : function(value){
			this.typeOfMulticheckInit = value;
			this.displayForm();
		},

	},
	
};

function displayMulticheckFormEx3(){{
}
}

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

function displayMulticheckFormEx3(){
	multicheckObj.ex3.displayForm();
}

function onMulticheckTypeSelectionChangeEx3(target,value){
	multicheckObj.ex3.displayForonMulticheckTypeSelectionChange(value);
}

multicheckObj.init();