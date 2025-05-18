import { Module } from '../core/module'
import { formatTime } from '../utils'

const BUTTONS_TIME = [
	{ id: 0, text: '+0:30', second: 30 },
	{ id: 1, text: '+1:00', second: 60 },
	{ id: 2, text: '+5:00', second: 300 },
]

const MESSAGE = {
	ru: {
		start: 'Старт',
		pause: 'Пауза',
		reset: 'Сбросить',
		end: 'Таймер закончился',
		continue: 'Продолжить',
	},
}

const START_TIME = 0

export class TimerModale extends Module {
	constructor() {
		super('timer-module', 'Таймер отсчета')
		this.startTime = START_TIME
		this.currentTimer = this.startTime
		this.isActive = false
		this.timerInterval = null
		this.trigger = this.trigger.bind(this)
	}

	trigger() {
		const body = document.querySelector('body')
		body.id = 'timer-bg'

		const timerUI = this.createTimerUI()

		const getTimer = document.querySelector('.timer')
		if (getTimer) getTimer.remove()

		body.append(timerUI)

		this.onChange()
	}

	createTimerUI() {
		const container = document.createElement('div')
		container.className = 'timer'

		const displayTime = document.createElement('input')
		displayTime.className = 'timer__display'
		displayTime.value = formatTime(this.startTime)
		displayTime.id = 'timer'
		displayTime.type = 'text'

		const buttonsTimeAdd = document.createElement('div')
		buttonsTimeAdd.className = 'timer__add'

		BUTTONS_TIME.forEach((time) => {
			const button = document.createElement('button')
			button.textContent = time?.text
			button.className = 'timer__button'
			button.id = time?.id
			buttonsTimeAdd.append(button)
		})

		const buttonsManage = document.createElement('div')
		buttonsManage.className = 'timer__manage'

		const buttonPlayOrPause = document.createElement('button')
		buttonPlayOrPause.className = 'timer__play-pause'
		buttonPlayOrPause.id = 'PlayOrPause'
		buttonPlayOrPause.classList.add('bg-color-start')
		buttonPlayOrPause.textContent = MESSAGE?.ru?.start
		buttonPlayOrPause.style.width = '100%'
		buttonsManage.append(buttonPlayOrPause)

		const buttonReset = document.createElement('button')
		buttonReset.className = 'timer__reset'
		buttonReset.textContent = MESSAGE?.ru?.reset
		buttonReset.id = 'reset'
		buttonReset.style.display = 'none'
		buttonsManage.append(buttonReset)

		const messageAndTimer = document.createElement('span')
		messageAndTimer.className = 'message'
		messageAndTimer.textContent = MESSAGE?.ru?.end
		messageAndTimer.style.display = 'none'

		container.append(displayTime, buttonsTimeAdd, buttonsManage, messageAndTimer)

		return container
	}

	onChange() {
		const getTimerHTML = document.querySelector('.timer')
		getTimerHTML.addEventListener('click', (event) => {
			const { target } = event

			const play = target.closest('#PlayOrPause')
			if (play) {
				this.startTimer()
			}

			const reset = target.closest('#reset')
			if (reset) {
				this.resetTimer()
			}

			const timerAdd = target.closest('.timer__button')
			if (timerAdd) {
				const getSecondAdd = BUTTONS_TIME.find(
					(btn) => btn.id === Number(timerAdd.id),
				)?.second
				if (!getSecondAdd) {
					throw new Error('Такого времени добавления нет!')
				}
				this.addTime(getSecondAdd)
			}
		})
	}

	startTimer() {
		const playButton = document.querySelector('#PlayOrPause')
		const resetButton = document.querySelector('#reset')
		const messageEnd = document.querySelector('.message')
		const buttonAdd = document.querySelectorAll('.timer__button')

		if (this.isActive) {
			this.isActive = false
			clearInterval(this.timerInterval)

			playButton.style.width = '49%'
			playButton.textContent = MESSAGE?.ru?.continue

			buttonAdd.forEach((btn) => btn.removeAttribute('disabled'))
		} else {
			if (this.currentTimer <= 0) return

			this.isActive = true

			playButton.style.width = '49%'
			playButton.textContent = MESSAGE?.ru?.pause
			playButton.classList.remove('bg-color-start')

			resetButton.style.display = 'block'

			buttonAdd.forEach((btn) => btn.setAttribute('disabled', true))

			this.timerInterval = setInterval(() => {
				this.currentTimer--
				this.updateDisplay()

				if (this.currentTimer <= 0) {
					this.stopTimer()
					messageEnd.style.display = 'flex'
				}
			}, 1000)
		}
	}

	stopTimer() {
		const message = document.querySelector('.message')

		this.isActive = false
		clearInterval(this.timerInterval)

		setTimeout(() => {
			this.resetTimer()
			message.style.display = 'none'
		}, 5000)
	}

	addTime(seconds) {
		if (!this.isActive) {
			this.currentTimer += seconds
			this.updateDisplay()
		}
	}

	updateDisplay() {
		const displayTime = document.querySelector('#timer')
		displayTime.value = formatTime(this.currentTimer)
	}

	resetTimer() {
		const buttonAdd = document.querySelector('.timer__button')
		const playButton = document.querySelector('#PlayOrPause')

		if (buttonAdd.hasAttribute('disabled')) {
			const buttonsAdd = document.querySelectorAll('.timer__button')
			buttonsAdd.forEach((btn) => btn.removeAttribute('disabled'))
		}

		playButton.textContent = MESSAGE?.ru?.start
		this.startTime = START_TIME
		this.currentTimer = this.startTime
		this.isActive = false
		clearInterval(this.timerInterval)
		this.updateDisplay()
	}
}
