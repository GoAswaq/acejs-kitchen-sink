var iformObj = {
		
	init : function(){
		this.ex1Target = $('#ex-1-iform');
		this.createGrid1();
	},
	
	createGrid1 : function(){
		this.targetEx1 = $('#if-ex1-grid').ace('create',{
			
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
	
	lastDirection : 'placeholder',
	updateDirection : function(newDirection){
		this.ex1Target.removeClass(this.lastDirection).addClass(newDirection);
		this.lastDirection = newDirection;
	}
}

function toggleIFVisibility(button){
	let target = button.parents('.example-container').first().find('.ks-target');
	
	if( target.hasClass('ace-show') ){
		target.removeClass('ace-show');
	}else{
		target.addClass('ace-show');
	}
}

function onChangeDirectionIF(target,value){
	iformObj.updateDirection(value);
}

iformObj.init();