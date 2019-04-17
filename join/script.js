var arr = [1,2,3,[4,5,6]];

Array.prototype.join = function(str)  {
            
            let tmp = [""];

            for(let i = 0; i < this.length; i++){

                if(this[i][0] == undefined){

                    if(i != 0){

                        tmp[0] += str + this[i];
                    }else tmp[0] += this[i];

                }else for(let j = 0; this[i][j] != undefined ;j++){

                    tmp[0] += str + this[i][j] ;
                }
    
               
            }
            
            return tmp;                 
                };


console.log(arr.join('-')); 