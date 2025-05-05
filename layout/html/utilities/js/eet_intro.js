var eetIntro = {
		
	init : function(){
		this.ex1.init();
		this.ex2.init();
	},

	ex1 : {
		init : function() {

			this.getForm().ace('value',$.aceOverWatch.record.create({
				'_f_sex' : '0',
				'_f_alive' : '-1',
			}));

			this.container = $('#eet-intro-ex1-container');

			this.eet = new ACEEasyTable({
				net : {
					remote: true,//if false, it will not be able to load data from server
					fid : 'loadpersons',
				},
				container : $('#eet_into_ex1_table'),//without specifying a container, the table will not know where to draw itself
				rebuildafterload : true,
				title : 'Persons',
				columns : this.getBasicColumns(),
				filterform : this.getForm(),
			});
			this.eet.load();

			this.groupingOrderElement = this.container.find('#grouping-order-element-ex1-eet');
			this.groupingOrderElementExpl = this.container.find('#order-of-grouping-expl');
		},

		toggleFilterForm : function(){
			this.getForm().toggleClass('ace-hide');
		},

		getForm : function(){
			if( !this.form ){
				this.form = $('#eet-filter-form-ex1').ace('create',{
					type		: 'form',
					ftype		: 'custom',

					displayinfullscreenonmobile: true,

					template 	: 'eet-filter-form-ex1-tpl',
					renderto	: 'eet-filter-form-ex1',

					autoloadfieldsonshow : false,

					displaysavebtn : false,
					displaycancelbtn : false,

					validate : false,

					onlocalsavesuccessfull : function(form, record){
						eetIntro.ex1.eet.load();
					},

					customshow : function(form, renderto){

					},
					customhide : function(form, renderto){
					},
				});

				this.exampleControls = $('#example-controls-ex3');

			}
			return this.form;
		},

		getBasicColumns : function(){
			return [
				{
					'fieldname'     : 'id',
					'aditionalclasses'  : 'ace-col-1',
					'readonly' : true,
					'title' : 'Id',
				},
				{
					'fieldname'     : 'name',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : true,
					'title' : 'Name',
				},
				{
					'fieldname'     : 'profession',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : true,
					'title' : 'Profession',
				},
				{
					'fieldname'     : 'marital_status',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : true,
					'title' : 'Marital Status',
				},
				{
					'fieldname'     : 'email',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : true,
					'title' : 'e-Mail',
				},
				{
					'fieldname'     : 'sex',
					'aditionalclasses'  : 'ace-col-1',
					'readonly' : true,
					'title' : 'Sex',
					'renderer' : eetRendererSex,
					//the totals will be displayed only if the EET is settup to show the totals through the showtotalsrow option
					'totalstype' : function(data,columnName){
						let males = 0;
						let females = 0;
						for(let i=0;i<data.length;i++){
							if( data[i][columnName] == 'Male' ){
								males++;
							}else{
								females++;
							}
						}
						return 'There are <b>'+males+'</b> men and <b>'+females+'</b> women';
					},
				},
				{
					'fieldname'     : 'alive',
					'aditionalclasses'  : 'ace-col-1',
					'readonly' : true,
					'title' : 'Alive',
					'renderer' : eetRendererYesNo,
				},
				{
					'fieldname'     : 'biscuits',
					'aditionalclasses'  : 'ace-col-1',
					'readonly' : true,
					'title' : 'Biscuits',
					//the totals will be displayed only if the EET is settup to show the totals through the showtotalsrow option
					'totalstype' : 'sum'
				},

			];
		},

		withVirtualFields : false,
		updateVirtualFields : function(value){
			this.eet.updateConfiguration({
					'virtualfields' : value == 1
					? [
							{
								fieldname : 'biscuits',
								virtualfieldsparser : parserVirtualFieldBiscuits
							}
					]
					: [],
					columns : Array.prototype.concat(
						this.getBasicColumns(),
						value == 1
						? [
							{
								'fieldname'     : 'biscuits1',
								'aditionalclasses'  : 'ace-col-1',
								'readonly' : true,
								'title' : 'Biscuits Even/Odd',
							},
							{
								'fieldname'     : 'biscuits2',
								'aditionalclasses'  : 'ace-col-1',
								'readonly' : true,
								'title' : '50?',
							}
						] : []
					)

				});
		},
		updateTotals : function(value){
			this.eet.updateConfiguration({'showtotalsrow' : value == 1});
		},
		displaySubgrouptotals : false,
		updateSubgroupTotals : function(value){
			this.displaySubgrouptotals = value == 1;
		},
		updateSubgroups : function(target,value){
			let s = target.data($.aceOverWatch.settings.aceSettings);
			if( value  == 0 ) {
				$.aceOverWatch.field.chips.removeChipByValue(this.groupingOrderElement, s.fieldname);
			}else{
				let chipName = s.fieldname;
				$.aceOverWatch.field.chips.addChip(this.groupingOrderElement, chipName, s.fieldname);
			}
			this.applySubgroupsToTable();
		},
		groupRemovedFromChips : function(groupingRemoved){
			this.container.find('.group-field[fieldname="'+groupingRemoved+'"]').ace('value',0);
			this.applySubgroupsToTable();
		},
		applySubgroupsToTable : function(){
			let groupingSelction = this.groupingOrderElement.ace('value');
			if( groupingSelction.length == 0){
				this.groupingOrderElementExpl.addClass('ace-hide');
			}else{
				this.groupingOrderElementExpl.removeClass('ace-hide');
			}
			let subgroupsConfig = [];
			let groupingSelectionArr = groupingSelction.split(',')
			for(let groupFieldId in groupingSelectionArr){
				let groupField = groupingSelectionArr[groupFieldId];
				if( groupField == ''){ continue; }
				let groupingConfig = {
					'fieldname' : groupField,		//the data fieldname to group by
					'ascending' : groupField == 'profession' ? false : true,//the order of the grouping
				};
				switch( groupField ){
					case 'alive':
						groupingConfig['renderer'] = groupRendererAlive;
						break;
					case 'sex':
						groupingConfig['renderer'] = groupRendererSex;
						groupingConfig['with_subtotals'] = this.displaySubgrouptotals;
						groupingConfig['subtotals_columns'] = {
							'biscuits' : {
								'totalstype': 'sum',
								'renderer': 'groupRendererTotalsRed'
							}
						};

						break;
				}
				subgroupsConfig.push(groupingConfig);
			}
			this.eet.updateConfiguration({
				'subgroups' : subgroupsConfig,
				'sortBySubgroupsOnce' : true,
			});
		}
	},

	ex2 : {
		init : function() {
			this.container = $('#eet-intro-ex2-container');

			this.eet = new ACEEasyTable({
				net : {
					remote: true,//if false, it will not be able to load data from server
					fid : 'eet_custom_config_test',
				},
				container : $('#eet_into_ex2_table'),//without specifying a container, the table will not know where to draw itself
				rebuildafterload : true,
			});

			this.loadData(this.container.find('#eet-ex2-dt-selector').ace('value'));
		},
		loadData : function(dataType){
			this.eet.load({dt: dataType});
		},
	},
		
}


