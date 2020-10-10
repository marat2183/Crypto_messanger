$(document).ready(function () {
    const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
    function financialMfil(numMfil) {
        return Number.parseFloat(numMfil / 1e7).toFixed(7);
    }
    let currentLocation = window.location.href.toString().split(window.location.host)[1];
    function load_message () {
        // $('#dialogs-list').css({"visibility": "hidden", "background-color": "#e9e9e9"});
        $.ajax({
            type: "POST",
            url: currentLocation,
            dataType: 'html',
            data: {to_do: 'load_messages'},
            success: function (code) {

                    if (code !== $('#dialogs-list').html()) {
                        // $('#dialog').remove();
                        let old = $('#dialogs-list').html().replace('\n', '');
                        let new_mes = code.replace('\n', '');
                        console.log(new_mes.replace(old, ''));
                        $('#dialogs-list').html(code);
                        $("#dialogs-list").scrollTop($("#dialogs-list").prop('scrollHeight'));
                        // $('#dialogs-list').css({"visibility": "visible"});
                        // $("#dialogs-list").scrollTop($("#dialogs-list")).prop('scrollHeight').animate({duration : 370, easing: "linear"});
                    }
                    // $('#dialogs-list').css({"visibility": "visible","background-color": "#e9e9e9"});
                    console.log('ok')
                }


        });
        updateBalance()
    }
    load_message();
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
        console.log('cool')
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
    $('#area').keypress(function (e) {
      if (e.which == 13) {
        $('#send_message').click();
        return false;    //<---- Add this line
      }
    });
    $('#send_message').click(function (event) {
        event.preventDefault();
        let currentLocation = window.location.href.toString().split(window.location.host)[1];
        let did = currentLocation.split('=')[1]
        console.log('start')
        console.log(currentLocation)
        let text = $('#area').val();
        if (text === ''){
            load_message();
        }

        else
        {
            $.ajax({
                type: "POST",
                url: currentLocation,
                dataType: 'json',
                data: {message_content: text, csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()},
                success: function (data) {
                    if (data.message == 'ok') {
                        console.log(data.message)
                        // document.location.href = currentLocation;
                        $('#area').val('')
                        load_message();
                    } else {
                        load_message();
                    }
                }
            });
        }
    });
    window.setInterval(load_message,5000)
});