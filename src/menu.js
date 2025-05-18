import { Menu } from './core/menu'

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector)
    
    this.modules = {}

    document.body.addEventListener('contextmenu', event => {
      event.preventDefault()
      if (!Object.keys(this.modules).length) {
        console.warn('No modules found!')
        return
      }
      this.open(event.clientX, event.clientY)
    })

    this.el.addEventListener('click', event => {
      console.log(`Попытка выполнить модуль ${this.el.textContent} ...`)
      this.modules[event.target.dataset.type]?.call(this, event.target.dataset.type)
      this.close()
    })
  }

  open(left = 0, top = 0) {
    this.el.style.left = `${left}px`
    this.el.style.top = `${top}px`
    this.el.style.display = 'block'
  }

  close() {
    this.el.style.display = 'none'
  }

  add(module) {
    if (!module.trigger) {
      console.warn('Module should be an instance of Module class')
      return false
    }
    if (this.modules[module.type]) {
      console.warn(`Module ${module.type} already exists`)
      return false
    }

    this.modules[module.type] = module.trigger

    this.el.innerHTML += module.toHTML()
  }
}