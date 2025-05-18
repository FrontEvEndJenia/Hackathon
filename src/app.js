
import './styles.css'

import { ContextMenu } from './menu.js'
import { MenuThemeModule } from './modules/menu-theme-toggle.module'
import { SoundModule } from './modules/sound.module'
import { BackgroundModule } from './modules//background.module.js'
import { DogsPhotos } from './modules/randomDogPhoto.js'
import { RandomFigure } from './modules/randomFigure.module.js'

const menu = new ContextMenu('#menu')

menu.add(new SoundModule())
menu.add(new BackgroundModule())
menu.add(new DogsPhotos())
menu.add(new RandomFigure())



