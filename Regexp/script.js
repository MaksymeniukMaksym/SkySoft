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
//Windows: C:\games\TheWitcher3\WildHunt.exe
//Linux: /home/user/docs/Letter.txt
const check_folder = (() => {
    const input = document.getElementById("file");
    return () => {
            const regexp = /^(.+):(\\.*)*\.(.*)$/i;
            let result = input.value.match(regexp); 
                console.log(result);
                if(result != null){
                              
                let disk = result[0].split(':')[0]; 
                let path = result[0].split(':')[1].split('.')[0];
                let type = result[0].split(':')[1].split('.')[1];
                
                folder.innerHTML = `         
                Disk: ${disk} <br/>
                Path: ${path} <br/>
                Type: ${type}`
                } else folder.innerHTML = 'Invalid file path';
    }
})();