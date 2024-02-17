const cat_btn = document.getElementById('cat_btn');
const dog_btn = document.getElementById('dog_btn');
const cat_result = document.getElementById('cat_result');
const dog_result = document.getElementById('dog_result');


dog_btn.addEventListener('click', getRandomDog);
function getRandomDog() {
    fetch('https://random.dog/woof.json')
        .then(res => res.json())
        .then(data => {
            if (data.url.includes('.mp4')) {
                getRandomDog();
            }
            else {
                dog_result.innerHTML = `<img src=${data.url} alt="dog" />`;
            }
        });
}
