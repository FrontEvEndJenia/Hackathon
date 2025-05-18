import './styles.css'
import { ContextMenu } from './menu.js'
import { ClicksModule } from './modules/clicks.module.js'

const menu = new ContextMenu('#menu')

menu.add(new ClicksModule('clicks-module', 'Аналитика кликов'))
