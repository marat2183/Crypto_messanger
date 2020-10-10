// const Accounts = require('web3-eth-accounts');
// const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1")
function validate_account(password, acc_data) {
    let valid = web3.eth.accounts.decrypt(acc_data, password);
    console.log(valid);
}

function create_account(password) {
    let first = web3.eth.accounts.create(['2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567']);
    let acc = web3.eth.accounts.encrypt(first['privateKey'], password);
    let check = validate_account(password, acc);
    if (check = first['privateKey']){
        console.log('good');
    }
    else{
        console.log('bad');
    }

    let itog = JSON.stringify(acc);
    console.log(typeof itog)
}
create_account('qwerty');

