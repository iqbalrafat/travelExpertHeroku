const navbar = document.querySelector('.icon');
const mytopnav = document.querySelector('#myTopnav');
const email = document.querySelector('#email');
const fname = document.querySelector('#fname');
const pwd = document.querySelector('#pwd');
const cpwd = document.querySelector('#cpwd');
const enter = document.querySelector('#submit');
const img = document.querySelector('#destinations');
const footyear = document.querySelector('#year');

//  Display Year Using Moment

fetch('https://travel-expert.herokuapp.com/api/getYear')
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
        footyear.innerText=`Year = ${data.year}`;
    });

	// Image Gallery
	fetch('https://travel-expert.herokuapp.com/api/destinations')
		.then(function(response) {
			return response.json();
		})
			.then(function(data) {
				
			const imgList = data;
			let imgTemplate = ''; 
			imgList.forEach(function(item){
	
			imgTemplate +=
				`<figure>
				<a href="${item.id}">
				<img src="https://picsum.photos/id/${item.id}/200" alt="${item.title}">
				</a>
				<figcaption> ${item.title}!</figcaption>
				</figure>`;
			});
			// Add Image To HTML Tag
			img.innerHTML = imgTemplate;
		});

// * *********** Hamburger ********** *
navbar.addEventListener('click', function() {
	if (mytopnav.className === 'topnav') {
		mytopnav.className += ' responsive';
	} else {
		mytopnav.className = 'topnav';
	}
});

//  ****** Password confirmation Validation *****

enter.addEventListener('click', () => {
	if (pwd.value != cpwd.value) {
		alert('password does not match');
		window.open('/signup', '_blank');
	} else window.open('../index.html', '_blank');
});