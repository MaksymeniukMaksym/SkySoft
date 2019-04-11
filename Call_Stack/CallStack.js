function printCallStack(){

    // let stack = new Error().stack;
    // console.log( stack );

    //first
    // console.trace();

  
    //second
    let obj = {};
    Error.captureStackTrace(obj, printCallStack);
    console.log(obj.stack);


}

(function a() {
	(function b() {
		(function c() {
			printCallStack();
		})();
	})();
})();

(function() {
	(function d() {
		(function e() {
			printCallStack();
		})();
	})();
})();

(function a() {
			printCallStack();
})();