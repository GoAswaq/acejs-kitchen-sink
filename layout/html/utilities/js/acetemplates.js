var aceTemplates = {
		
	init : function(){
		this.ex1.init();
	},

	ex1 : {
		init: function () {
			this.inputCSS = $('#ex1-input-css');
			this.inputHTML = $('#ex1-input-html');
			this.inputJS = $('#ex1-input-js');
			this.outputIF = $('#ex1-output-if');
			this.setInitCodeData();
			this.getGrid();
		},

		getGrid : function(){
			if( !this.grid ){
				this.grid = $('#at-ex1-grid').ace('create',{

					type : 'grid',
					idfield : 'id',
					selectiontype : 'row',

					width:'100%',

					allowrefresh:false,
					allowadd:false,
					allowedit:false,
					allowdelete:false,

					selectfirstresult : true,

					columns : [
						{
							'fieldname'     : 'id',
							'aditionalclasses'  : 'ace-col-1',
							'title' : 'Id',
						},
						{
							'fieldname'     : 'name',
							'aditionalclasses'  : 'ace-col-2',
							'title' : 'Name',
						},
						{
							'fieldname'     : 'profession',
							'aditionalclasses'  : 'ace-col-2',
							'title' : 'Profession',
						},
						{
							'fieldname'     : 'marital_status',
							'aditionalclasses'  : 'ace-col-2',
							'title' : 'Marital Status',
						},
						{
							'fieldname'     : 'email',
							'aditionalclasses'  : 'ace-col-2',
							'title' : 'e-Mail',
						},
						{
							'fieldname'     : 'sex',
							'aditionalclasses'  : 'ace-col-1',
							'title' : 'Sex',
							'renderer' : eetRendererSex,
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
							'title' : 'Biscuits',
						},
					],

					net : {
						fid:'loadpersons',
						autoload:true,
						remote:true,
						size:10000,
					},

					onselectionchange : function(target,row,column,data){
						aceTemplates.ex1.onGridSelectionChange(data);
					},

					onpreloadsuccessful : function(grid,dataArr, totalExpectedData){
						//for the purpose of this example, we'll set the e-mail address to an empty string for every two records
						for(let id = 0; id < dataArr.length; id++){
							if( id%2 == 0 ){
								dataArr[id].email = '';
							}
						}
					}

				});
			}
			return this.grid;
		},

		defaultCodeData : {
			css : 'body { background-color: #f0f0f0; }\n'+
				  '.at-red-border { border: 1px solid blue; }\n'+
				  '.at-even { color: green; }\n'+
				  '.at-uneven { color: red; }\n'+
				  '.ace-hide { display: none; }\n'+
				  '.email-ok { border:1 px solid green; color: darkgreen; }\n'+
				  '.email-not-ok { border:1 px solid red; color: darkred; }\n'
				,
			html :
				'<div>Name: <span><atvreuse atv_fld="name"></atvreuse></span></div><br>\n'+
				'<div>Profession: <span><atvreuse atv_fld="profession" atv_renderer="testUppercaseRenderer"></atvreuse></div></span><br>\n'+
				'<div>Sex: <span><atv atv_renderer="eetRendererSex">sex</atv></spanatv_renderer></div><br>\n'+
				'<div class="ace-pt" atv_attrs="class,style" atv_attrs_values="getATDescriptionClass,getATDescriptionStyle">\n'+
						'<atv>description</atv>\n'+
				'</div><br>'+
				'<div class="ace-pt" ace_pt_hide_fn_false="atAreBiscuitsEven">\n'+
					'<span>This text is displayed only if the number of BISCUITS of the Person are </span><span class="at-even">EVEN!</span>\n'+
				'</div><br>'+
				'<div class="ace-pt" ace_pt_hide_fn_true="atAreBiscuitsEven">\n'+
					'<span>This text is displayed only if the number of BISCUITS of the Person are </span><span class="at-uneven">UNEVEN!</span>\n'+
				'</div><br>'+
				'<div class="ace-pt" atv_attrs="class" atv_attrs_values="getATEmailClass">\n'+
					'<span class="ace-pt" ace_pt_hide_not_void="email">Oh no! this person does not have an email! <i>this section is displayed only if the email field of the person is void</i></span>\n'+
				    '<span class="ace-pt" ace_pt_hide_void="email">Email: <atv>email</atv> <i>this section is displayed only if the email field of the person is NOT void</i></span>\n'+
				'</div><br>',
			js : 'function testUppercaseRenderer(value){\n' +
				'  return String(value).toUpperCase();\n' +
				'}\n' +

				'function getATDescriptionClass(target,rec){\n' +
				'  return "at-red-border";\n' +
				'}\n' +

				'function getATDescriptionStyle(target,rec){\n' +
				'  return "font-style:italic;padding-top:10px";\n' +
				'}\n' +

				'function atAreBiscuitsEven(target,rec){\n' +
				'  return rec.val("biscuits")%2==0;\n' +
				'}\n' +

				'function getATEmailClass(target,rec){\n' +
				'  return $.aceOverWatch.utilities.isVoid(rec.val("email"),true) ? "email-not-ok" : "email-ok";\n' +
				'}\n' +

				''

		},
		resetDefaults : function(){
			this.setInitCodeData();
			this.evaluateCode();
			$.aceOverWatch.toast.show('success', 'Then template defaults have been restored!');
		},

		setInitCodeData : function(){
			this.inputCSS.ace('value',this.defaultCodeData.css);
			this.inputHTML.ace('value',this.defaultCodeData.html);
			this.inputJS.ace('value',this.defaultCodeData.js);
		},

		currentSelectedDataRecord : false,
		onGridSelectionChange : function(record){
			this.currentSelectedDataRecord = record;
			this.evaluateCode();
		},


		evaluateCode : function(){
			if( !this.currentSelectedDataRecord ){ return; }//nothing to do, no grid data selectd

			let cssValue = this.inputCSS.ace('value');
			let htmlValue = this.inputHTML.ace('value');
			let jsValue = this.inputJS.ace('value');

			try {
				eval(jsValue);
				$('#test-code').remove();
				$('head').append('<script id="test-code">' + jsValue + '</script>');
			} catch (e) {
				$.aceOverWatch.toast.show('warning', 'Something is not right with the JS code!');
			}

			let pseudoEl  = $('<div>'+htmlValue+'</div>');
			$.aceOverWatch.utilities.parseAsAceTemplate(
				pseudoEl,
				this.currentSelectedDataRecord,
				true
			);
			this.outputIF.contents().find('body').html(
				'<link href="./layout/css/fontawesome-pro-5.10.0-11-web/css/all.min.css" type="text/css" rel="stylesheet" >'+
				'<style>'+cssValue+'</style>'+
				pseudoEl.html()
			);
		}
	}

}

function resetATDefaultsEX1(){
	aceTemplates.ex1.resetDefaults();
}

function evaluateCodeATEx1(){
	aceTemplates.ex1.evaluateCode();
}

aceTemplates.init();