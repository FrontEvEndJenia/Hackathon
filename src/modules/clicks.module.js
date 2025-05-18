import { Module } from '../core/module'
import { checkValid } from '../utils'

const BUTTON = {
	start: 'Старт',
	click: 'Жми',
}

const MESSAGE_WARRNING = {
	empty: 'Поле пустое или меньше нуля, введи число...',
	string: 'Буквы, введите число...',
}

export class ClicksModule extends Module {
	constructor(type, text) {
		super(type, text)
		this.isActive = false
		this.startTimeSec = 0
		this.infoTime = 0
		this.interval = null
		this.countClick = 0
		this.singleClickCount = 0
		this.doubleClickCount = 0
		this.trigger = this.trigger.bind(this)
	}

	trigger() {
		const body = document.querySelector('body')
		body.id = 'click-bg'
		const clickUI = this.createClickUI()
		body.append(clickUI)

		this.onChange()
	}

	createClickUI() {
		const container = document.createElement('div')
		container.className = 'click'

		const inputTime = document.createElement('input')
		inputTime.className = 'click__time'
		inputTime.classList.add('hidden')
		inputTime.placeholder = 'Введите количество секунд... Enter'
		inputTime.id = 'click'
		inputTime.type = 'text'
		container.append(inputTime)

		const content = document.createElement('div')
		content.className = 'click__content'
		content.classList.add('hidden')

		const button = document.createElement('button')
		button.className = 'click__button'
		button.textContent = 'Старт'
		button.id = 'startOrClick'
		content.append(button)

		const info = document.createElement('div')
		info.className = 'click__info'
		info.classList.add('hidden')

		const time = document.createElement('span')
		time.className = 'click__times'
		time.id = 'click-times'
		info.append(time)

		const click = document.createElement('span')
		click.className = 'click__count'
		click.id = 'click-count'
		click.textContent = `Кликов: ${this.countClick}`
		info.append(click)

		const warrning = document.createElement('spam')
		warrning.className = 'warrning-click'
		warrning.classList.add('hidden')

		const message = document.createElement('div') // позже сделать
		message.className = 'message__click'
		message.classList.add('hidden')

		container.append(content, info, warrning, message)

		return container
	}

	onChange() {
		const inputTime = document.querySelector('#click')
		inputTime.classList.remove('hidden')

		const contentBTN = document.querySelector('.click__content')
		const contentInfo = document.querySelector('.click__info')
		const click = document.querySelector('.click')
		const button = document.querySelector('#startOrClick')

		inputTime.addEventListener('keyup', (event) => {
			const { key, target } = event
			if (key === 'Enter') {
				const inputValue = checkValid(target.value)
				const warrning = document.querySelector('.warrning-click')

				if (inputValue === 'isNotNumber') {
					warrning.textContent = MESSAGE_WARRNING.string
					warrning.classList.remove('hidden')
					return
				} else if (inputValue === 'isNumberEmpty') {
					warrning.textContent = MESSAGE_WARRNING.empty
					warrning.classList.remove('hidden')
					return
				}

				warrning.classList.add('hidden')
				this.startTimeSec = inputValue
				this.infoTime = inputValue
				this.countClick = 0
				this.singleClickCount = 0
				this.doubleClickCount = 0
				this.updateDisplay()
				inputTime.classList.add('hidden')
				click.classList.add('flex')
				contentBTN.classList.remove('hidden')
				contentInfo.classList.remove('hidden')
			}
		})

		button.addEventListener('click', (event) => {
			const clickCount = event.detail
			if (!this.isActive) {
				button.textContent = BUTTON.click
				this.startTime()
			} else {
				if (clickCount === 1) {
					this.singleClickCount++
					console.log('SINGLES')
				} else if (clickCount == 2) {
					console.log('ДАБЛ')
					this.doubleClickCount++
				}
				this.countClick = this.singleClickCount + this.doubleClickCount
				this.updateDisplay()
			}
		})
	}

	startTime() {
		if (this.startTimeSec <= 0) return

		this.isActive = true

		this.interval = setInterval(() => {
			this.startTimeSec--
			this.updateDisplay()

			if (this.startTimeSec <= 0) {
				this.stopTime()
			}
		}, 1000)
	}

	stopTime() {
		const message = document.querySelector('.message__click')
		const button = document.querySelector('#startOrClick')

		this.isActive = false
		clearInterval(this.interval)
		this.interval = null

		message.classList.remove('hidden')
		message.textContent = `Количество кликов: ${this.countClick} за ${this.infoTime} сек`

		this.startTimeSec = this.infoTime
		this.countClick = 0
		this.updateDisplay()
		button.textContent = BUTTON.start
		button.setAttribute('disabled', '')

		setTimeout(() => {
			message.classList.add('hidden')
			button.removeAttribute('disabled')
		}, 5000)
	}

	updateDisplay() {
		const time = document.querySelector('#click-times')
		time.textContent = `Время: ${this.startTimeSec} s`

		const count = document.querySelector('#click-count')
		count.textContent = `Кликов: ${this.countClick}`
	}
}
