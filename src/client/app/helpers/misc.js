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

export const writeText = async function(lines, nodeId) {
	var target = document.getElementById(nodeId);
	for (var lineNum = lines.length, i = 0; i < lineNum; i++) {
		if (i != 0) {
			target.innerHTML = target.innerHTML + '<br/>';
		}
		for (var j = 0; j < lines[i].indent; j++) {
			target.innerHTML = target.innerHTML + '&nbsp;&nbsp;';
		}
		for (var messageLength = lines[i].text.length, j = 0; j < messageLength; j++) {
			target.innerHTML = target.innerHTML + lines[i].text[j];
			let pause = determinePause();
			let moveOn = await promisePause(pause);
		}
	}
}