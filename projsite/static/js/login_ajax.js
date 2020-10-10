$(document).ready(function () {
   const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
    function validate_account(password, acc_data) {
        let valid = web3.eth.accounts.decrypt(acc_data, password);
        return valid;
    }
    $('#send_data').click(function (event) {
        event.preventDefault();
        let login = $('#login').val();
        let password = $('#password').val();
        let fileData = $('#key').prop('files')[0].text();
        console.log(login);
        console.log(password);
        console.log(fileData)
        fileData.then((value) => {
            let temp_result = value;
            let result = JSON.parse(temp_result);
            console.log(result);
            try{
                let valid = validate_account(password,result);
                if (valid){
                    console.log('Авторизация прошла успешно')
                    var key_valid = true;
                }
            }
            catch{
                console.log('Ошибка')
                var key_valid = false;
            }
        $.ajax({
            type: "POST",
            url: "/login/",
            dataType: 'json',
            data: {login: login, password:password, key_valid: key_valid, csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
            success: function (data) {
                if (data.message == 'ok') {
                    // document.location.href = '/dialogs';
                }
                else
                {
                    document.location.href = '/login';
                }
            }
        });
            }
        );
    });
});