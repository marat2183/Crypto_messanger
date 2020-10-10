$(document).ready(function (event) {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1");

    function create_account(password) {
        let first = web3.eth.accounts.create(['2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567']);
        let acc = web3.eth.accounts.encrypt(first['privateKey'], password);
        let data = {
            address: first.address,
            priv_key: first.privateKey,
            file_to_write: JSON.stringify(acc)
        }
        return data
    }

    $('#reg_data_send').click(function (event) {
        event.preventDefault();
        login = $('#login').val();
        password = $('#password').val();
        second_password = $('#second_password').val();
        console.log(login);
        console.log(password);
        console.log(second_password);
        data = create_account(password);
        // console.log(data.file_to_write);
        console.log(typeof data.file_to_write)
        function getCookie(c_name)
        {
            if (document.cookie.length > 0)
            {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1)
                {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start,c_end));
                }
            }
            return "";
         }
        $.ajax({
            type: "POST",
            url: "/registration/",
            dataType: 'json',
            data: {login: login, password:password, second_password: second_password, csrfmiddlewaretoken: getCookie('csrftoken')},
            success: function (data) {
                if (data.message == 'ok') {
                    console.log(data.message);
                    console.log(data.file_to_write)
                    $('#myLink').html('<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(data.file_to_write) + '" download="text.txt">text.txt</a>');
                    $('#a').click(function(event){
                         document.location.href = '/login/';
                    });

                    console.log('Зарегистрирован');
                }
                else {
                    console.log('Ошибка');
                    document.location.href = '/registration/';
                }
            }
        });

    });
});