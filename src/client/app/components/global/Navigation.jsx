import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
	render() {
		return (
			<div className="row-wrapper">
				<div className="row max-width small-row-padding">
					<div className="col12">
						<div className="nav-wrapper">
							<ul className="nav-list">
								<li>
									<Link
										to="/resume"
										className="underline-transition">Resume</Link>
								</li>
								<li>
									<Link
										to="/projects"
										className="underline-transition">Developer Projects</Link>
								</li>
								<li>
									<Link
										to="/writing"
										className="underline-transition">Writing Projects</Link>
								</li>
								<li>
									<a
										href="#contact"
										className="underline-transition">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Navigation;