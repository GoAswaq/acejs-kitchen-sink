# ACE - Documentation

## What is ACE, and what does it do?

- ACE is a jQuery based library that provides tools with which to create interactive web-based applications.
- the project started from the idea of finding a way in which large sets of data could be displayed in a user-friendly way, and to allow the user to interact with the data in a simple and intuitive way
- to handle the data, ACE uses a set of **fields**, each field being a component that allows the user to display or update data
- an important aspect of the ACE library, is the separion between the data and the way in which the data is displayed and processed; this allows the user to create a custom interface for each application, while using the same underlying data structure

## Requirements - ACE Basic

| Requirement                                                                                                 | Description                                                                                                    | Required                                                                    |
|-------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| <a href="https://jquery.com/" target="_blank">jQuery</a>                                                    | ACE is built on top of jQuery                                                                                  | Yes                                                                         |
| <a href="https://jqueryui.com/" target="_blank">jQuery UI</a>                                               | Support for Datepicker fields                                                                                  | Yes, only if *datepicker* fields are to be used.                            |
| <a href="https://momentjs.com/" target="_blank">Moment plugin</a>                                           | for time and date computations                                                                                 | Yes                                                                         |
| <a href="https://github.com/alexei/sprintf.js" target="_blank">sprintf-js plugin</a>                        | An alphanumeric text of max length 20, representing the current type of education form received by the student | Yes, if the *translation* functionality is to be used                       |
| <a href="https://github.com/longbill/jquery-date-range-picker" target="_blank">date range picker plugin</a> | Support for Date Range Picker field                                                                            | Yes, if the *daterangepicker* ACE field is to be used; load after *moment*. |
| language file                                                                                               | There are several language files, one for each supported language.                                             | Yes, one language file is mandatory                                         |
| ace.js                                                                                                      | the main ACE code                                                                                              | Yes                                                                         |  
| translation.js                                                                                              | for using multilanguage support                                                                                | No                                                                          |
| ace-app.js                                                                                                  | the ACE application related code                                                                               | Yes, if the application framework is used                                   |
| ace-init.js                                                                                                 | standard ACE Application initialization method                                                                 | No                                                                          |
| ace.css                                                                                                     | Contains the CSS rules by which the ACE fields are displayed                                                   | Yes                                                                         |

## Requirements - ACE - EASY EDIT TABLE

- in addition to normal ACE requirements, to use the EASY EDIT TABLE (EET) functionality, the following requirements must be met:

| Requirement                                       | Description                                                                                                    | Required                                         |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| EasyEditTable/css/edittable.css                   | main CSS for EET                                                                                               | Yes                                              |
| EasyEditTable/easyedittable.js                    | main JS functionality                                                                                          | Yes |
| EasyEditTable/plugins/overlay/custombutton.js     | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/printpage.js     | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/refresh.js          | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/customop.js         | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/groupchange.js      | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/colcheck.js         | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/editgdate.js        | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/legendary.js        | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/overlay/doubledatarows.js   | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/cell_edit/text.js           | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/cell_edit/comboboxstatic.js | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/cell_edit/toggleclick.js    | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/cell_edit/checkbox.js       | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/cell_edit/textarea.js       | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/data/indexcol.js            | optional plugin                                                                                                | no                                               |
| EasyEditTable/plugins/cell_custom_op/rowclick.js | optional plugin                                                                                                | no                                               |

## General Information

#### How to use ACE
- the main ACE functionality is called through the *ace* plugin, so: `$('selector').ace('COMMAND',...)`
- the initial parameters of a field may be set in two different ways: 

### ACE fields
- an ACE field is created over a jQuery object that represents a DOM element
- 

#### Communication with the server
- all ACE fields are able to communicate with the server to retrieve or update their own data
- by default, the ACE fields do not communicate with the server
- to allow the ACE fields to communicate with the server, the user must set the *net* property of the field

