/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
'use strict';

var React = require('react');
var TodoApp = require('./TodoApp.jsx');
var TodoModel = require('./TodoModel.js');
var model = new TodoModel('react-todos');

function render() {
	React.render(
		<TodoApp model={model}/>,
		document.getElementsByClassName('todoapp')[0]
	);
}

model.subscribe(render);
render();
