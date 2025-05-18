import './styles.css'
import { ContextMenu } from './menu.js'
import { TimerModale } from './modules/timer-module.js'
const menu = new ContextMenu('#menu')

menu.add(new TimerModale())
