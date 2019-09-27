/**
 * * Description of component
 * TODO: things to do
 * @props description
 */
import React from "react";


const links = [
	{ href: "#", label: "Learn More" },
	{ href: "#", label: "Team" },
	{ href: "#", label: "Create Project" },
	{ href: "#", label: "Browse" },
].map(link => {
	link.key = `nav-link-${link.href}-${link.label}`;
	return link;
});


export default function Footer() {
	return (
		<div className="footer">
			<div>
			<ul className="links-container">
				{links.map(({ key, href, label }) => (
					<li key={key}>
						<a href={href}>{label}</a>
					</li>
				))}
			</ul>
			</div>
			<div className="social-links-container">
				<a href="https://github.com" alt="Github"> <i className="fa fa-github"></i> </a>
				<a href="https://facebook.com" alt="Facebook"> <i className="fa fa-facebook"></i> </a>
				<a href="https://Linkedin.com" alt="LinkedIn"> <i className="fa fa-linkedin"></i> </a>
				<a href="https://twitter.com" alt="Twitter"> <i className="fa fa-twitter"></i> </a>
			</div>
			<div className="bottom-footer">
		
			<span className="copyright">
				Revitalize &copy; <span className="italics">2019 All Rights Reserved</span>{' '}
			</span>
			</div>
		</div>
	);
}


