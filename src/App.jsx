import { useState } from 'react';
import './index.css';

export default function App() {
	const [todos, setTodos] = useState([]);
	const [activity, setActivity] = useState('');
	const [editActivity, setEditActivity] = useState('');
	const [editTodo, setEditTodo] = useState({});

	function saveTodoHandler(event) {
		event.preventDefault();
		setTodos([
			...todos,
			{
				id: Date.now(),
				activity,
				finish: false,
			},
		]);
		setActivity('');
	}

	function activityHandler(event) {
		setActivity(event.target.value);
	}

	function deleteTodoHandler(todoId) {
		const updatedTodos = todos.filter((todo) => todo.id !== todoId);
		setTodos(updatedTodos);
	}

	function editTodoHandler(todoId) {
		const todo = todos.find((todo) => todo.id === todoId);
		setEditTodo(todo);
		setEditActivity(todo.activity);
	}

	function inputEditActivity(event) {
		setEditActivity(event.target.value);
	}

	function updatedEditTodo(todoId) {
		const indexTodo = todos.findIndex((todo) => todo.id === todoId);
		const updatedTodo = [...todos];
		updatedTodo[indexTodo] = {
			id: todoId,
			activity: editActivity,
			finish: false,
		};

		setTodos(updatedTodo);
		setEditTodo({});
	}

	function deletedEditTodo() {
		setEditTodo({});
	}

	function finishTodo(todoId) {
		const indexTodo = todos.findIndex((todo) => todo.id === todoId);
		const todo = todos.find((todo) => todo.id === todoId);

		const updatedTodo = [...todos];
		updatedTodo[indexTodo] = {
			id: todoId,
			activity: todo.activity,
			finish: true,
		};
		setTodos(updatedTodo);
	}

	function cancelFinishTodo(todoId) {
		const indexTodo = todos.findIndex((todo) => todo.id === todoId);
		const todo = todos.find((todo) => todo.id === todoId);

		const updatedTodo = [...todos];
		updatedTodo[indexTodo] = {
			id: todoId,
			activity: todo.activity,
			finish: false,
		};
		setTodos(updatedTodo);
	}

	return (
		<div className="my-10">
			<div className="max-h-72 overflow-auto rounded-md bg-white py-6 sm:h-[700px] sm:max-h-none sm:w-[480px]">
				<h1 className="px-6 text-center text-3xl font-bold text-gray-700">Your Todo List!</h1>
				<form
					onSubmit={function (event) {
						saveTodoHandler(event);
					}}
					className="sticky -top-6 z-20 w-full bg-white px-6 py-8"
				>
					<div className="relative flex items-center">
						<input
							type="text"
							placeholder="What is the task today?"
							required
							autoFocus
							className="w-full border border-blue-600 px-3 py-2 pr-28 outline-blue-500 focus:border-blue-500"
							value={activity}
							onChange={function () {
								activityHandler(event);
							}}
						/>
						<button type="submit" className="absolute bottom-0 right-0 top-0 bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-600">
							Add Task
						</button>
					</div>
				</form>

				{todos.length <= 0 ? (
					<p className="px-6 text-center font-medium opacity-30">No Todo List!</p>
				) : (
					<ul className="flex flex-col gap-y-4 px-6">
						{todos.map((todo) => {
							return (
								<li key={todo.id}>
									{editTodo.id !== todo.id ? (
										<div className={`px relative flex items-center justify-between rounded-md border ${!todo.finish ? 'border-blue-600 bg-blue-600' : 'border-transparent bg-teal-800'} px-3 py-2`}>
											<p className={`font-medium text-white ${!todo.finish ? '' : 'line-through'}`}>{todo.activity}</p>
											<div className="flex items-center gap-x-4">
												{todo.finish || (
													<>
														<button
															type="button"
															title="Edit Todo"
															onClick={function () {
																editTodoHandler(todo.id);
															}}
														>
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
																<path
																	d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"
																	fill="rgba(255,255,255,1)"
																></path>
															</svg>
														</button>
														<button
															type="button"
															title="Delete Todo"
															onClick={function () {
																deleteTodoHandler(todo.id);
															}}
														>
															<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
																<path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" fill="rgba(255,255,255,1)"></path>
															</svg>
														</button>
													</>
												)}
												{todo.finish ? (
													<button
														type="button"
														title="Cancel Todo"
														onClick={function () {
															cancelFinishTodo(todo.id);
														}}
													>
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
															<path
																d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"
																fill="rgba(255,255,255,1)"
															></path>
														</svg>
													</button>
												) : (
													<button
														type="button"
														title="Finish Todo"
														onClick={function () {
															finishTodo(todo.id);
														}}
													>
														<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
															<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" fill="rgba(255,255,255,1)"></path>
														</svg>
													</button>
												)}
											</div>
										</div>
									) : (
										<div className="relative flex items-center">
											<input
												type="text"
												value={editActivity}
												onChange={function () {
													inputEditActivity(event);
												}}
												required
												autoFocus
												placeholder="Edit your task"
												className="w-full rounded-md border border-blue-600 px-3 py-2 pr-28 outline-blue-500 focus:border-blue-500"
											/>
											<button
												type="button"
												className="absolute bottom-0 right-11 top-0 bg-red-600 px-3 py-2 font-medium text-white hover:bg-red-700"
												onClick={function () {
													deletedEditTodo();
												}}
											>
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
													<path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" fill="rgba(255,255,255,1)"></path>
												</svg>
											</button>
											<button
												type="button"
												className="absolute bottom-0 right-0 top-0 rounded-br-md rounded-tr-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
												onClick={function () {
													updatedEditTodo(todo.id);
												}}
											>
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
													<path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z" fill="rgba(255,255,255,1)"></path>
												</svg>
											</button>
										</div>
									)}
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<div className="mt-5 flex flex-col justify-center gap-2 text-center font-medium text-white">
				<p>2023. Todo list</p>
				<p>
					<span className="opacity-60">Github </span>
					<a href="https://github.com/mfebriann" className="underline">
						mfebriann
					</a>
				</p>
			</div>
		</div>
	);
}
