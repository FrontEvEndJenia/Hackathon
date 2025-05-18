import './styles.css'
import { ContextMenu } from './menu.js'
import { MenuThemeModule } from './modules/menu-theme-toggle.module'
import { SoundModule } from './modules/sound.module'
import { BackgroundModule } from './modules//background.module.js'
import { DogsPhotos } from './modules/randomDogPhoto.module.js'
import { RandomFigure } from './modules/randomFigure.module.js'
import { ClicksModule } from './modules/clicks.module.js'
import { TimerModale } from './modules/timer-module.js'
import { Complimenter } from './modules/compliment.module'

const menu = new ContextMenu('#menu')

menu.add(new MenuThemeModule())
menu.add(new SoundModule())
menu.add(new BackgroundModule())
menu.add(new DogsPhotos())
menu.add(new RandomFigure())
menu.add(new ClicksModule())
menu.add(new TimerModale())
menu.add(new Complimenter())

