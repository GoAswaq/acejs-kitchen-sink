var formObj = {

	ex1 : {
		
		getForm : function(){
			if( !this.form ){
				this.form = $('#ace-form-ex-1').ace('create')
			}
			return this.form;
		},
		
		show : function(){
			this.getForm().ace('show');
		}
		
	},
	
	ex2 : {
		
		studentIds : 0,
		studentRecords : {},
		
		getForm : function(){
			if( !this.form ){
				this.form = $('#ace-form-ex-2').ace('create',{
					type		: 'form',
					ftype		: 'popup',

					displayinfullscreenonmobile: true,
					displayinfullscreencancel: true,

					template 	: 'student-editing-form-template',
					
					autoloadfieldsonshow : false,
					
					displaysavebtn : false,
					displaycancelbtn : false,
					
					validate : true,
					
					idfield : 'student_id',
					
					oninit : function(form){
						formObj.ex2.oninit($(form));
					},
					
					onbeforeloadrecord : function(form, record){
						if( record.val('student_id') <= 0 ){
							record.val('title','New Student');
						}else{
							record.val('title','Edit Existing Student');
						}
					},
					
					onlocalsavesuccessfull : function(form, record){
						formObj.ex2.savesuccessfull(record);
					},
					
					onbeforesave : function(form, record){
						return formObj.ex2.onbeforesave(record);
					}
				});
				
			}
			return this.form;
		},
		
		getStudentCombo : function(){
			if( !this.studentCombo ){
				this.studentCombo = $('#stundent-combo-ex-2');
			} 
			return this.studentCombo; 
		},
		
		oninit : function(f){
			f.find('[type="autocomplete"]').ace('create');
			this.countriesField = f.find('[fieldname="student_country"]');
		},
		
		onbeforesave : function(record){
			/*
			 * we want to save the country's name in this field too, so we grab the text written in the search field, and save it
			 * the third parameter is false, becaseu we want to mark this field as dirty
			 * on remote save operations only dirty fields are send
			 */
			record.val('student_country',$.aceOverWatch.field.autocomplete.searchVal(this.countriesField),false);
			return true;
		},
		
		savesuccessfull : function(record){
			$.aceOverWatch.toast.show(
			        'success',
			        'The student data has been saved!',
		    );
			this.form.ace('hide');
			
			if( record.val('student_id') <= 0 ){
				record.val('student_id',++this.studentIds);
			}
			this.studentRecords[record.val('student_id')] = record;
			
			let studentsArr = Object.values(this.studentRecords);
			
			$.aceOverWatch.field.combobox.setData(
					this.getStudentCombo(),
					studentsArr,
					studentsArr.length,//unknown how many more
			        false,//replace all
	        );
			this.studentCombo.ace('value',record.val('student_id'));
		},
		
		createStudent : function(){
			this.getForm().ace('value',$.aceOverWatch.record.create({}));
			this.form.ace('show');
		},
		
		editCurrentStudent : function(){
			if( !this.studentCombo || this.studentCombo.ace('value') <= 0 ){
				$.aceOverWatch.toast.show(
				        'error',
				        'There is no student currently selected!',
			    );
				
				return;
			}
			
			this.getForm().ace('value',$.aceOverWatch.field.combobox.getRecord(this.studentCombo));
			this.form.ace('show');
		}
		
	},
	
	ex3 : {
		
		studentIds : 0,
		studentRecords : {},
		
		getForm : function(){
			if( !this.form ){
				this.form = $('#ace-form-ex-3').ace('create',{
					type		: 'form',
					ftype		: 'custom',

					displayinfullscreenonmobile: true,

					template 	: 'student-editing-form-template',
					renderto	: 'ace-form-ex-3',
					
					autoloadfieldsonshow : false,
					
					displaysavebtn : false,
					displaycancelbtn : false,
					
					validate : true,
					
					idfield : 'student_id',
					
					oninit : function(form){
						formObj.ex3.oninit($(form));
					},
					
					onbeforeloadrecord : function(form, record){
						if( record.val('student_id') <= 0 ){
							record.val('title','New Student');
						}else{
							record.val('title','Edit Existing Student');
						}
					},
					
					onlocalsavesuccessfull : function(form, record){
						formObj.ex3.savesuccessfull(record);
					},
					
					onbeforesave : function(form, record){
						return formObj.ex3.onbeforesave(record);
					},
					
					customshow : function(form, renderto){
						formObj.ex3.customshow();
					},
					customhide : function(form, renderto){
						formObj.ex3.customhide();
					},
				});
				
				this.exampleControls = $('#example-controls-ex3');
				
			}
			return this.form;
		},
		
		customshow : function(){
			this.exampleControls.addClass('ace-hide');
			this.form.removeClass('ace-hide');
		},
		customhide : function(){
			this.exampleControls.removeClass('ace-hide');
			this.form.addClass('ace-hide');
		},
		
		getStudentCombo : function(){
			if( !this.studentCombo ){
				this.studentCombo = $('#stundent-combo-ex-3');
			} 
			return this.studentCombo; 
		},
		
		oninit : function(f){
			f.find('[type="autocomplete"]').ace('create');
			this.countriesField = f.find('[fieldname="student_country"]');
		},
		
		onbeforesave : function(record){
			/*
			 * we want to save the country's name in this field too, so we grab the text written in the search field, and save it
			 * the third parameter is false, becaseu we want to mark this field as dirty
			 * on remote save operations only dirty fields are send
			 */
			record.val('student_country',$.aceOverWatch.field.autocomplete.searchVal(this.countriesField),false);
			return true;
		},
		
		savesuccessfull : function(record){
			$.aceOverWatch.toast.show(
					'success',
					'The student data has been saved!',
			);
			this.form.ace('hide');
			
			if( record.val('student_id') <= 0 ){
				record.val('student_id',++this.studentIds);
			}
			this.studentRecords[record.val('student_id')] = record;
			
			let studentsArr = Object.values(this.studentRecords);
			
			$.aceOverWatch.field.combobox.setData(
					this.getStudentCombo(),
					studentsArr,
					studentsArr.length,//unknown how many more
					false,//replace all
			);
			this.studentCombo.ace('value',record.val('student_id'));
		},
		
		createStudent : function(){
			this.getForm().ace('value',$.aceOverWatch.record.create({}));
			this.form.ace('show');
		},
		
		editCurrentStudent : function(){
			if( !this.studentCombo || this.studentCombo.ace('value') <= 0 ){
				$.aceOverWatch.toast.show(
						'error',
						'There is no student currently selected!',
				);
				
				return;
			}
			
			this.getForm().ace('value',$.aceOverWatch.field.combobox.getRecord(this.studentCombo));
			this.form.ace('show');
		}
		
	},
	ex4 : {
		
		studentIds : 0,
		studentRecords : {},
		
		getForm : function(){
			if( !this.form ){
				
				this.form = $('#ace-form-ex-4'); 
				
				this.form.detach().appendTo($('body')).ace('create',{
					type		: 'form',
					ftype		: 'custom',
					template 	: 'student-editing-form-template',
					renderto	: 'ace-form-ex-4',
					
					autoloadfieldsonshow : false,
					
					displaysavebtn : false,
					displaycancelbtn : false,
					
					validate : true,
					
					idfield : 'student_id',
					
					oninit : function(form){
						formObj.ex4.oninit($(form));
					},
					
					onbeforeloadrecord : function(form, record){
						if( record.val('student_id') <= 0 ){
							record.val('title','New Student');
						}else{
							record.val('title','Edit Existing Student');
						}
					},
					
					onlocalsavesuccessfull : function(form, record){
						formObj.ex4.savesuccessfull(record);
					},
					
					onbeforesave : function(form, record){
						return formObj.ex4.onbeforesave(record);
					},
					
					customshow : function(form, renderto){
						formObj.ex4.customshow();
					},
					customhide : function(form, renderto){
						formObj.ex4.customhide();
					},
				});
				
				this.exampleControls = $('#example-controls-ex4');
				this.displayModeCombo = $('#display-mode-form-ex4');
				this.displayModeChanged();
				
			}
			return this.form;
		},
		
		customshow : function(){
			this.exampleControls.addClass('ace-hide');
			this.form.addClass('ace-show');
		},
		customhide : function(){
			this.exampleControls.removeClass('ace-hide');
			this.form.removeClass('ace-show');
		},
		
		getStudentCombo : function(){
			if( !this.studentCombo ){
				this.studentCombo = $('#stundent-combo-ex-4');
			} 
			return this.studentCombo; 
		},
		
		oninit : function(f){
			f.find('[type="autocomplete"]').ace('create');
			this.countriesField = f.find('[fieldname="student_country"]');
		},
		
		onbeforesave : function(record){
			/*
			 * we want to save the country's name in this field too, so we grab the text written in the search field, and save it
			 * the third parameter is false, becaseu we want to mark this field as dirty
			 * on remote save operations only dirty fields are send
			 */
			record.val('student_country',$.aceOverWatch.field.autocomplete.searchVal(this.countriesField),false);
			return true;
		},
		
		savesuccessfull : function(record){
			$.aceOverWatch.toast.show(
					'success',
					'The student data has been saved!',
			);
			this.form.ace('hide');
			
			if( record.val('student_id') <= 0 ){
				record.val('student_id',++this.studentIds);
			}
			this.studentRecords[record.val('student_id')] = record;
			
			let studentsArr = Object.values(this.studentRecords);
			
			$.aceOverWatch.field.combobox.setData(
					this.getStudentCombo(),
					studentsArr,
					studentsArr.length,//unknown how many more
					false,//replace all
			);
			this.studentCombo.ace('value',record.val('student_id'));
		},
		
		createStudent : function(){
			this.getForm().ace('value',$.aceOverWatch.record.create({}));
			this.form.ace('show');
		},
		
		editCurrentStudent : function(){
			if( !this.studentCombo || this.studentCombo.ace('value') <= 0 ){
				$.aceOverWatch.toast.show(
						'error',
						'There is no student currently selected!',
				);
				
				return;
			}
			
			this.getForm().ace('value',$.aceOverWatch.field.combobox.getRecord(this.studentCombo));
			this.form.ace('show');
		},
		
		displayModeChanged : function(){
			if( !this.displayModeCombo ){
				return;
			}
			this.form.removeClass('ace-independent-form ace-lateral-form ace-advanced-panel from-bottom from-top').addClass(this.displayModeCombo.ace('value'));
		}
		
	},
	
}

function showFormEx1(button){
	formObj.ex1.show();
}
function createNewStudentEx2(button){
	formObj.ex2.createStudent();
}
function editCurrentStudentEx2(button){
	formObj.ex2.editCurrentStudent();
}
function createNewStudentEx3(button){
	formObj.ex3.createStudent();
}
function editCurrentStudentEx3(button){
	formObj.ex3.editCurrentStudent();
}
function createNewStudentEx4(button){
	formObj.ex4.createStudent();
}
function editCurrentStudentEx4(button){
	formObj.ex4.editCurrentStudent();
}
function onChangeFormDisplayEx4(){
	formObj.ex4.displayModeChanged();
}