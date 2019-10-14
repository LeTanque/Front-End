import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaComments, FaFileInvoice, FaAngleRight, FaAngleDown, FaAngleUp, FaBan } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";

// Helper functions
import { calculateDueDate } from "../../../../helpers/helpers";

// GQL
import { useMutation } from '@apollo/react-hooks';
import { DELETE_PROJECT } from "../../../../graphql/mutations";


const Header = props => {
	const { city, state, name, description, startDate, duration, id, donations } = props.project;
	const { project, setProject, selectedProject } = props;
	const [ settingsToggle, setSettingsToggle ] = useState({ settingsDropdown: false });
	const [ deleteProject ] = useMutation(DELETE_PROJECT);

	const submitDeleteProject = async () => {
		const deletedProject = await deleteProject({ variables: { id: id } });
		console.log(`${deletedProject} has been deleted.`)
		props.history.push("/dashboard");
	};

	return (
		<>
			<div className="dashboard-header section">
				<div className="header-top">
					{project.isLive ? (
						<div className="project-status started">In Progress</div>
					) : (
						<div className="project-status not-started">Not Started</div>
					)}
					<div className="project-settings">
						<GoKebabVertical onClick={() => setSettingsToggle({ settingsDropdown: !settingsToggle.settingsDropdown })}/>
						{settingsToggle.settingsDropdown ? (
							<div className="project-settings-dropdown">
								<div className="project-settings-dropdown-option delete">
									<FaBan onClick={submitDeleteProject} />&nbsp; Delete Project
								</div>
							</div>
						) : null}
					</div>
				</div>

				<div className="header-middle">
					<div className="header-middle-geo">
						{city}, {state}
					</div>
					<div className="header-middle-title"><Link to={`/project/${project.id}`}>{name}</Link></div>
					<p className="header-middle-description">{description}</p>
				</div>

				<div className="header-bottom">
					<div className="bottom-left">
						<p className="due-date">Due Date: {calculateDueDate(startDate, duration)}</p>
						<div className="bottom-icons">
							<FaComments />
							<FaFileInvoice />
							{!selectedProject.buttonToggle
								?
									<FaAngleDown 
										className="bottom-icon-seemore"
										onClick={() => setProject({ 
											showMore: !selectedProject.showMore, 
											id: selectedProject.id ? null : id, 
											buttonToggle: !selectedProject.buttonToggle, 
										})}
									/>
								: 
									<FaAngleUp 
										className="bottom-icon-seemore"
										onClick={() => setProject({ 
											showMore: !selectedProject.showMore, 
											id: selectedProject.id ? null : id, 
											buttonToggle: !selectedProject.buttonToggle, 
										})}
									/>
							}
							<Link to={`/project/${project.id}`}>
								<FaAngleRight 
									className="bottom-icon-next"
								/>
							</Link>
						</div>
					</div>
					<div className="team-members">
						<div className="member-icons">
							<p>Team</p>
							<img
								src="https://res.cloudinary.com/revitalize/image/upload/v1569861720/user%20dashboard/OliverCut_jsjnmx.png"
								alt="team member"
								className="dashboard-picture-icons"
							/>
							<img
								src="https://res.cloudinary.com/revitalize/image/upload/v1569861717/user%20dashboard/Greg_zvzyrc.png"
								alt="team member 2"
								className="dashboard-picture-icons"
							/>
							<div className="count">+10</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(Header);
