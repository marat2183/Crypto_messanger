$(document).ready(function () {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
    let currentLocation = window.location.href.toString().split(window.location.host)[1];
    function financialMfil(numMfil) {
        return Number.parseFloat(numMfil / 1e7).toFixed(7);
    }
    var error_reciever = false;
    var error_pr_key = false;
    var error_amount = false;
    const pattern = /^[a-fA-F0-9x]*$/
    function copyToClipboard(text) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
    }
    $('#re_address').keyup(function () {
        check_re_address();
    });
    $('#private_key').keyup(function () {
        check_private_key();
    });
    $('#amount').keyup(function () {
        check_amount();
    });
    function check_re_address() {
        let re_addr = $('#re_address').val();
        console.log(re_addr);
        if (pattern.test(re_addr) && re_addr.length === 42){
            $("#re_address_form_invalid").hide();
            $("#re_address").css("border-bottom","2px solid #34F458");
        }
        else if (re_addr === ''){
            if ($("div").is("#re_address_form_invalid")){
                $("#re_address_form_invalid").text("Это поле обязательно для заполнения");
                $("#re_address_form_invalid").show()
                $("#re_address").css("border-bottom","2px solid #F90A0A");
                error_reciever = true;
            }
            else {
                $('#re_address').after("<div id='re_address_form_invalid'></div>");
                $("#re_address_form_invalid").html("Это поле обязательно для заполнения");
                $("#re_address_form_invalid").show();
                $("#re_address").css("border-bottom","2px solid #F90A0A");
                error_reciever = true;
            }
        }
        else if (pattern.test(re_addr) && re_addr.length !== 42){
            if ($("div").is("#re_address_form_invalid")){
                $("#re_address_form_invalid").text("Длина ключа должна быть 42 символа");
                $("#re_address_form_invalid").show()
                $("#re_address").css("border-bottom","2px solid #F90A0A");
                error_reciever = true;
            }
            else {
                $('#re_address').after("<div id='re_address_form_invalid'></div>");
                $("#re_address_form_invalid").html("Длина ключа должна быть 42 символа");
                $("#re_address_form_invalid").show();
                $("#re_address").css("border-bottom","2px solid #F90A0A");
                error_reciever = true;
            }

        }

        else{
            if ($("div").is("#re_address_form_invalid")){
                $("#re_address_form_invalid").text("Присутствуют недопустимые символы");
                $("#re_address_form_invalid").show();
                $("#re_address").css("border-bottom","2px solid #F90A0A");
                error_reciever = true;
            }
            else{
                $('#re_address').after("<div id='re_address_form_invalid'></div>");
                $("#re_address_form_invalid").html("Присутствуют недопустимые символы");
                $("#re_address_form_invalid").show();
                $("#re_address").css("border-bottom","2px solid #F90A0A");
                error_reciever = true;
            }

        }

    }
    function check_private_key() {
        let private_key = $('#private_key').val();
        console.log(private_key);
        if (pattern.test(private_key) && private_key.length === 64){
            $("#pr_key_form_invalid").hide();
            $("#private_key").css("border-bottom","2px solid #34F458");
        }
        else if (private_key === ''){
            if ($("div").is("#pr_key_form_invalid")){
                $("#pr_key_form_invalid").text("Это поле обязательно для заполнения");
                $("#pr_key_form_invalid").show()
                $("#private_key").css("border-bottom","2px solid #F90A0A");
                error_pr_key = true;
            }
            else {
                $('#private_key').after("<div id='pr_key_form_invalid'></div>");
                $("#pr_key_form_invalid").html("Это поле обязательно для заполнения");
                $("#pr_key_form_invalid").show();
                $("#private_key").css("border-bottom","2px solid #F90A0A");
                error_pr_key = true;
            }
        }
        else if (pattern.test(private_key) && private_key.length !== 64){
            if ($("div").is("#pr_key_form_invalid")){
                $("#pr_key_form_invalid").text("Длина ключа должна быть 64 символа");
                $("#pr_key_form_invalid").show()
                $("#private_key").css("border-bottom","2px solid #F90A0A");
                error_pr_key = true;
            }
            else {
                $('#private_key').after("<div id='pr_key_form_invalid'></div>");
                $("#pr_key_form_invalid").html("Длина ключа должна быть 64 символа");
                $("#pr_key_form_invalid").show();
                $("#private_key").css("border-bottom","2px solid #F90A0A");
                error_pr_key = true;
            }

        }

        else{
            if ($("div").is("#pr_key_form_invalid")){
                $("#pr_key_form_invalid").text("Присутствуют недопустимые символы");
                $("#pr_key_form_invalid").show();
                $("#private_key").css("border-bottom","2px solid #F90A0A");
                error_pr_key = true;
            }
            else{
                $('#private_key').after("<div id='pr_key_form_invalid'></div>");
                $("#pr_key_form_invalid").html("Присутствуют недопустимые символы");
                $("#pr_key_form_invalid").show();
                $("#private_key").css("border-bottom","2px solid #F90A0A");
                error_pr_key = true;
            }

        }

    }
    function check_amount() {
        let amount = $('#amount').val();
        console.log(private_key);
        if (amount > 0){
            $("#amount_form_invalid").hide();
            $("#amount").css("border-bottom","2px solid #34F458");
        }
        else if (amount === ''){
            if ($("div").is("#amount_form_invalid")){
                $("#amount_form_invalid").text("Это поле обязательно для заполнения");
                $("#amount_form_invalid").show()
                $("#amount").css("border-bottom","2px solid #F90A0A");
                error_amount = true;
            }
            else {
                $('#amount').after("<div id='amount_form_invalid'></div>");
                $("#amount_form_invalid").html("Это поле обязательно для заполнения");
                $("#amount_form_invalid").show();
                $("#amount").css("border-bottom","2px solid #F90A0A");
                error_amount = true;
            }
        }
        else {
            if ($("div").is("#amount_form_invalid")){
                $("#amount_form_invalid").text("Некорректная сумма");
                $("#amount_form_invalid").show()
                $("#amount").css("border-bottom","2px solid #F90A0A");
                error_amount = true;
            }
            else {
                $('#amount').after("<div id='amount_form_invalid'></div>");
                $("#amount_form_invalid").html("Некорректная сумма");
                $("#amount_form_invalid").show();
                $("#amount").css("border-bottom","2px solid #F90A0A");
                error_amount = true;
            }
        }
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

    $('.clip_btn').on('click', function (event) {
        event.preventDefault();
        console.log('Ryj');
        $('.clip_btn').children('img').attr({'src': '../static/images/copy%20(1).svg'});
        setTimeout(function () {
            $('.clip_btn').children('img').attr({'src': '../static/images/copy.svg'});
        },350);
        copyToClipboard($('#se_address').val());
    })
    function updateBalance() {
         $.ajax({
            type: "POST",
            url: currentLocation,
            dataType: 'json',
            data: {balance_info: 'get_user_address'},
            success: function (data) {
                updateBal(data.address)
            }
        });
    }
    const transfer_coin = async (sender, reciever, amount, pr_key) => {
    console.log(`web3 version: ${web3.version}`)
    let myAddress = sender;
    let destAddress = reciever;
    let transferAmount = amount ;
    let count = await web3.eth.getTransactionCount(myAddress);
    console.log(`num transactions so far: ${count}`);
    let abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
    let contractAddress = "0x7cb53602e6407c9126c3261a26a55004d0398606";
    let contract = new web3.eth.Contract(abiArray, contractAddress, {
        from: myAddress
    });
    let balance = await contract.methods.balanceOf(myAddress).call();
    console.log(`Balance before send: ${financialMfil(balance)} MFIL\n------------------------`);
    console.log('Баланс', Math.round(web3.utils.fromWei(balance), 'ether'))
    let gasPriceGwei = 4;
    let gasLimit = 300000;
    let chainId = 0x3;
    let rawTransaction = {
        "from": myAddress,
        "nonce": "0x" + count.toString(16),
        "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
        "gasLimit": web3.utils.toHex(gasLimit),
        "to": contractAddress,
        "value": "0x0",
        "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
        "chainId": chainId
    };
    console.log(`Raw of Transaction: \n${JSON.stringify(rawTransaction, null, '\t')}\n------------------------`);
    const privateKey = new ethereumjs.Buffer.Buffer.from(pr_key, 'hex');
    const tx = new ethereumjs.Tx(rawTransaction, {chain:'ropsten'});
    tx.sign(privateKey);
    let serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .on('receipt', console.log);
    balance = await contract.methods.balanceOf(myAddress).call();
    console.log(`Balance after send: ${financialMfil(balance)} `);
    }
    $('#transfer').click(function (event) {
        event.preventDefault();
        error_reciever = false;
        error_pr_key = false;
        error_amount = false;
        check_re_address();
        check_private_key();
        check_amount();
        if (error_reciever === false && error_pr_key === false && error_amount ===false) {
            let sender_adr = String($('#se_address').val())
            let reciever = String($('#re_address').val())
            let pr_key = String($('#private_key').val())
            let amount = String($('#amount').val() * (10 ** 7))
            let sender = sender_adr
            console.log(typeof reciever)
            try {
                transfer_coin(sender, reciever, amount, pr_key)
                console.log('Все ок')
            } catch {
                conosle.log('Ошибка')
            }
        }
    })
    window.setInterval(updateBalance,5000)

})
