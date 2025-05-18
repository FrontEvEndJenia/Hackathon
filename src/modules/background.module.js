import { Module } from '../core/module'
import { random } from '../utils'

export class BackgroundModule extends Module {
  constructor() {
    super('background', 'Изменить фон')
  }

  trigger() {
        const r = random(0,255)
        const g = random(0,255)
        const b = random(0,255)
        document.body.style.background = `rgb(${r},${g},${b})`
        document.body.style.transition = 'all 0.3s ease'
  }
}
