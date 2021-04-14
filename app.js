'use strict';
// let
let imagesElement = document.getElementById('images');
let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

let maxAttempts = 25;
let userAttempsCounter = 0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

let namesArr = [];
let votesArr = [];
let shownArr = [];

let imgArr =[];
// constructer function
function Mall(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    Mall.allProducts.push(this);
    namesArr.push(this.name);
}
Mall.allProducts = [];
// instancess //adding all product imgs
new Mall('bag', 'images/bag.jpg');
new Mall('banana', 'images/banana.jpg');
new Mall('bathroom', 'images/bathroom.jpg');
new Mall('boots', 'images/boots.jpg');
new Mall('breakfast', 'images/breakfast.jpg');
new Mall('bubblegum', 'images/bubblegum.jpg');
new Mall('chair', 'images/chair.jpg');
new Mall('cthulhu', 'images/cthulhu.jpg');
new Mall('dog-duck', 'images/dog-duck.jpg');
new Mall('dragon', 'images/dragon.jpg');
new Mall('pen', 'images/pen.jpg');
new Mall('pet-sweep', 'images/pet-sweep.jpg');
new Mall('scissors', 'images/scissors.jpg');
new Mall('shark', 'images/shark.jpg');
new Mall('sweep', 'images/sweep.png');
new Mall('tauntaun', 'images/tauntaun.jpg');
new Mall('unicorn', 'images/unicorn.jpg');
new Mall('usb', 'images/usb.gif');
new Mall('water-can', 'images/water-can.jpg');
new Mall('wine-glass', 'images/wine-glass.jpg');

//function for a random number
function generateRandomIndex() {
    return Math.floor(Math.random() * Mall.allProducts.length);
}
//function for three imgs
function renderThreeImages() {
    leftImageIndex = generateRandomIndex();
    middleImageIndex = generateRandomIndex();
    rightImageIndex = generateRandomIndex();
    while (leftImageIndex === rightImageIndex || middleImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || imgArr.includes(leftImageIndex) || imgArr.includes(middleImageIndex)|| imgArr.includes(rightImageIndex)){
        leftImageIndex = generateRandomIndex();
        middleImageIndex = generateRandomIndex();
        rightImageIndex = generateRandomIndex();
    }

  imgArr=[leftImageIndex,middleImageIndex,rightImageIndex];
    leftImageElement.src = Mall.allProducts[leftImageIndex].source;
    middleImageElement.src = Mall.allProducts[middleImageIndex].source;
    rightImageElement.src = Mall.allProducts[rightImageIndex].source;

    Mall.allProducts[leftImageIndex].shown++;
    Mall.allProducts[middleImageIndex].shown++;
    Mall.allProducts[rightImageIndex].shown++;
}
renderThreeImages();

// handle clicking
imagesElement.addEventListener('click', handleUserClick);
function handleUserClick(event) {
    userAttempsCounter++;
    if (userAttempsCounter <= maxAttempts) {
        if (event.target.id === 'left-image') {
            Mall.allProducts[leftImageIndex].votes++;
        } else if (event.target.id === 'middle-image') {
            Mall.allProducts[middleImageIndex].votes++;
        } else if (event.target.id === 'right-image') {
            Mall.allProducts[rightImageIndex].votes++;
        } else {
            alert('please click on the images');
            userAttemptsCounter--;
        }
        renderThreeImages();
    } else {
        let resultButton = document.getElementById('Results-Button');
        resultButton.addEventListener('click', handleList);
        function handleList() {
            let list = document.getElementById('results-list');
            let btn = document.createElement('button');
            btn.innerHTML = "";
            document.body.appendChild(btn);
            for (let i = 0; i < Mall.allProducts.length; i++) {
                let mallResult = document.createElement('li');
                list.appendChild(mallResult);
                mallResult.textContent = `${Mall.allProducts[i].name} 
                has ${Mall.allProducts[i].votes} votes with ${Mall.allProducts[i].shown}shows`
                votesArr.push(Mall.allProducts[i].votes);
                shownArr.push(Mall.allProducts[i].shown);
                console.log('hi from console ',Mall.allProducts[i].shown);
            }
            resultButton.removeEventListener('click', handleList);
            chart();
            resultButton.hidden=false;
        }
        imagesElement.removeEventListener('click', handleUserClick);
        
    }
}


// chart.js
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // what type is the chart
        type: 'bar',        //  the data for showing
        data: {
            //  for the names
            labels: namesArr,
            datasets: [
                {
                    label: 'Products vote',
                    data: votesArr,
                    backgroundColor: [
                        'rgb(251, 93, 76)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Products shown',
                    data: shownArr,
                    backgroundColor: [
                        'gray',
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {}
    });
}
console.log(votesArr);
console.log(namesArr);