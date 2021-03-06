//varibles
const cart = document.querySelector('#cart'),
    containerCart = document.querySelector('#cart-list tbody'),
    emptyCartBtn = document.querySelector('#empty-cart'),
    coursesList = document.querySelector('#courses-list');

    let cartArticles = [];

    loadEventListeners();
    function loadEventListeners(){
        //When you add a course by pressing Add to Cart
        coursesList.addEventListener('click', addCourse);

        //Remove courses from cart
        cart.addEventListener('click', deleteCourse);

        //Empty cart
        emptyCartBtn.addEventListener('click', () => {
            cartArticles= [];//Reset te fix
            
            clearHTML(); //Remove all HTML
        })
    }

//Functions
function addCourse(e){
    e.preventDefault();

    if(e.target.classList.contains('add-cart') ) {
        const selectedCourse = e.target.parentElement.parentElement;
        readCourseData(selectedCourse);
    }
}
//Delete a course from the cart
function deleteCourse(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('delete-course')){
        const courseId = e.target.getAttribute('data-id');
        
        //Remove from cartArticles array by data-id
        cartArticles = cartArticles.filter(course => course.id !== courseId);
        
        cartHTML(); //Iterate over the cart and display its HTML
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

    //check if an item already exists in the cart
    const exist = cartArticles.some(course => course.id === courseInformation.id);
    if(exist){
        //update amount
        const courses = cartArticles.map( course => {
            if(course.id === courseInformation.id){
                course.amount++;
                return course;// Return the updated object
            }else{
                return course; //Returns objects that are not duplicates 
            }
        });
        cartArticles = [...courses];
    }else{
        //Add elements to Cart
        cartArticles = [...cartArticles, courseInformation];
    
    }
    console.log(cartArticles);

    cartHTML();
}

//Show shopping cart in HTML
function cartHTML() {

    //Clear HTML
    clearHTML();
    
    //Walk the cart and generate the HTML
    cartArticles.forEach( course => {
        const {image, title, price, amount, id} = course;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td>
                <a href="#" class="delete-course" data-id="${id}"> X </a>
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