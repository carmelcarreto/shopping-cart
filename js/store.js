//varibles
const cart = document.querySelector('#cart'),
    containerCart = document.querySelector('#cart-list tbody'),
    emptyCartBtn = document.querySelector('#empty-cart'),
    coursesList = document.querySelector('#courses-list');

    let cartArticles = [];

    loadEventListeners();
    function loadEventListeners(){
        coursesList.addEventListener('click', addCourse);
    }

//Functions
function addCourse(e){
    e.preventDefault();

    if(e.target.classList.contains('add-cart') ) {
        const selectedCourse = e.target.parentElement.parentElement;
        readCourseData(selectedCourse);
    }
}

function readCourseData(course){
    console.log(course);

    const courseInformation = {
        image: course.querySelector('img').src,
        titule: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
    console.log(courseInformation);
}
