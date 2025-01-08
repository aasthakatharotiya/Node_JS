document.querySelector('.add_movie_btn').addEventListener('click', () => {
    document.querySelector('.add_movie_form').classList.add('active')
})

document.querySelector('.close_form').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.add_movie_form').classList.remove('active')
})



document.querySelector('.side_menu button').addEventListener('click', () => {
    document.querySelector('.side_menu_div').classList.add('active')
})

document.querySelector('#closeMenuBtn').addEventListener('click', () => {
    document.querySelector('.side_menu_div').classList.remove('active')
})



// Handle star rating click event
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        const ratingValue = star.getAttribute('data-value')
        document.getElementById('rating').value = ratingValue

        // Update star classes based on the selected rating
        document.querySelectorAll('.star').forEach(star => {
            if (star.getAttribute('data-value') <= ratingValue) {
                star.classList.remove('fa-regular')
                star.classList.add('fa-solid', 'gold')
            } else {
                star.classList.remove('fa-solid', 'gold')
                star.classList.add('fa-regular')
            }
        })
    })
})







var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})






