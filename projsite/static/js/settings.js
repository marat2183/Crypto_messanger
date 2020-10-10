$(document).ready(function () {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
        function financialMfil(numMfil) {
        return Number.parseFloat(numMfil / 1e7).toFixed(7);
    }
    function copyToClipboard(text) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
    }
    const updateBal = async (client_address) => {
        let contractAddress = "0x7cb53602e6407c9126c3261a26a55004d0398606";
        const contractABI = [
              {
                "constant":true,
                "inputs":[{"name":"_owner","type":"address"}],
                "name":"balanceOf",
                "outputs":[{"name":"balance","type":"uint256"}],
                "type":"function"
              },
              {
                "constant":true,
                "inputs":[],
                "name":"decimals",
                "outputs":[{"name":"","type":"uint8"}],
                "type":"function"
              }
            ];
        let contract = new web3.eth.Contract(contractABI, contractAddress, {
            from: client_address
        });
        window.user_balance = await contract.methods.balanceOf(client_address).call()
        user_balance = financialMfil(user_balance);
        user_balance = Math.round(user_balance);
        const bal = document.querySelector('#user_balance')
        bal.textContent = user_balance
    }
    function updateBalance() {
         $.ajax({
            type: "POST",
            url: '/transfer/',
            dataType: 'json',
            data: {balance_info: 'get_user_address'},
            success: function (data) {
                updateBal(data.address)
            }
        });
    }
    function validate_account(password, acc_data) {
        let valid = web3.eth.accounts.decrypt(acc_data, password);
        return valid;
    }
    $('#load_image').click(function (event) {
       event.preventDefault();
            var fd = new FormData();
            var files = $('#image_file')[0].files[0];
            fd.append('file',files);
            fd.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val())
           $.ajax({
               url: '/settings/',
               data: fd,
               processData: false,
               contentType: false,
               type: 'POST',
               success: function (data) {
                   if (data.info == 'ok'){
                       document.location.href = '/settings'
                   }
               }
           });
    });
    $('#get_key').click(function (event) {
        event.preventDefault()
        let password = $('#file_pass').val()
        let fileData = $('#key_file').prop('files')[0].text()
        event.preventDefault()
        fileData.then((value) => {
            let temp_result = value;
            let result = JSON.parse(temp_result);
            user_address = result.address
            user_address = user_address.substr(0, 32);
            var key_valid;
            try {
                let valid = validate_account(password, result);
                console.log('valid')
                console.log(valid.privateKey.slice(2))
                copyToClipboard(valid.privateKey.slice(2));
                console.log('Все ок ')
                $("#myKey").html("Ваш приватный ключ сопирован в буфер обмена!");
                $("#myKey").show().fadeIn( 300 ).delay(3000).fadeOut( 400 );
            } catch {
                console.log('Ошибка')
                key_valid = false;
                $("#dialogs-list").append('<div id="valid_key_error" class="mb-2"></div>')
                $("#valid_key_error").html("Не удалось получить ключ, проверьте введенные данные!");
                $("#valid_key_error").show().fadeIn( 300 ).delay(3000).fadeOut( 400 );
            }
        });
    });
    window.setInterval(updateBalance,5000)
});