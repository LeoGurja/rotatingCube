const choices = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

export default function randomColor() {
	let result = '#'
	for (let i = 0; i < 6; i++) {
		result += choices[Math.floor(Math.random() * choices.length)]
	}
	return result
}
