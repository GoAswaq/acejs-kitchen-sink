var gridmodObj = {
		
	lastEx1MaxHeightClass : '',
	lastEx1GridHeightClass : 'ace-grid-height-minus-250',
	lastEx1BodyHeightClass : '',
	
	lastEx2ColClass	: '',
	
	hasThinRowClass : false,
	
	init : function(){
		this.createGrid1();
		this.createGrid2();
	},
		
	createGrid1 : function(){
		this.targetEx1 = $('#gridmod-ex1-grid').ace('create',{
			
			type : 'grid',
			//gtype : 'table',
			idfield : 'student_id',
			selectiontype : 'row',
			
			width:'100%',
			
			allowedit:false,
			allowdelete:false,
			
			showtotalsrow : true,
			
			columns : [
				  {
					   title : 'Id',
					   fieldname : 'student_id',
					   align : 'left',
					   aditionalclasses : 'ace-col-1',
					   totalsoprenderer : 'mul',
				  },
				  {
		        	   title : 'Action',
		        	   aditionalclasses: 'ace-col-1'+(this.hasThinRowClass ? ' ace-thin-row' : ''),
		        	   type: 'action',
		        	   actions:[
		    	            {
		        	   
								callback:function(target, row, call, record){
									$.aceOverWatch.toast.show('success','Do something or another!');
								},
								iconcls:'fad fa-plus',
								tooltip:'do something',
			               },
		        	   ],
		         },
				  {
					  title : 'Student',
					  fieldname : 'student_name',
					  align : 'left',
					  aditionalclasses : 'ace-col-2'+(this.hasThinRowClass ? ' ace-thin-row' : ''),
					  groupheader : 'Who'
				  },
				  {
					  title : 'Birthday',
					  fieldname : 'student_birthday',
					  align : 'center',
					  aditionalclasses : 'ace-col-2'+(this.hasThinRowClass ? ' ace-thin-row' : ''),
					  groupheader : 'Who',
				  },
				  {
					  title : 'Sex',
					  fieldname : 'student_name',
					  align : 'center',
					  aditionalclasses : 'ace-col-1'+(this.hasThinRowClass ? ' ace-thin-row' : ''),
					  groupheader : 'Who',
				  },
				  {
					  title : 'Country',
					  fieldname : 'student_country',
					  align : 'right',
					  aditionalclasses : 'ace-col-2'+(this.hasThinRowClass ? ' ace-thin-row' : ''),
					  groupheader : 'Other',
				  },
				  {
					  title : 'Long Data',
					  align : 'right',
					  aditionalclasses : 'ace-col-3'+(this.hasThinRowClass ? ' ace-thin-row' : ''),
					  renderer:rendererStudent,
					  groupheader : 'Other',
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
	
	createGrid2 : function(){
		this.targetEx2 = $('#gridmod-ex2-grid').ace('create',{
			
			type : 'grid',
			gtype : 'panel',
			idfield : 'student_id',
			selectiontype : 'row',
			
			rowtpl : 'gridmod-ex2-row-tpl',
			
			width:'100%',
			
			allowedit:false,
			allowdelete:false,
			
			allowadd : false,
			allowrefresh : false,
			hideheader : true,
			
            net : {
        	   fid:'loadstudentsfilter',
        	   autoload:true,
        	   remote:true,
        	   size:9,
            }
		
		});
	},
	
	toggleGridModEx1Classes : function(fromButton){
		this.targetEx1.toggleClass(fromButton.attr('label'));
	},
	
	toggleGridModEx2Classes : function(fromButton){
		this.targetEx2.toggleClass(fromButton.attr('label'));
	},
	
	toggleGridModEx1ClassesThin : function(fromButton){
		this.toggleGridModEx1Classes(fromButton);
		if( this.targetEx1.hasClass('ace-thin-rows-grid') ){
			$('#thin-grid-with-headers').removeClass('ace-hide');
		}else{
			$('#thin-grid-with-headers').addClass('ace-hide');
		}
	},
	toggleGridModEx1ClassesThinRows : function(fromButton){
		this.hasThinRowClass = !this.hasThinRowClass
		gridmodObj.createGrid1();
	},
	toggleGridModEx1ClassesFlex : function(fromButton){
		this.toggleGridModEx1Classes(fromButton);
		if( this.targetEx1.hasClass('ace-flex-grid') ){
			$('#flex-grid-max-height').removeClass('ace-hide');
		}else{
			$('#flex-grid-max-height').addClass('ace-hide');
		}
	},
	
	onGridModEx1MaxHeight : function(newClass){
		this.targetEx1.removeClass(this.lastEx1MaxHeightClass).addClass(newClass);
		this.lastEx1MaxHeightClass = newClass;
	},
	onGridModEx1GridHeight : function(newClass){
		this.targetEx1.removeClass(this.lastEx1GridHeightClass).addClass(newClass);
		this.lastEx1GridHeightClass = newClass;
	},
	onGridModEx1BodyHeight : function(newClass){
		this.targetEx1.removeClass(this.lastEx1BodyHeightClass).addClass(newClass);
		this.lastEx1BodyHeightClass = newClass;
	},
	
	onGridModEx2Cols : function(newClass){
		this.targetEx2.removeClass(this.lastEx2ColClass).addClass(newClass);
		this.lastEx2ColClass = newClass;
	},
}

function toggleGridModEx1Classes(button){
	gridmodObj.toggleGridModEx1Classes(button);
}
function toggleGridModEx2Classes(button){
	gridmodObj.toggleGridModEx2Classes(button);
}
function toggleGridModEx1ClassesThin(button){
	gridmodObj.toggleGridModEx1ClassesThin(button);
}
function toggleGridModEx1ClassesThinRows(button){
	gridmodObj.toggleGridModEx1ClassesThinRows(button);
}
function toggleGridModEx1ClassesFlex(button){
	gridmodObj.toggleGridModEx1ClassesFlex(button);
}

function onGridModEx1MaxHeight(target, value){
	gridmodObj.onGridModEx1MaxHeight(value);
}

function onGridModEx1GridHeight(target,value){
	gridmodObj.onGridModEx1GridHeight(value);
}
function onGridModEx1BodyHeight(target,value){
	gridmodObj.onGridModEx1BodyHeight(value);
}

function onGridModEx2Cols(target, value){
	gridmodObj.onGridModEx2Cols(value);
}

gridmodObj.init();
