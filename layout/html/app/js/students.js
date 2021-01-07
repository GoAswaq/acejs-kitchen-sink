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
		this.updateButtonsVisibility(false);
	},
	
	updateButtonsVisibility : function(displayAsForm){
		if( displayAsForm ){
			this.formButtons.removeClass('ace-hide');
			this.gridButtons.addClass('ace-hide');
		}else{
			this.formButtons.addClass('ace-hide');
			this.gridButtons.removeClass('ace-hide');
		}
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
				editonselect:true,
				
				allowdelete:false,
				allowadd:false,
				allowrefresh:false,
				
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
	                    studentsObj.updateButtonsVisibility(true);
	                },
	                customhide:function(form, containerId){
	                	$(form).removeClass('ace-show');
	                	studentsObj.updateButtonsVisibility(false);
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