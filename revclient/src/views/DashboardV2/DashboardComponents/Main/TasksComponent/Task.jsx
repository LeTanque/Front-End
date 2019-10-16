import React from 'react';
// import { FaLightbulb, FaFire, FaWrench, FaCheck, FaRegClipboard } from "react-icons/fa";
// import { IoIosWater } from "react-icons/io";



const Task = props => {
	const { tab, task } = props;



	return (
		<>
			<div className={`task-card-indicator left-bg ${task.priority.toLowerCase()}-priority`} ></div>

			<div className="task" key={task.id + Date.now()}>

				<div className="task-card-container" >
					<div className="task-card-img-container" >
						<img src={task.image} alt="" />
					</div>
					<div className="task-card-text">
						<h5>{task.priority}</h5>
						<p className="description">{task.description}</p>
						{/* <p className="comment">{task.comment}</p> */}
					</div>
					<div className="task-card-icon-container">
						<div className="no-picture"></div>
						{/* {task.right.map(user => (
							<>
								{user.img ? (
									<img src={user.img} alt={user.name} key={user.name + Date.now()} className="dashboard-picture-icons" />
								) : (
									<div className="no-picture"></div>
								)}
							</>
						))} */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Task;
