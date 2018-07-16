import React, { Component } from 'react';
import InField from '../../../public/assets/images/infield.jpg';

export default class Home extends Component {
	render() {
		return(
			<div
				className="row-wrapper centered-cover-bg"
				style={{
					backgroundImage: `url(${ InField })`
				}}>
				<div className="row home__hero max-width">
					<div className="col12">
						<div className="home__hero--text-wrap">
							<h1>Tony Narisi</h1>
							<div className="home__hero--separator"></div>
							<h3>Full-Stack Developer, Writer</h3>
						</div>
					</div>
				</div>
			</div>
		)
	}
}