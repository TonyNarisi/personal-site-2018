import React, { Component } from 'react';
import { writeText } from '../../helpers/misc.js';

class WritingText extends Component {
	componentDidMount() {
		let props = this.props;
		writeText(props.message, props.textId);
	}

	render() {
		// Make this not throw errors if more than one on a page
		let props = this.props;
		return (
			<div className="row-wrapper">
				<div className="row max-width narrow-column standard-row-padding">
					<div className="col12">
						<div
							className="writing-text__canvas"
							style={{
								'minHeight': `${ props.message.length + 8 }em`
							}}>
							<p>
								<span id={ props.textId }></span>
								<span className="blinking-cursor"></span>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default WritingText;