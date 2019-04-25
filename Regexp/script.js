
const check_link = (() => {
    const input = document.getElementById("link");
    return () => {
        let regexp = {
            Password: /:\w*(?=@)/,
            Login: /\w*@/,
            Port: /\:+\d+/,
            Protocol: /\b\w*:\/\//,
            Host: /\b\w*\.\w*(\.\w*)?/
        },
            url = input.value,
            text = '',
            tmp = null;

        for (let key in regexp) {
            tmp = url.match(regexp[key]);
            if (tmp !== null) {
                tmp = tmp[0];
                url = url.replace(tmp, '');
                tmp = tmp.replace(/:|@/,'');
                text += `${key}: ${tmp}<br/>`;
            }
        }
        elem.innerHTML = text || 'Please enter the valid url';
    }
})();
