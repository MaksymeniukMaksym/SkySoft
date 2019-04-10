function first(){

    /* call stack:
    "first"
        |
        V
    "second"
        |
        V
    "third"
        |
        V
    "fourth"
*/
    console.log("first");
};

function fourth(){
/* call stack:
    third()
        |
        V
    "fourth"
*/
    third();
    console.log("fourth");
};

function second(){

    /* call stack:
    first()
        |
        V
    "second"
        |
        V
    "third"
        |
        V
    "fourth"
*/
    first();
    console.log("second");
};

fourth();

function third(){

/* call stack:
    second()
        |
        V
    "third"
        |
        V
    "fourth"
*/
    second();
    console.log("third");
};



