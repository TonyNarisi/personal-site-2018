 const determinePause = () => {
	return (Math.random() * 100) + 50;
}

const promisePause = pauseTime => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, pauseTime)
	})
}

export const writeText = async function(message, nodeId) {
	// Change to be based off arrays to give line breaks
	var target = document.getElementById(nodeId);
	for (var messageLength = message.length, i = 0; i <= messageLength; i++) {
		target.innerHTML = message.split('').slice(0,i).join('');
		let pause = determinePause();
		let moveOn = await promisePause(pause);
	}
}