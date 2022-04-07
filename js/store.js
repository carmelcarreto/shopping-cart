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
    //console.log(course);

    const courseInformation = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
    //Add elements to Cart
    cartArticles = [...cartArticles, courseInformation];
    
    console.log(cartArticles);

    cartHTML();
}

//Show shopping cart in HTML
function cartHTML() {

    //Clear HTML
    clearHTML();
    
    //Walk the cart and generate the HTML
    cartArticles.forEach( course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${course.title}
            </td>
        `;

        //Add HMTL to tbody
        containerCart.appendChild(row);
    });
}

//Delete tbody courses
function clearHTML(){
    //slow
    //containerCart.innerHTML = '';
    while(containerCart.firstChild){
        containerCart.removeChild(containerCart.firstChild);
    }
}