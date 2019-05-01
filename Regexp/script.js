//<схема>:[//[<логин>[:<пароль>]@]<хост>[:<порт>]][/<URL‐путь>][?<параметры>][#<якорь>]
//"https://Maks:3226@Maks.ru:27000/papka/next?параметр_1=значение_1&параметр_2=значение_2#_URl_";
const check_url = (() => {
    const input = document.getElementById("link");
    return () => {
            text = '';

            let regexp = /(?:([^\:]*)\:\/\/)?(?:([^\:\@]*)(?:\:([^\@]*))?\@)?(?:([^\/\:]*)\.(?=[^\.\/\:]*\.[^\.\/\:]*))?([^\.\/\:]*)(?:\.([^\/\.\:]*))?(?:\:([0-9]*))?(\/[^\?#]*(?=.*?\/)\/)?([^\?#]*)?(?:\?([^#]*))?(?:#(.*))?/;
                tmp = input.value.match(regexp);
    
                let name = {      
                    URL: tmp[0],
                    Protocol: tmp[1],
                    Login: tmp[2],
                    Password: tmp[3],
                    Host: (tmp[4] !== undefined ? (tmp[4]+'.'):'')+(tmp[5] !== undefined ? (tmp[5]):'')+(tmp[6] !== undefined ? ('.'+tmp[6]):''),
                    Port: tmp[7],    
                    Query: tmp[10],
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
            const regexp = /^(.+):(\\.*)*\.(.*)$/;
            let result = input.value.match(regexp)[0]; 
	
          
                let disk = result.split(':')[0]; 
                let path = result.split(':')[1].split('.')[0];
                let type = result.split(':')[1].split('.')[1];
                
                folder.innerHTML = `         
                Disk: ${disk} <br/>
                Path: ${path} <br/>
                Type: ${type}`
                
    }
})();