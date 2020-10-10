$(document).ready(function () {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
    function validate_account(password, acc_data) {
        let valid = web3.eth.accounts.decrypt(acc_data, password);
        return valid;
    }
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
                let div = document.createElement('div');
                div.className = "keys";
                div.innerHTML = "<p>Ваш адрес</p>" + "\n" + "<p id='text'>" + valid.address + "</p>";
                let info = '<p>' + valid.privateKey + '</p>'
                console.log(valid.address)
                console.log(valid.privateKey)
                info_block = document.querySelector("#dialogs-list")
                info_block.append(div);
                // $('#myKey').html(info)

            } catch {
                console.log('Ошибка')
                key_valid = false;
            }
        })
    })
})