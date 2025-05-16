var gridcrObj = {
		
	lastEx1GridHeightClass : 'ace-grid-height-minus-250',

	lastEx2ColClass	: '',
	
	init : function(){
		this.createGrid1();
	},
		
	createGrid1 : function(){
		this.targetEx1 = $('#gridmod-ex1-cr-grid').ace('create',{
			
			type : 'grid',
			//gtype : 'table',
			idfield : 'student_id',
			selectiontype : 'row',
			
			width:'100%',

			allowedit:true,
			showeditcolumn:'end',
			editcolumnname:'Edit Student',
			editcolumnwidthclass:'ace-col-2',
			editonselect:true,

			allowdelete:false,
			allowadd:false,
			allowrefresh:true,
			
			columns : [
				  {
					   title : 'Id',
					   fieldname : 'student_id',
					   align : 'left',
					   aditionalclasses : 'ace-col-1',
				  },
				  {
					  title : 'Student',
					  fieldname : 'student_name',
					  align : 'left',
					  aditionalclasses : 'ace-col-4',
				  },
				  {
					  title : 'Birthday',
					  fieldname : 'student_birthday',
					  align : 'center',
					  aditionalclasses : 'ace-col-2',
				  },
				  {
					  title : 'Sex',
					  fieldname : 'student_sex',
					  align : 'center',
					  aditionalclasses : 'ace-col-1',
				  },
				  {
					  title : 'Country',
					  fieldname : 'student_country',
					  align : 'right',
					  aditionalclasses : 'ace-col-2',
				  },
            ],

			editform : {
				type : 'popup',

				template:'students-grid-template-cr',

				autoloadfieldsonshow:false,//only load fields on demand

				displaysavebtn:false,
				displaycancelbtn:true,
				validate:true,

				oninit: function(form) {
					gridcrObj.onInit($(form));
				},
				onshow:function(form){

				},
				onbeforeloadrecord:function(form, record){
				},
				onafterloadrecord:function(form, record){
				},
			},
			
			net : {
				fid:'loadstudentsfilter',
				autoload:true,
				remote:true,
				size:9,
			},

			commandrowfastnew : true,
			commandrowfastnewtitle : 'Create a new student',
			commandrowfastnewfieldname : 'student_name',
			commandrowfastnewgetvalue : function(target){
				return 'New Student';
			},

			commandrowfastnewedit : true,
			commandrowfastneweditcreatefirst: true,//if true, the entity will be created, and only if it could be created the editing window will appear
			commandrowfastnewedittitle : 'Create and edit a new student', //the text displayed in the commandrow
			commandrowfastneweditfieldname : 'student_name',//the fieldname in which the information to send will be sent
			commandrowfastneweditgetvalue : function(){//method which must return a value; this value will be sent to the server
				return 'New Student';
			},
			
		});
	},

	onInit : function(f){
		this.editForm = f;
	},
}

gridcrObj.init();
