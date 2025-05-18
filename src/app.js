
import './styles.css'
import { SoundModule } from './modules/sound.module'
import { ContextMenu } from './menu.js'
import { MenuThemeModule } from './modules/menu-theme-toggle.module'

const menu = new ContextMenu('#menu')

menu.add(new SoundModule())

