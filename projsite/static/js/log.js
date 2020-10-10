$(document).ready(function () {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
    const pattern = /^[a-zA-Z0-9_]*$/;
     var error_login = false;
     var error_password = false;
     var error_file = false;

     $("#login").focusout(function(){
        check_login();
     });
     $("#password").focusout(function() {
        check_password();
     });
     $("#key").change(function() {
         check_file()
     });

     function check_login() {
        let login = $("#login").val();
        if (pattern.test(login) && login !== '' && login.length >= 5 && login.length < 25) {
           $("#login_form_invalid").hide();
           $("#login").css("border-bottom","2px solid #34F458");
        }
        else if (login === ''){
            if ($("div").is("#login_form_invalid")){
                $("#login_form_invalid").text("Это поле озятельно для заполнения");
                $("#login_form_invalid").show()
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            else {
                $("#login_row").append("<div id='login_form_invalid'></div>");
                $("#login_form_invalid").html("Это поле озятельно для заполнения");
                $("#login_form_invalid").show();
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            // $("#login_row").append("<div id='login_form_invalid'></div>");
            // $("#login_form_invalid").html("Это поле озятельно для заполнения");
            // $("#login_form_invalid").show();
            // $("#login").css("border-bottom","2px solid #F90A0A");
            // error_login = true;
        }
        else if (pattern.test(login) && login !== '' && login.length < 5){
            if ($("div").is("#login_form_invalid")){
                $("#login_form_invalid").text("Логин содержит менее 5 символов");
                $("#login_form_invalid").show()
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            else{
                $("#login_row").append("<div id='login_form_invalid'></div>");
                $("#login_form_invalid").html("Логин содержит менее 5 символов");
                $("#login_form_invalid").show();
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            // $("#login_row").append("<div id='login_form_invalid'></div>");
            // $("#login_form_invalid").html("Логин содержит менее 5 символов");
            // $("#login_form_invalid").show();
            // $("#login").css("border-bottom","2px solid #F90A0A");
            // error_login = true;
        }
        else if (pattern.test(login) && login !== '' && login.length >= 25){
            if ($("div").is("#login_form_invalid")){
                $("#login_form_invalid").text("Логин содержит больше 24 символов");
                $("#login_form_invalid").show()
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            else{
                $("#login_row").append("<div id='login_form_invalid'></div>");
                $("#login_form_invalid").html("Логин содержит больше 24 символов");
                $("#login_form_invalid").show();
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            // $("#login_row").append("<div id='login_form_invalid'></div>");
            // $("#login_form_invalid").html("Логин содержит больше 24 символов");
            // $("#login_form_invalid").show();
            // $("#login").css("border-bottom","2px solid #F90A0A");
            // error_login = true;
        }
        else {
            if ($("div").is("#login_form_invalid")){
                $("#login_form_invalid").text("Логин содержит недопустимые символы");
                $("#login_form_invalid").show()
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            else{
                $("#login_row").append("<div id='login_form_invalid'></div>");
                $("#login_form_invalid").html("Логин содержит недопустимые символы");
                $("#login_form_invalid").show();
                $("#login").css("border-bottom","2px solid #F90A0A");
                error_login = true;
            }
            // $("#login_row").append("<div id='login_form_invalid'></div>");
            // $("#login_form_invalid").html("Логин содержит недопустимые символы");
            // $("#login_form_invalid").show();
            // $("#login").css("border-bottom","2px solid #F90A0A");
            // error_login = true;
        }
     }

     function check_password() {
        let password_length = $("#password").val().length;
        let password = $("#password").val()
        let retype_password = $("#second_password").val();
        if (password === ''){
            if ($("div").is("#password_form_invalid")){
                $("#password_form_invalid").text("Это поле обязательно для заполнения")
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            else{
                $("#password_row").append("<div id='password_form_invalid'></div>");
                $("#password_form_invalid").html("Это поле обязательно для заполнения");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            // $("#password_row").append("<div id='password_form_invalid'></div>");
            // $("#password_form_invalid").html("Это поле обязательно для заполнения");
            // $("#password_form_invalid").show();
            // $("#password").css("border-bottom","2px solid #F90A0A");
            // error_password = true;
        }
        else if (pattern.test(password) && password !== '' && password_length > 9 && password.length <= 30){
            $("#password_form_invalid").hide();
            $("#password").css("border-bottom","2px solid #34F458");
        }
        else if (pattern.test(password) && password.length < 10) {
            if ($("div").is("#password_form_invalid")){
                $("#password_form_invalid").text("Пароль содержит менее 10 символов");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            else{
                $("#password_row").append("<div id='password_form_invalid'></div>");
                $("#password_form_invalid").html("Пароль содержит менее 10 символов");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            // $("#password_row").append("<div id='password_form_invalid'></div>");
            // $("#password_form_invalid").html("Пароль содержит менее 10 символов");
            // $("#password_form_invalid").show();
            // $("#password").css("border-bottom","2px solid #F90A0A");
            // error_password = true;
        }
        else if (pattern.test(password) && password.length > 30) {
            if ($("div").is("#password_form_invalid")){
                $("#password_form_invalid").text("Пароль содержит более 30 символов");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            else{
                $("#password_row").append("<div id='password_form_invalid'></div>");
                $("#password_form_invalid").html("Пароль содержит более 30 символов");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            // $("#password_row").append("<div id='password_form_invalid'></div>");
            // $("#password_form_invalid").html("Пароль содержит более 30 символов");
            // $("#password_form_invalid").show();
            // $("#password").css("border-bottom","2px solid #F90A0A");
            // error_password = true;
        } else {
            if ($("div").is("#password_form_invalid")){
                $("#password_form_invalid").text("Пароль содержит недопустимые символы");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            else {
                $("#password_row").append("<div id='password_form_invalid'></div>");
                $("#password_form_invalid").html("Пароль содержит недопустимые символы");
                $("#password_form_invalid").show();
                $("#password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            // $("#password_row").append("<div id='password_form_invalid'></div>");
            // $("#password_form_invalid").html("Пароль содержит недопустимые символы");
            // $("#password_form_invalid").show();
            // $("#password").css("border-bottom","2px solid #F90A0A");
            // error_password = true;
        }
     }
     function check_file() {
        let filevalue = $('#key').val()
         // console.log(fdata)
         if (filevalue) {
             let fdata = $('#key').prop('files')[0].text()
             fdata.then((value) => {
                 let temp_result = value;
                 if (temp_result.includes('version', 'id', 'address')) {
                     try {
                         let result = JSON.parse(temp_result);
                         console.log(result);
                         if (result.address) {
                             $("#confirm_password_form_invalid").hide();
                             $("#key").css("border-bottom", "2px solid #34F458");
                        }
                     }catch (e) {
                         if (e instanceof SyntaxError) {
                            if ($("div").is("#confirm_password_form_invalid")) {
                                 $("#confirm_password_form_invalid").text("Не верный формат файла или его содержмое");
                                 $("#confirm_password_form_invalid").show();
                                 $("#key").css("border-bottom", "2px solid #F90A0A");
                                 error_file = true;
                            } else {
                                 $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                                 $("#confirm_password_form_invalid").html("Не верный формат файла или его содержмое");
                                 $("#confirm_password_form_invalid").show();
                                 $("#key").css("border-bottom", "2px solid #F90A0A");
                                 error_file = true;
                            }
                         }
                     }
                 }
             });

         }
         else{
            if ($("div").is("#confirm_password_form_invalid")) {
                 $("#confirm_password_form_invalid").text("Это поле обязательно для заполнения");
                 $("#confirm_password_form_invalid").show();
                 $("#password_confirm").css("border-bottom", "2px solid #F90A0A");
                 error_file = true;
            } else {
                 $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                 $("#confirm_password_form_invalid").html("Это поле обязательно для заполнения");
                 $("#confirm_password_form_invalid").show();
                 $("#password_confirm").css("border-bottom", "2px solid #F90A0A");
                 error_file = true;
            }
         }
     }
    function validate_account(password, acc_data) {
        let valid = web3.eth.accounts.decrypt(acc_data, password);
        return valid;
    }
    function cipher(word, key){
        const nonce = nacl.randomBytes(24)
        const secretKey = new ethereumjs.Buffer.Buffer.from(key, 'utf8')
        const secretData = new ethereumjs.Buffer.Buffer.from(word, 'utf8')
        const encrypted = nacl.secretbox(secretData, nonce, secretKey)
        const result = `${ethereumjs.Buffer.Buffer.from(nonce).toString('base64')}:${ethereumjs.Buffer.Buffer.from(encrypted).toString('base64')}`
        return result
    }
    $('#send_data').click(function (event) {
        event.preventDefault();
        console.log('test', $('#key').val());
        error_login = false;
        error_password = false;
        error_file =  false;
        check_login();
        check_password();
        check_file();
        if (error_login === false && error_password === false && error_file === false) {
            let login = $('#login').val();
            let password = $('#password').val();
            let fileData = $('#key').prop('files')[0].text();
            console.log(login);
            console.log(password);
            console.log(fileData);
            fileData.then((value) => {
                let temp_result = value;
                let result = JSON.parse(temp_result);
                console.log(result);
                let user_address = result.address;
                user_address = user_address.substr(0, 32);
                console.log(user_address);
                var key_valid;
                try {
                    let valid = validate_account(password, result);
                    console.log('Приватный ключ', valid.privateKey)
                    if (valid) {
                        console.log('Авторизация прошла успешно')
                        key_valid = true;
                    }
                } catch {
                    $("#send_data").before('<div id="form_invalid" class="mb-2"></div>')
                    $("#form_invalid").html("Неверный логин, пароль или файл для авторизации");
                    $("#form_invalid").show().fadeIn( 300 ).delay(3000).fadeOut( 400 );
                    console.log('Ошибка')
                    key_valid = false;
                }
                if (key_valid) {
                    $.ajax({
                        type: "POST",
                        url: "/login/",
                        dataType: 'json',
                        data: {
                            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                            login: login
                        },
                        success: function (data) {
                            if (data.message == 'ok') {
                                word = data.word
                                message = cipher(word, user_address)
                                console.log('Слово', word)
                                console.log('Ключ', user_address)
                                console.log("Шифр", message)
                                $.ajax({
                                    type: "POST",
                                    url: "/login/",
                                    dataType: "json",
                                    data: {
                                        login: login,
                                        password: password,
                                        key_valid: message,
                                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                                    },
                                    success: function (data) {
                                        if (data.message == 'ok') {
                                            console.log('OK')

                                            document.location.href = '/dialogs';
                                        } else {
                                            $("#send_data").before('<div id="form_invalid" class="mb-2"></div>')
                                            $("#form_invalid").html(`${data.message}`);
                                            $("#form_invalid").show().fadeIn( 300 ).delay(3000).fadeOut( 400 );
                                            console.log('Ошибка авторизации')
                                            // document.location.href = '/login';
                                        }
                                    }

                                });

                            }
                        }
                    });
                } else {
                    // document.location.href = '/login';
                }
            });
        }
        else {
            console.log('bad');
        }
    });
});
