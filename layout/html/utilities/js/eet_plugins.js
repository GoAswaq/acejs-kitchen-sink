var eetEdit = {
		
	init : function(){
		this.ex1.init();
	},

	dictionaries : {
		'sexDictionary': {
			0 : { code: eetRendererSex('M'), color: 'blue', name: 'Male',},
			10 : { code: eetRendererSex('F'), color: 'orange', name: 'Female',},
		},
		'aliveDictionary': {
			0 : { code: eetRendererYesNo(1), color: 'green', name: 'The person is alive',},
			10 : { code: eetRendererYesNo(0), color: 'red', name: 'The person is dead',},
		}
	},

	ex1 : {
		init : function() {
			this.container = $('#eet-plugins-ex1-container');

			this.eet = new ACEEasyTable({
				net : {
					remote: true,//if false, it will not be able to load data from server
					fid : 'loadpersons',
				},
				container : $('#eet_plugins_ex1_table'),//without specifying a container, the table will not know where to draw itself
				rebuildafterload : true,
				title : 'Persons',
				columns : this.getBasicColumns(),
				idfield : 'id',//mandatory for edit functionality
				showtotalsrow : true,
				sortafterload : true,//to always sort the data immidietely after a load operation
				sortingexclusive : true,//if true, only one column can be sorted at a time

				overlayplugins : {
					refresh : {},//no special configuration needed; will dislpay a reload button
					printpage: {
						orientation : 'landscape',//portrait or landscape

						custombeforeprint : function(tableObj){
							$('#kitchen-sink-container').addClass('ace-hide');
							let printingEl = $('<div id="ks-printing" class="ace-col-12"></div>').html(eetEdit.ex1.eet.container.clone());
							$('body').append(printingEl);
							return true;//if false is returned, no print will take place
						},
						customafterprint : function(tableObj){
							$('#ks-printing').remove();
							$('#kitchen-sink-container').removeClass('ace-hide');
						},

					},
					custombuttom : {
						buttons : [//array of buttons
							{
								title: 'Reset',
								iconcls: 'fa fa-undo',
								callback: function () {
									eetEdit.ex1.reload(true);
								}
							},
							{
								title: 'Toggle DDR',
								iconcls: 'far fa-arrows-alt-v',
								callback: function () {
									let overallPlugins = eetEdit.ex1.eet.overlayplugins;
									if( overallPlugins.doubledatarows ){
										delete overallPlugins.doubledatarows;
									}else{
										overallPlugins.doubledatarows = {};
									}
									eetEdit.ex1.eet.updateConfiguration({overlayplugins : overallPlugins});
								}
							},
							{
								title: 'Toggle Legendary',
								iconcls: 'far fa-map',
								callback: function () {
									let overallPlugins = eetEdit.ex1.eet.overlayplugins;
									if( overallPlugins.legendary ){
										delete overallPlugins.legendary;
									}else{
										overallPlugins.legendary = {
											getDictionary : function(){
												console.log('calling custom methods');
												return eetEdit.dictionaries;
											}
										};
									}
									eetEdit.ex1.eet.updateConfiguration({overlayplugins : overallPlugins});
								}
							}
						]
					},
					colcheck : {},//displays a checkbox for each row in part
					groupchange : {//works only if the checkbox is enabled
						columns : [
							'profession',
							'sex',
						],
					},
					customop : {
						custommethod : function(eet){
							if( !eetEdit.ex1.drawnTimes ){
								eetEdit.ex1.drawnTimes = 0;
							}
							eetEdit.ex1.drawnTimes++;
							eet.container.find('.ace-et-toolbar').append('<i clasas="ace-et-toolbar-el ">Times the table was drawn: '+eetEdit.ex1.drawnTimes+'! </i>');
						}
					},
					editgdate : {},
				},

				dataplugins : {
					indexcol : {
						firstRowIndex: 1, 	//the number of the first row
						fieldname: 'idx', 	//the name of the field to be created
						title: '#',			//the title of the column
						aditionalclasses: 'ace-thin-col-1',
					}
				},

				cellcustomplugins : {
					rowclick : {
						customMethodName : function(cellDescriptor){
							$.aceOverWatch.toast.show('success','You have clicked on row <b>'+cellDescriptor.rowIdx+'</b> and column <b>'+cellDescriptor.tableObj.columns[cellDescriptor.colIdx].title+'</b>, with the value: <b>'+cellDescriptor.tableObj.data[cellDescriptor.rowIdx][cellDescriptor.tableObj.columns[cellDescriptor.colIdx].fieldname]+'</b>');
						}

					}
				}

			});
			this.eet.load();

			this.groupingOrderElement = this.container.find('#grouping-order-element-ex1-eet');
			this.groupingOrderElementExpl = this.container.find('#order-of-grouping-expl');
		},

		getBasicColumns : function(){
			return [
				{
					'fieldname'     : 'id',
					'aditionalclasses'  : 'ace-thin-col-1',
					'readonly' : true,
					'title' : 'Id',
					'textalign' : 'right',
					'allowsorting' : true,
				},
				{
					'fieldname'     : 'name',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : false,
					'title' : 'Name',
					'editplugin' : 'text',
					'textalign' : 'left',

					'allowsorting' : true,
					'sortingorder' : 'descending',
				},
				{
					'fieldname'     : 'profession',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : false,
					'title' : 'Profession',

					'editplugin'    : 'comboboxstatic',
					'editpluginconfig'    : {
							'store' : {
								// ID : DISPALY VALUE
								//in this example, the id is identical with the display value
								//but this usually is not the case; in most real life examples the id is a numerical value
								'Programmer' : 'Programmer',
								'Cook' : 'Cook',
								'Fire Fighter' : 'Fire Fighter',
								'Photograph' : 'Photograph',
								'Diplomat' : 'Diplomat',
								'Scientist' : 'Scientist',
							}
					},

					'textalign' : 'center',

					'allowsorting' : true,
					'sortingorder' : 'descending',
				},
				{
					'fieldname'     : 'marital_status',
					'aditionalclasses'  : 'ace-col-1',
					'readonly' : false,
					'title' : 'Marital Status',
					'editplugin'    : 'comboboxstatic',
					'editpluginconfig'    : {
						'store' : {
							// ID : DISPALY VALUE
							//in this example, the id is identical with the display value
							//but this usually is not the case; in most real life examples the id is a numerical value
							'Married' : 'Married',
							'Single' : 'Single',
							'Divorced' : 'Divorced',
							'Widower' : 'Widower',
						}
					},
					'textalign' : 'right',

					'allowsorting' : true,
					'sortingorder' : 'descending',
				},
				{
					'fieldname'     : 'email',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : false,
					'title' : 'e-Mail',
					'editplugin'    : 'text',
					'textalign' : 'right',
				},
				{
					'fieldname'     : 'sex',
					'aditionalclasses'  : 'ace-col-1',
					'readonly' : false,
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
					'editplugin'    : 'comboboxstatic',
					'editpluginconfig'    : {
						'store' : {
							// ID : DISPALY VALUE
							//in this example, the id is identical with the display value
							//but this usually is not the case; in most real life examples the id is a numerical value
							'Female' : 'Female',
							'Male' : 'Male',
						}
					},
					legendarydictionary : 'sexDictionary',//fpr the legendary plugin
					'textalign' : 'center',
				},
				{
					'fieldname'     : 'alive',
					'aditionalclasses'  : 'ace-thin-col-1',
					'readonly' : false,
					'title' : 'Alive',
					'renderer' : eetRendererYesNo,
					'editplugin' : 'checkbox',
					legendarydictionary : 'aliveDictionary',
					'textalign' : 'right',

					'allowsorting' : true,
					'sortingorder' : 'descending',
				},
				{
					'fieldname'     : 'resident',
					'aditionalclasses'  : 'ace-thin-col-1',
					'readonly' : false,
					'title' : 'Resident',
					'renderer' : eetRendererYesNo,
					'editplugin' : 'toggleclick',
					'textalign' : 'right',
				},
				{
					'fieldname'     : 'description',
					'aditionalclasses'  : 'ace-col-2',
					'readonly' : false,
					'title' : 'Description',
					'editplugin' : 'textarea',
					'textalign' : 'justify',
				},

			];
		},

		reload : function(resetData = false){
			this.eet.load({reset:resetData});
		}
	},

}

function reloadEETEditEx1(){
	eetEdit.ex1.reload();
}
function resetEETEditEx1(){
	eetEdit.ex1.reload(true);
}

/**
 * the method is called by the legends plugin of the EET to help draw the legend
 */
function getEasyEditTableDictionary(){
	console.log('calling default methods');
	return eetEdit.dictionaries;
}


eetEdit.init();