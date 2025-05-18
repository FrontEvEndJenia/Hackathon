export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const remaining = seconds % 3600
  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  } else {
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
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

