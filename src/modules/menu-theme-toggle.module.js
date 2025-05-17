import {Module} from '../core/module'

export class MenuThemeModule extends Module {
  constructor() {
    super('menuThemeToggle', 'Переключить тему меню')
  }

  trigger() {
    document.getElementById('menu').classList.toggle('menu_light')
  }

}