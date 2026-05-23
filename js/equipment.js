const sliderPic = document.querySelector('.slider_pic')

const xhr = new XMLHttpRequest()
xhr.open('GET', '../data/outfits.json')
xhr.setRequestHeader('Content-type', 'application/json')
xhr.send()
xhr.onload = () => {
    const outfits = JSON.parse(xhr.response)
    let currentIndex = 0
    sliderPic.innerHTML = `
        <img src="${outfits[currentIndex].photo}" alt="outfits">
    `
    setInterval(() => {
        currentIndex++
        if (currentIndex >= outfits.length) {
            currentIndex = 0
        }
        sliderPic.innerHTML = `
            <img src="${outfits[currentIndex].photo}" alt="outfits">
        `
    }, 3000)
}