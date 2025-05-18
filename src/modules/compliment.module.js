import { Module } from '../core/module'
import { random } from '../utils'
import '../styles.css'

export class Complimenter extends Module {
	constructor() {
		super('complimenter', 'Похвалить себя')
	}

	trigger() {
		try {
			const prevBlock = document.querySelector('.random-message')
			if (prevBlock) prevBlock.remove()

			const nouns = ['человек', 'друг', 'коллега']
			const adjectives = ['умный', 'креативный', 'добрый', 'отличный']
			const compliments = [
				'На тебя всегда можно положиться',
				'Ты делаешь жизнь интереснее',
				'С тобой можно молчать и не скучать',
				'Ты умеешь поддержать в трудную минуту',
				'Ты мастер создавать хорошее настроение',
				'Рядом с тобой я становлюсь лучше',
				'Ты вдохновляешь быть собой',
				'Ты умеешь находить приключения на ровном месте',
				'С тобой даже проблемы решать весело',
				'Ты как лучик солнца в пасмурный день',
			]

			const adjectiveRnd = random(0, adjectives.length - 1)
			const nounsRnd = random(0, nouns.length - 1)
			const complimentRnd = random(0, compliments.length - 1)
			const finalMessage = `Ты ${adjectives[adjectiveRnd]} ${nouns[nounsRnd]}! 
            ${compliments[complimentRnd]}!`

			const messageBlock = document.createElement('div')
			messageBlock.className = 'random-message'
			messageBlock.textContent = finalMessage

			const maxX = window.innerWidth - 500
			const maxY = window.innerHeight - 100
			messageBlock.style.left = `${random(0, maxX)}px`
			messageBlock.style.top = `${random(0, maxY)}px`

			document.body.appendChild(messageBlock)

			setTimeout(() => messageBlock.remove(), 2000)
		} catch (error) {
			console.error(error)
		}
	}
}
