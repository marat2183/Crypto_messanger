$(document).ready(function (event) {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1");
           // $("#login_form_invalid").hide();
         // $("#password_form_invalid").hide();
         // $("#confirm_password_form_invalid").hide();
         // $("#form_invalid").hide()
     const pattern = /^[a-zA-Z0-9_]*$/;
     var error_login = false;
     var error_password = false;
     var error_password_confirm = false;

     $("#login").keyup(function(){
        check_login();
     });
     $("#password").keyup(function() {
        check_password();
     });
     $("#second_password").keyup(function() {
        check_confirm_password();
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
            if (password !== retype_password){
                if ($("div").is("#confirm_password_form_invalid")){
                    $("#confirm_password_form_invalid").text("Пароли не совпадают");
                    $("#confirm_password_form_invalid").show();
                    $("#password_confirm").css("border-bottom","2px solid #F90A0A");
                    error_password_confirm = true;
                }
                else{
                    $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                    $("#confirm_password_form_invalid").html("Пароли не совпадают");
                    $("#confirm_password_form_invalid").show();
                    $("#password_confirm").css("border-bottom","2px solid #F90A0A");
                    error_password_confirm = true;
                }
                // $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                // $("#confirm_password_form_invalid").html("Пароли не совпадают");
                // $("#confirm_password_form_invalid").show();
                // $("#password_confirm").css("border-bottom","2px solid #F90A0A");
                // error_password_confirm = true;
            }
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
     function check_confirm_password() {
        let password = $("#password").val();
        let retype_password = $("#second_password").val();
        if (retype_password === ''){
            if ($("div").is("#confirm_password_form_invalid")){
                $("#confirm_password_form_invalid").text("Это поле обязательно для заполнения");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
                error_password_confirm = true;
            }
            else{
                $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                $("#confirm_password_form_invalid").html("Это поле обязательно для заполнения");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
                error_password_confirm = true;
            }
            // $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
            // $("#confirm_password_form_invalid").html("Это поле обязательно для заполнения");
            // $("#confirm_password_form_invalid").show();
            // $("#second_password").css("border-bottom","2px solid #F90A0A");
            // error_password_confirm = true;
        }
         else if (pattern.test(retype_password) && retype_password.length < 10) {
             if ($("div").is("#confirm_password_form_invalid")){
                 $("#confirm_password_form_invalid").text("Пароль содержит менее 10 символов");
                 $("#confirm_password_form_invalid").show();
                 $("#second_password").css("border-bottom","2px solid #F90A0A");
                 error_password = true;
             }
             else{
                 $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                 $("#confirm_password_form_invalid").html("Пароль содержит менее 10 символов");
                 $("#confirm_password_form_invalid").show();
                 $("#second_password").css("border-bottom","2px solid #F90A0A");
                 error_password = true;
             }
             // $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
             // $("#confirm_password_form_invalid").html("Пароль содержит менее 10 символов");
             // $("#confirm_password_form_invalid").show();
             // $("#second_password").css("border-bottom","2px solid #F90A0A");
             // error_password = true;
        }
        else if (pattern.test(retype_password) && retype_password.length > 30) {
            if ($("div").is("#confirm_password_form_invalid")){
                $("#confirm_password_form_invalid").text("Пароль содержит более 30 символов");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            else{
                $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                $("#confirm_password_form_invalid").html("Пароль содержит более 30 символов");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
                error_password = true;
            }
            // $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
            // $("#confirm_password_form_invalid").html("Пароль содержит более 30 символов");
            // $("#confirm_password_form_invalid").show();
            // $("#second_password").css("border-bottom","2px solid #F90A0A");
            // error_password = true;
        }
        else if (password === retype_password && retype_password !== '' && pattern.test(retype_password) && retype_password.length >= 10 && retype_password.length <= 30) {
           $("#confirm_password_form_invalid").hide();
           $("#second_password").css("border-bottom","2px solid #34F458");
        }
        else if (password !== retype_password && retype_password !== '' && pattern.test(retype_password) && retype_password.length >= 10 && retype_password.length <= 30){
            if ($("div").is("#confirm_password_form_invalid")){
                $("#confirm_password_form_invalid").text("Пароли не совпадают");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
            }
            else{
                $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                $("#confirm_password_form_invalid").html("Пароли не совпадают");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
            }
            // $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
            // $("#confirm_password_form_invalid").html("Пароли не совпадают");
            // $("#confirm_password_form_invalid").show();
            // $("#second_password").css("border-bottom","2px solid #F90A0A");
        }
        else {
            if ($("div").is("#confirm_password_form_invalid")){
                $("#confirm_password_form_invalid").text("Пароль содержит недопустимые символы");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
                error_password_confirm = true;
            }
            else{
                $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
                $("#confirm_password_form_invalid").html("Пароль содержит недопустимые символы");
                $("#confirm_password_form_invalid").show();
                $("#second_password").css("border-bottom","2px solid #F90A0A");
                error_password_confirm = true;
            }
            // $("#password_confirm_row").append("<div id='confirm_password_form_invalid'></div>");
            // $("#confirm_password_form_invalid").html("Пароль содержит недопустимые символы");
            // $("#confirm_password_form_invalid").show();
            // $("#second_password").css("border-bottom","2px solid #F90A0A");
            // error_password_confirm = true;
        }
     }
    function create_account(password) {
        let first = web3.eth.accounts.create(['2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567']);
        let acc = web3.eth.accounts.encrypt(first['privateKey'], password);
        let data_file = {
            address: first.address,
            priv_key: first.privateKey,
            file_to_write: JSON.stringify(acc)
        }
        return data_file
    }

    $('#reg_data_send').click(function (event) {
        event.preventDefault();
        error_login = false;
        error_password = false;
        error_password_confirm =  false;
        check_login();
        check_password();
        check_confirm_password();
        if (error_login === false && error_password === false && error_password_confirm === false){
            login = $('#login').val();
            password = $('#password').val();
            second_password = $('#second_password').val();
            console.log(login);
            console.log(password);
            console.log(second_password);
            data_file = create_account(password);
            // console.log(data.file_to_write);
            console.log(typeof data_file.file_to_write)
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
                data: {login: login, password:password, second_password: second_password, address: data_file.address, csrfmiddlewaretoken: getCookie('csrftoken')},
                success: function (data) {
                    if (data.message == 'ok') {
                        console.log(data_file.address)
                        console.log(data.message);

                        $('#myLink').html('<a id="key_link" href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(data_file.file_to_write) + '"download="text.txt">text.txt</a>');
                        $('#key_link').text(`${login}.txt`);
                        $('#key_link').attr('download', `${login}.txt`);
                        $('#key_link').click(function(event){
                             document.location.href = '/login/';
                        });

                        console.log('Зарегистрирован');
                    }
                    else {
                        console.log('Ошибка');
                        $("#reg_data_send").before('<div id="form_invalid" class="mb-2"></div>')
                        $("#form_invalid").html(`${data.message}`);
                        $("#form_invalid").show().fadeIn( 300 ).delay(3000).fadeOut( 400 );
                        // document.location.href = '/registration/';

                    }
                }
            });
        }else{
            console.log('bad')
            // $("#reg_data_send").before('<div id="form_invalid" class="mb-2"></div>')
            // $("#form_invalid").html("Тестовая валидация");
            // $("#form_invalid").show().delay( 1500 ).fadeOut( 400 );
        }
        // login = $('#login').val();
        // password = $('#password').val();
        // second_password = $('#second_password').val();
        // console.log(login);
        // console.log(password);
        // console.log(second_password);
        // data_file = create_account(password);
        // // console.log(data.file_to_write);
        // console.log(typeof data_file.file_to_write)
        // function getCookie(c_name)
        // {
        //     if (document.cookie.length > 0)
        //     {
        //         c_start = document.cookie.indexOf(c_name + "=");
        //         if (c_start != -1)
        //         {
        //             c_start = c_start + c_name.length + 1;
        //             c_end = document.cookie.indexOf(";", c_start);
        //             if (c_end == -1) c_end = document.cookie.length;
        //             return unescape(document.cookie.substring(c_start,c_end));
        //         }
        //     }
        //     return "";
        //  }
        // $.ajax({
        //     type: "POST",
        //     url: "/registration/",
        //     dataType: 'json',
        //     data: {login: login, password:password, second_password: second_password, address: data_file.address, csrfmiddlewaretoken: getCookie('csrftoken')},
        //     success: function (data) {
        //         if (data.message == 'ok') {
        //             console.log(data_file.address)
        //             console.log(data.message);
        //
        //             $('#myLink').html('<a id="key_link" href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(data_file.file_to_write) + '"download="text.txt">text.txt</a>');
        //             $('#key_link').text(`${login}.txt`);
        //             $('#key_link').attr('download', `${login}.txt`);
        //             $('#key_link').click(function(event){
        //                  document.location.href = '/login/';
        //             });
        //
        //             console.log('Зарегистрирован');
        //         }
        //         else {
        //             console.log('Ошибка');
        //             document.location.href = '/registration/';
        //         }
        //     }
        // });

    });
});