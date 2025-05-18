import { Module } from '../core/module'


export class DogsPhotos extends Module {
  constructor() {
    super('photo', 'Случайное фото собаки') 
  }



  trigger() {
    const dogLoader = document.createElement('div')
    dogLoader.className = 'dogLoader'
    const loaderText = document.createElement('h2')
    loaderText.textContent = 'Загрузка'
    document.body.append(dogLoader)
    dogLoader.append(loaderText)
    
    document.querySelectorAll('.dogPhoto').forEach(el => el.remove())
    const getPhoto = async() =>{
    try{
    const response = await fetch('https://dog.ceo/api/breeds/image/random')

    if (!response.ok) {
          throw new Error(`Error`)
        }

    const result = await response.json()
    const dogPhoto = document.createElement('img')
    dogPhoto.className = 'dogPhoto'
    dogPhoto.src = result.message
    dogPhoto.style.opacity = '0'
    dogPhoto.addEventListener('click', ()=>{
    dogPhoto.remove()
    })
    document.body.appendChild(dogPhoto)

      setTimeout(() => {
          dogPhoto.style.opacity = '1'
        }, 500)
}
    catch(error){
    console.log('error')
}
    finally{
        dogLoader.remove()
    }
  }
    getPhoto()
   
   
}
}