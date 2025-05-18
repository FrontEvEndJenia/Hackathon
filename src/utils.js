export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function checkValid(value) {
	const input = Number(value.trim())
	if (isNaN(input)) {
		return 'isNotNumber'
	} else if (input <= 0) {
		return 'isNumberEmpty'
	}

	return input
}
