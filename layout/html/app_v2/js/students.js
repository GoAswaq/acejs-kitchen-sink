var studentsObj = {
		
	wasItInit : false,
	
	init : function(){
		if( this.wasItInit ){
			return;
		}
		this.wasItInit = true;
		
		this.formButtons = $('.student-form-buttons');
		this.gridButtons= $('.student-grid-buttons');
	},
		
	onShow : function(){
		this.init();
		this.refresh();
	},
	
	getGrid : function(){
		if( !this.grid ){
			this.grid = $('#students-grid').ace('create',{
				
				type : 'grid',
				idfield : 'student_id',
				selectiontype : 'row',
				
				width:'100%',
				
				allowedit:true,
				showeditcolumn:'end',
				editcolumnname:'Edit Student',
				editcolumnwidthclass:'ace-col-2',
				//editonselect:true,
				
				allowdelete:false,
				allowadd:false,
				allowrefresh:false,

				presentationformtpl: 'students-grid-presentation-template',
				presentationreverse: false,
				presentationhideonmobile: true,
				
				columns : [
					  {
						  title : 'Student',
						  fieldname : 'student_name',
						  align : 'left',
						  aditionalclasses : 'ace-col-5'
					  },
					  {
						  title : 'Birthday',
						  fieldname : 'student_birthday',
						  align : 'center',
						  aditionalclasses : 'ace-col-5'
					  },
	            ],
	            
	            editform : {
	            	type : 'custom',
	            	
	            	template:'students-grid-template',
	        		renderto:'students-grid-form',

					displayinfullscreenonmobile:true,
					displayinfullscreencancel:true,
					displayinfullscreenwithparents:2,//to add also the title bar

					enablehashnavigation: true,

					relatedbuttongroup:'ace-students-button-group',
	        		
	        		autoloadfieldsonshow:false,//only load fields on demand
	        		
	        		displaysavebtn:false,
	        		displaycancelbtn:false,
	        		validate:true,			
	        		
	        		oninit: function(form) {
	        			studentsObj.onInit($(form));
	        		},
	        		onshow:function(form){
	        			        	
	        		},
	        		customshow:function(form, containerId){
	                    $(form).addClass('ace-show');
	                },
	                customhide:function(form, containerId){
	                	$(form).removeClass('ace-show');
	                },
	        		onbeforeloadrecord:function(form, record){		
	        		},
	        		onafterloadrecord:function(form, record){
	        	   },
	            },
				
				net : {
					fid:'loadstudentsfilter',
					autoload:false,
					remote:true,
					size:9,
				}
				
			});
		}
		return this.grid
	},
	
	onInit : function(f){
		this.editForm = f;
	},
	
	refresh : function(){
		
		this.getGrid().ace('value',{
			cleardata:true,
			page:1,
			net : {
				extraparams : {
					/*
					 *... add extra params as needed
					 */
				}
			}
		});
		$.aceOverWatch.field.grid.reloadPage( this.grid );
	},
	
	save : function(){
		this.editForm.ace('save');
	},
	
	cancel : function(){
		this.editForm.ace('cancel');
	},
		
};

function onDisplayContentForTagstudentsmenutag(tag,data) {
	studentsObj.onShow();
}

function saveStudent(){
	studentsObj.save();
}
function cancelStudent(){
	studentsObj.cancel();
}
function refreshStudents(){
	studentsObj.refresh();
}