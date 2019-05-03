//<схема>:[//[<логин>[:<пароль>]@]<хост>[:<порт>]][/<URL‐путь>][?<параметры>][#<якорь>]
//"https://Maks:3226@Maks.ru:27000/papka/next?параметр_1=значение_1&параметр_2=значение_2#_URl_";
const check_url = (() => {
    const input = document.getElementById("link");
    return () => {
            text = '';

            let regexp = /(?:([^\:]*)\:\/\/)?(?:([^\:\@]*)(?:\:([^\@]*))?\@)?(?:([^\/\:]*)\.(?=[^\.\/\:]*\.[^\.\/\:]*))?([^\.\/\:]*)(?:\.([^\/\.\:]*))?(?:\:([0-9]*))?(\/[^\?#]*(?=.*?\/)\/)?([^\?#]*)?(?:\?([^#]*))?(?:#(.*))?/;
                data = input.value.match(regexp);
    
                let name = {      
                    URL: data[0],
                    Protocol: data[1],
                    Login: data[2],
                    Password: data[3],
                    Host: (data[4] !== undefined ? (data[4]+'.'):'')+(data[5] !== undefined ? (data[5]):'')+(data[6] !== undefined ? ('.'+data[6]):''),
                    Port: data[7],    
                    Query: data[10],
                };      
            
                Object.keys(name).forEach(key => {
                     
                          text += (name[key] !== undefined) ? (` ${key} : ${name[key]} <br/>`) : '' ;
                     
                        });
        elem.innerHTML = ((name.Protocol !== undefined)&&(name.Host !== '') )? text : 'Please enter the valid url';
    }
})();
//Windows: c:\folder\myfile.txt
//Linux: /home/user/docs/Letter.txt
const check_folder = (() => {
    const input = document.getElementById("file");
    return () => {
    //^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$  - Windows
    //^(\/.*\/)(\w*)(.\w*) -Linux
            const regexp = /(^(?:)[a-zA-Z])\:(\\(?:[\w]+\\)*)(\w[\w.]+)|^(\/.*\/)(\w*)(.\w*)/i;
            let result = input.value.match(regexp); 
                console.log(result);
                
                if(result != null){
                    if(result[1] !== undefined){
                               
                let name = result[3].split('.');
                let type = result[3].replace(name[0],'').replace(/^\./,'');
                
                folder.innerHTML = `         
                Disk: ${result[1]} <br/>
                Path: ${result[2]} <br/>
                Name: ${name[0]} <br/>
                Type: ${type}`
                    }else
                     folder.innerHTML = `         
                    Path: ${result[4]} <br/>
                    File: ${result[5]} <br/>
                    Type: ${result[6].replace('.','')}`;
                } else folder.innerHTML = 'Invalid file path';
    }
    
})();