function groupRendererTotalsRed(table, fieldName, subgroupId, initialValue){
	return '<span class="ace-red">'+initialValue+'</span>';
}

function updateSubgroupsEx1(target,value){
	eetIntro.ex1.updateSubgroups(target,value);
}
function onEETIntroEx1GrupOrderRemoval(target,idx,record){
	eetIntro.ex1.groupRemovedFromChips(record.val('value'));
}

function updateTotalsEx1(target,value){
	eetIntro.ex1.updateTotals(value);
}
function updateVirtualFieldsEx1(target,value){
	eetIntro.ex1.updateVirtualFields(value);
}

function updateSubgroupTotalsEx1(target,value){
	eetIntro.ex1.updateSubgroupTotals(value);
}

function changeDataTypeEx2(target,value){
	eetIntro.ex2.loadData(value);
}

/**
 * The method will create two virtual fields based on the column biscuits returned for the persons datastore
 * the first column will display if the number is even or unever
 * the second column will display if the value is greater or less than 50
 * @param data
 */
function parserVirtualFieldBiscuits(data){
	let fn = 'biscuits';
	let value = parseInt(data[fn]);
	if( isNaN(value) ){value = 0; }

	if( value % 2 == 0 ){ data[fn+'1'] = 'Even'; }
	else{ data[fn+'1'] = 'UnEven'; }

	if( value > 50 ){ data[fn+'2'] = '> 50 '; }
	else if( value < 50 ){ data[fn+'2'] = '< 50 '; }
	else{ data[fn+'2'] = ' = 50 '; }

	return 2;//returns the number of virtual fields created
}

function toggleFilterForm(){
	eetIntro.ex1.toggleFilterForm();
}

eetIntro.init();