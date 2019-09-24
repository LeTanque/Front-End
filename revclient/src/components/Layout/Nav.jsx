import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/LandingPage/Logo.png';
// import darkModeEmoji from '../../assets/Global/Nav/night-mode-512.png';
// import lightModeEmoji from '../../assets/Global/Nav/night-mode-512.png';
import { FaMoon } from "react-icons/fa";

const uLinks = [{ href: '/start', label: 'Browse' }, { href: '#', label: 'Learn More' }, { href: '#', label: 'Team' }, { href: '/login', label: 'Log In' }].map(
	link => {
		link.key = `nav-link-${link.href}-${link.label}`;
		return link;
	},
);
const aLinks = [{ href: '/createproject', label: 'Create a project' }, { href: '/projects', label: 'Community' }, { href: '#', label: 'Help' }].map(
	link => {
		link.key = `nav-link-${link.href}-${link.label}`;
		return link;
	},
);

const Nav = () => {
	const [darkModeActive, setDarkMode] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [name, setName] = useState("User");
    const [clicked, setClicked] = useState(false);

	// for testing
	const toggleLoggedIn = () => setLoggedIn(!loggedIn);

    const toggleDropdown = () => {
        setClicked(!clicked);
	}

	const toggleDarkMode = () => {
		setDarkMode(!darkModeActive);
		localStorage.setItem('dark-mode', !darkModeActive)
	};

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('dark-mode')) == true) {
			document.querySelector('body').classList.add('dark-mode')
		} else {
			document.querySelector('body').classList.remove('dark-mode')
		}
	}, [darkModeActive])

	return (
		<nav>
			<a href="/" title="Home">
				<div className="logo">
					<img src={logo} alt="Revitalize logo" />
					<h2>Revitalize </h2>
				</div>
			</a>
			{/* <button onClick={toggleLoggedIn}>FOR TESTING: toggleLoggedIn</button> */}
			<ul>
			{localStorage.getItem('token')
				?	(<> {aLinks.map(({ key, href, label }) => (
						<li className="navLinks" key={key}>
							<Link to={href}>{label}</Link>
						</li>
					))}
					<div className="user">
								<div className="welcome" onClick={toggleDropdown}>{`Welcome, ${name}`}</div>
									{clicked && (
										<div className="dropdown">
											<div className="on"></div>
										</div>
									)}
								<div className="userIcon"></div>
							</div></>
							)
				:	(<> {uLinks.map(({ key, href, label }) => (
						<li className="navLinks" key={key}>
							<Link to={href}>{label}</Link>
						</li>
					))}
					<li>
								<Link to="/register"><button className="register">Get Started</button></Link>
							</li></>)
			}
			</ul>
			<div className="dark-mode-emoji">
				<FaMoon
					onClick={() => toggleDarkMode()}
				/>
			</div>
		</nav>
	);
};
export default Nav;
