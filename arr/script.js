var arr = [
	1,[10, 11, 22, 2],[40, 1, 2, 3],
  3,
  [],
  4,
  5,
  [
  	[40, 1, 2, 3],
  	[
    2, 
    3, 
    [40, 1, 2, 3]
    ],
  ],
  7,
  8
];


// Є вхідний массив arr, який включає в себе числа, або вкладені масиви.
// 1. Потрібно розоргнути масив в одномірний ( [1,[2,3],[4, 5]] => [1,2,3,4,5])
// 2. В числах які >10 залиш лише останній розряд.
// 3. Всі елементи з значенням - 0 заміни на два елементи які в сумі дають 10 (8 і 2). ( [1,0,2] => [1,3,7,2])
// 4. Перетвори масив в стрічку в якій елементи розділені через "-". ( [1,2,3,]  => "1-2-3")


//1
arr = arr.toString().split(',');            
for (let i = 0; i < arr.length; i++) {      
   
  arr[i] = +arr[i];
    
  //2
  if(arr[i] >= 10){

    arr[i] = arr[i] % 10;
  }

  //3
  if (arr[i] == 0){    
    arr.splice(i, 1, 2, 8);
   
  }
}

//4
arr = arr.join('-');
console.log(arr);