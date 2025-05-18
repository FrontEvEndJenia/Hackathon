import { Module } from '../core/module'
import { random } from '../utils'

export class RandomFigure extends Module {
  constructor() {
    super('figure','Добавить фигуру')
  }

  trigger() {
    
   document.querySelectorAll('.square, .triangle, .circle, .rectangle').forEach(el => el.remove());
    const figure = document.createElement('div')
    figure.className = 'triangle'
    const randomFigure = random(1,4)
    const rd = random(1,770)
        const yd = random(1,1800)
        const br = random(0,50)
        const r = random(0,255)
        const g = random(0,255)
        const b = random(0,255)
    if (randomFigure === 1) {
       figure.className = 'triangle'
       figure.style.borderBottom = `100px solid rgb(${r},${g},${b})`
       figure.style.top = `${rd}px`
       figure.style.left = `${yd}px`
       figure.style.transform = `rotate(${br}deg)`
       figure.style.background = 'transparent'
        
    }else if(randomFigure === 2) {
        figure.className = 'square'
        figure.style.background = `rgb(${r},${g},${b})`
        figure.style.top = `${rd}px`
        figure.style.left = `${yd}px`
        figure.style.transform = `rotate(${br}deg)`
        
        
    }else if(randomFigure === 3){
        figure.className = 'circle'
        figure.style.background = `rgb(${r},${g},${b})`
        figure.style.top = `${rd}px`
        figure.style.left = `${yd}px`
        figure.style.transform = `rotate(${br}deg)`   
    }else if(randomFigure === 4){
        figure.className = 'rectangle'
        figure.style.background = `rgb(${r},${g},${b})`
        figure.style.top = `${rd}px`
        figure.style.left = `${yd}px`
        figure.style.transform = `rotate(${br}deg)`
    }
     document.body.append(figure);
     figure.addEventListener('click',()=>{
        figure.remove()
    })
     
     
  }
}
