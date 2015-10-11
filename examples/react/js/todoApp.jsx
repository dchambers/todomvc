/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var TodoHeader = app.TodoHeader;
	var TodoFooter = app.TodoFooter;
	var TodoItems = app.TodoItems;
	var TodoItem = app.TodoItem;

	app.TodoApp = React.createClass({
		getInitialState: function () {
			return {
				nowShowing: app.ALL_TODOS,
				editing: null
			};
		},

		componentDidMount: function () {
			var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
				'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
				'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			});
			router.init('/');
		},

		addTodo: function (todo) {
			this.props.model.addTodo(todo);
		},

		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},

		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},

		destroy: function (todo) {
			this.props.model.destroy(todo);
		},

		edit: function (todo) {
			this.setState({editing: todo.id});
		},

		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({editing: null});
		},

		cancel: function () {
			this.setState({editing: null});
		},

		clearCompleted: function () {
			this.props.model.clearCompleted();
		},

		render: function () {
			var model = this.props.model;
			var todos = model.todos;

			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case app.ACTIVE_TODOS:
					return !todo.completed;
				case app.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
				}
			}, this);

			var todoItems = shownTodos.map(function (todo) {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={this.toggle.bind(this, todo)}
						onDestroy={this.destroy.bind(this, todo)}
						onEdit={this.edit.bind(this, todo)}
						editing={this.state.editing === todo.id}
						onSave={this.save.bind(this, todo)}
						onCancel={this.cancel}
					/>
				);
			}, this);

			return (
				<div>
					<TodoHeader onTodoAdded={this.addTodo}/>
					{todos.length ? (
						<TodoItems activeTodoCount={model.activeTodoCount()} onToggleAll={this.toggleAll}>
							{todoItems}
						</TodoItems>
					) : null}
					{model.activeTodoCount() || model.completedCount() ? (
						<TodoFooter count={model.activeTodoCount()} completedCount={model.completedCount()}
							nowShowing={this.state.nowShowing} onClearCompleted={this.clearCompleted}
						/>
					) : null}
				</div>
			);
		}
	});
})();
