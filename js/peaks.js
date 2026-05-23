const blockSlider = document.querySelector('.block_slider')
const mapModal = document.querySelector('#map-modal')

let map = null

const renderPeaks = async () => {
    try {
        const response = await fetch('../data/peaks.json')
        const peaks = await response.json()

        blockSlider.innerHTML = '' 

        peaks.forEach(peak => {
            const peakCard = document.createElement('div')
            peakCard.classList.add('peak_card')

            // Рендерим карточку, создавая пустой тег для координат с уникальным классом/id
            peakCard.innerHTML = `
            <div class="peak_img_box">
            <img src="${peak.image}" alt="${peak.name}">
            
            <div class="peak_overlay">
                <h3>${peak.name}</h3>
                <span>Высота: ${peak.height}</span>
            </div>
    
            <div class="peak_info">
                <h2>${peak.name}</h2>
                <p>${peak.description}</p>
                <p><b>Высота:</b> ${peak.height}</p>
                <p><b>Первое восхождение:</b> ${peak.date}</p>
                <p><b>Альпинисты:</b> ${peak.climbers}</p>
            </div>
        </div>
        
        <div class="peak_coordinates_btn">
            Посмотреть на карте
        </div>
            `

            // Находим кнопку координат КОРРЕКТНО внутри только что созданной карточки
            const coordinatesBtn = peakCard.querySelector('.peak_coordinates_btn')

            // НАВЕДЕНИЕ МЫШИ НА КООРДИНАТЫ: Показываем карту
            coordinatesBtn.onmouseenter = (event) => {
                const { lat, lng } = peak.coordinates

                mapModal.style.display = 'block'
                mapModal.style.top = `${event.clientY + 15}px`
                mapModal.style.left = `${event.clientX + 15}px`

                if (map !== null) {
                    map.remove()
                }

                map = L.map('map-container', { zoomControl: false }).setView([lat, lng], 11)

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

                L.marker([lat, lng]).addTo(map)
                    .bindPopup(`<b>${peak.name}</b>`)
                    .openPopup()
            }

            // ДВИЖЕНИЕ МЫШИ НАД КООРДИНАТАМИ: Окно плавно следует за курсором
            coordinatesBtn.onmousemove = (event) => {
                mapModal.style.top = `${event.clientY + 15}px`
                mapModal.style.left = `${event.clientX + 15}px`
            }

            // УХОД МЫШИ С КООРДИНАТ: Скрываем карту обратно
            coordinatesBtn.onmouseleave = () => {
                mapModal.style.display = 'none'
                if (map !== null) {
                    map.remove()
                    map = null
                }
            }

            blockSlider.append(peakCard)
        })

    } catch (error) {
        console.error('Ошибка:', error)
    }
}

renderPeaks()

const searchInput = document.querySelector ('#searchInput')
const searchButton = document.querySelector ('#search')
const city = document.querySelector ('.city')
const temp = document.querySelector ('.temp')

const API_KEY = '436b965382648a0f50cbe36c262be810'
const BASE_URL = 'https://api.openweathermap.org'

searchButton.onclick = async () => {
    if (searchInput.value !== '') {
        try {
            const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${searchInput.value}&units=metric&lang=ru&appid=${API_KEY}`)
            const weather = await response.json()
    
            if (weather.name) {
                city.style.color = 'white'
                city.innerHTML = weather.name
                temp.innerHTML = Math.round(weather.main.temp) + '&deg;C'
            } else {
                city.innerHTML = 'Такой город не найден!'
                temp.innerHTML = ''
                city.style.color = 'red'
            }
                searchInput.value = ''
                
            } catch (error) {
                console.error(error)
                city.innerHTML = 'Ошибка'
                temp.innerHTML = ''
                city.style.color = 'red'
                
                searchInput.value = ''
            }
        } else {
            city.innerHTML = 'Введите название города'
            temp.innerHTML = ''
            city.style.color = 'red'
        }
    }