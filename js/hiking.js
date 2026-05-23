const sliderPic = document.querySelector('.slider_pic')

const startSlider = async () => {
    try {   
        const response = await fetch('../data/data.json')
        const mountains = await response.json()
        
        let currentIndex = 0

        const renderSlide = (index) => {
            sliderPic.innerHTML = `
                <img src="${mountains[index].photo}" alt="${mountains[index].name}">
                <div class="slide_info">
                    <h2>${mountains[index].name}</h2>
                    <p>Высота: ${mountains[index].height} м</p>
                </div>
            `
        }
        renderSlide(currentIndex)

        setInterval(() => {
            currentIndex++
            if (currentIndex >= mountains.length) {
                currentIndex = 0
            }
            renderSlide(currentIndex)
        }, 3000)

    } catch (error) {
        console.error('Ошибка при загрузке данных для слайдера:', error)
        sliderPic.innerHTML = `<p style="color: red; text-align: center; padding-top: 200px;">Не удалось загрузить слайды</p>`
    }
}
startSlider()
const routes = [
    {
        name:'Пик Ленина',
        photo:'https://ak-sai.com/wp-content/uploads/2025/08/dsc09972-768x512.jpg',
        info:'Самостоятельное восхождение на пик Ленина (7134 м) по классическому маршруту — комфортная экспедиция для начинающих и опытных альпинистов. Вас ждет инфраструктура в базовых и высотных лагерях, вкусное питание, подготовленный маршрут с перилами на сложных участках. Пик Ленина — хороший выбор для первого семитысячника и незабываемых горных впечатлений.',
        distance: '24 км',
        time: '12-14 дней',
        elevation: '7134 м',
        level: 'Сложный'
    },
    {
        name:'Пик Победы',
        photo:'https://ak-sai.com/wp-content/uploads/2025/09/img_0279-768x576.jpg',
        info: 'Пик Победы – самый сложный и опасный из пяти семитысячников региона. Для покорения его вершины требуется значительный опыт в альпинизме',
        distance: '30 км',
        time: '20-22 дня',
        elevation: '7439 м',
        level: 'Экстремальный'
    },
    {
        name:'Хан-Тенгри',
        photo:'https://ak-sai.com/wp-content/uploads/2025/10/img_9784-1-768x512.jpg',
        info: 'Восхождение на пик Хан-Тенгри (7010 м) – самостоятельная экспедиция для опытных альпинистов. Участники самостоятельно проходят ледники и высокогорные склоны, наслаждаясь невероятными видами Тянь-Шаня.',
        distance: '28 км',
        time: '14-16 дней',
        elevation: '7010 м',
        level: 'Сложный'
    },
    {
        name:'Пик Мраморная Стена',
        photo:'https://ak-sai.com/wp-content/uploads/2025/09/mramornaya-stena-1-768x512.jpg.webp',
        info:'Восхождение на самый северный шеститысячник Центральной Азии. Её узнаваемый облик формирует почти километровая отвесная стена из белого и жёлтого мрамора, увенчанная массивными ледовыми и снежными карнизами и хорошо видимая из Базового Лагеря.',
        distance: '22 км',
        time: '10-12 дней',
        elevation: '6400 м',
        level: 'Сложный'
    }
]
const defaultPhoto = "https://img.freepik.com/premium-vector/man-climbing-mountain-mountain-climb-icon-hiking-icon-symbol-mountain-climb-illustration-is_997818-673.jpg?semt=ais_hybrid&w=740&q=80"
const routesCards = document.querySelector('.block_routes')
routes.forEach((rout) => {
    const card = document.createElement ('div')
    card.setAttribute('class', 'routes_card')
    card.innerHTML = `
    <div class="routes_img">
        <img src="${rout.photo || defaultPhoto}" alt="${rout.name}">
    </div>
    <div class="routes_overlay">
        <div class="routes_content">
            <h3>${rout.name}</h3>
            <div class="route_features">
                <span>
                    <i class="fa-solid fa-person-hiking"></i>
                    ${rout.distance || '—'}
                </span>
                <span>
                    <i class="fa-solid fa-clock"></i>
                    ${rout.time || '—'}
                </span>
                <span>
                    <i class="fa-solid fa-mountain"></i>
                    ${rout.elevation || '—'}
                </span>
            </div>
        </div>
    </div>
    <div class="routes_info_popup">
        <h3>${rout.name}</h3>
        <p>${rout.info}</p>
        <button>
            <a href="https://hiking.kg/ru/main">
                Подробнее →
            </a>
        </button>
    </div>
`
routesCards.append(card)
})

const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

let positionX = 0
let positionY = 0

const totalWidth = parentBlock.clientWidth
const totalHeight = parentBlock.clientHeight

const moveBlock = () => {
    if (positionX < totalWidth && positionY === 0) {
        childBlock.style.left = `${positionX - 70}px`
        childBlock.style.top = `-70px`

        positionX++
        requestAnimationFrame(moveBlock)
    }
    else if (positionX >= totalWidth && positionY < totalHeight) {
        childBlock.style.left = `${totalWidth - 50}px`
        childBlock.style.top = `${positionY - 50}px`

        positionY++
        requestAnimationFrame(moveBlock)
    }
    else if (positionX > 0 && positionY >= totalHeight) {
        childBlock.style.left = `${positionX - 70}px`
        childBlock.style.top = `${totalHeight - 70}px`

        positionX--
        requestAnimationFrame(moveBlock)
    }
    else if (positionX <= 0 && positionY > 0) {
        childBlock.style.left = `-50px`
        childBlock.style.top = `${positionY - 50}px`

        positionY--
        requestAnimationFrame(moveBlock)
    }
    else {
        requestAnimationFrame(moveBlock)
    }
}
moveBlock()