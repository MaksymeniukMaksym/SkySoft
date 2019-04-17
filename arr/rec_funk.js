(function(){
    var arr = [
        1,
        [10, 11, 22, 2],
        [40, 1, 2, 3],
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
    function flatDeep(arr) {
        return arr.reduce((flattenArray, element) => {
          return Array.isArray(element) ? [...flattenArray, ...flatDeep(element)] : [...flattenArray, element]
        }, [])
       }
       arr = flatDeep(arr);

    var style = function(i){
      if (i >= arr.length) return;
      if (arr[i].length < 2) return style(i + 1);
        else {
           
            

            
            //2
            arr[i] = arr[i] % 10;
            
             
            if (arr[i] === 0) {
                //3
                arr.splice(i, 1, 5 ,5);
                return style(i + 1); 
            } else {
                //2
                arr[i] = arr[i] % 10;
                return style(i + 1);
            }
        }
    }
    style(0);
    //4
    arr = arr.join('-');
    console.log(arr);
    })();