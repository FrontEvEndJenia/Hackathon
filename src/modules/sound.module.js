import { Module } from '../core/module'
import { random } from '../utils'

const soundArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
	(i) => new Audio(require(`../assets/audio/sound${i}.mp3`)),
)

export class SoundModule extends Module {
	constructor() {
		super('randomSound', 'Случайный звук')
	}

	trigger() {
		try {
			soundArray[random(0, 9)].play()
		} catch (error) {
			console.error(error)
		}
	}
}
