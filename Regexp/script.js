//<схема>:[//[<логин>[:<пароль>]@]<хост>[:<порт>]][/<URL‐путь>][?<параметры>][#<якорь>]
//"https://Maks:3226@Maks.ru:27000/papka/next?параметр_1=значение_1&параметр_2=значение_2#_URl_";
const check_url = (() => {
    const input = document.getElementById("link");
    return () => {
            url = input.value,
            text = '',
            tmp = null;

            let regexp = /(?:([^\:]*)\:\/\/)?(?:([^\:\@]*)(?:\:([^\@]*))?\@)?(?:([^\/\:]*)\.(?=[^\.\/\:]*\.[^\.\/\:]*))?([^\.\/\:]*)(?:\.([^\/\.\:]*))?(?:\:([0-9]*))?(\/[^\?#]*(?=.*?\/)\/)?([^\?#]*)?(?:\?([^#]*))?(?:#(.*))?/;
                tmp = url.match(regexp);
    
                let name = {      
                    URL: tmp[0],
                    Protocol: tmp[1],
                    Login: tmp[2],
                    Password: tmp[3],
                    Host: (tmp[4] !== undefined ? (tmp[4]+'.'):'')+(tmp[5] !== undefined ? (tmp[5]):'')+(tmp[6] !== undefined ? ('.'+tmp[6]):''),
                    Port: tmp[7],    
                    Query: tmp[10],
                }            
            
                Object.keys(name).forEach(key => {
                     
                          text += name[key] !== undefined ? (` ${key} : ${name[key]} <br/>`) : '' ;
                     
                        });
        elem.innerHTML = name.Protocol !== undefined ? text : 'Please enter the valid url';
    }
})();
//Windows: C:\games\The Witcher 3\Wild Hunt.exe
//Linux: /home/user/docs/Letter.txt
// ToDo
// const check_folder = (() => {
//     const input = document.getElementById("file");
//     return () => {
//             file_way = input.value,
//             text = '',
//             tmp = null;

//             let regexp = / /;
    
//                 text = '',
//                 tmp = null;
//                 tmp = file_way.match(regexp);
    
//                 let name = {      
            
//                 }            
            
//                 Object.keys(name).forEach(key => { text += (key + ":"+name[key] + "<br/>") });
//         folder.innerHTML = name.Foo !== undefined ? text : 'Please enter the valid url';
//     }
// })();