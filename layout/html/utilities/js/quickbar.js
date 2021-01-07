var quickbarObj = {
		
	init : function(){
		this.ex1QuickBar = $('#ex-1-quickbar');
		this.createGrid1();
	},
	
	createGrid1 : function(){
		this.targetEx1 = $('#qb-ex1-grid').ace('create',{
			
			type : 'grid',
			idfield : 'student_id',
			selectiontype : 'row',
			
			width:'100%',
			
			allowedit:false,
			allowdelete:false,
			allowadd:false,
			allowrefresh:false,
			
			columns : [
				  {
					  title : 'Student',
					  fieldname : 'student_name',
					  align : 'left',
					  aditionalclasses : 'ace-col-6'
				  },
				  {
					  title : 'Birthday',
					  fieldname : 'student_birthday',
					  align : 'center',
					  aditionalclasses : 'ace-col-6'
				  },
            ],
			
			net : {
				fid:'loadstudentsfilter',
				autoload:true,
				remote:true,
				size:9,
			}
			
		});
	},
}

function toggleQuickbarVisibility(button){
	let quickBar = button.parents('.example-container').first().find('.ks-target');
	
	if( quickBar.hasClass('ace-show') ){
		quickBar.removeClass('ace-show');
	}else{
		quickBar.addClass('ace-show');
	}
}

quickbarObj.init();