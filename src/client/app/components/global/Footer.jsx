import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div className="row-wrapper">
				<div className="row max-width standard-row-top-padding small-row-bottom-padding">
					<div className="col6">
					</div>
					<div className="col6">
						<ul
							className="footer-menu"
							id="contact">
							<li>
								<a
									href="mailto:tonynarisi@gmail.com"
									className="underline-transition">Email</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/tonynarisi"
									className="underline-transition">LinkedIn</a>
							</li>
							<li>
								<a
									href="https://www.github.com/tonynarisi"
									className="underline-transition">GitHub</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="row max-width small-row-bottom-padding white-text">
					<p className="small-text no-top-margin no-bottom-margin center-self">
						<span>&copy; Tony Narisi { new Date().getFullYear() }</span>
					</p>
				</div>
			</div>
		)
	}
}

export default Footer;