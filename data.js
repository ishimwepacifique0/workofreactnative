//  create function which it will return string and check 
// if that string is not number and check if it contain one of alphabetic characters letter
// and check the length of the string is to 8
// it should return true all condition being satisfied and make sure 
//  you use module


function fetchData(){
    fetch('https://jsonplaceholder.typicode.com/posts')
 .then(response => response.json())
 .then(d=>console.log(d))
 .catch(err => console.log(err))
}


fetchData()

