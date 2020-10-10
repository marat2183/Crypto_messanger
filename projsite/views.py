from django.http import HttpResponse, HttpRequest
from django.views.decorators.http import require_GET
from django.db.models import Q
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import TestForm
import re
import json
import hashlib
from django import template
import base64
import binascii
import random
from base64 import b64decode
from nacl.secret import SecretBox
from projsite.models import *
from web3 import Web3
# Create your views here.
secret_message = ''
authorization_queue = dict()

def check_crypto(word, key, user_login):
    global authorization_queue
    secret_key = key.lower()
    encrypted = word
    encrypted = encrypted.split(':')
    # We decode the two bits independently
    nonce = b64decode(encrypted[0])
    encrypted = b64decode(encrypted[1])
    # We create a SecretBox, making sure that out secret_key is in bytes
    box = SecretBox(bytes(secret_key, encoding='utf8'))
    try:
        decrypted = box.decrypt(encrypted, nonce).decode('utf-8')
        print(decrypted)
        if decrypted == authorization_queue[user_login]:
            result = True
            del authorization_queue[user_login]
            print(authorization_queue)
        else:
            result = False
            del authorization_queue[user_login]
            print(authorization_queue)
    except:
        result = False
    return result


def generate_secret(user_login):
    global secret_message
    global authorization_queue
    out_str = ''
    for i in range(0, 32):
        a = random.randint(65, 90)
        out_str += chr(a)
    secret_message = out_str
    authorization_queue[user_login] = secret_message
    print(authorization_queue)
    return secret_message

def getBalance(user_address):
    infura_url = 'https://ropsten.infura.io/v3/b70352c9625a4e9fb70c4a533997ade1'
    web3 = Web3(Web3.HTTPProvider(infura_url))
    abi = json.loads(
        '''[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeSub",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeDiv",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "tokens",
				"type": "uint256"
			},
			{
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeMul",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "uint256"
			},
			{
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeAdd",
		"outputs": [
			{
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]''')
    address = web3.toChecksumAddress("0x7cb53602e6407c9126c3261a26a55004d0398606")
    contract = web3.eth.contract(address=address, abi=abi)
    balance = contract.functions.balanceOf(user_address).call()
    result = int(web3.fromWei(balance, 'ether') * 10 ** 11)
    print(result)
    return result
# @require_GET
def index(request):
    if 'user_id' in request.session.keys():
        return redirect('dialogs')
    else:
        return redirect('login')


def validate_data(login, password, second_password):
    parser_login = re.search('[A-Za-z0-9_]+', login)
    result = False
    if len(parser_login.group(0)) == len(login) and len(login) >= 5 and len(login) <= 24:
        result_login = True
    else:
        result_login = False
    parser_password = re.search('[#A-Za-z0-9_]+', password)
    if len(parser_password.group()) == len(password) and len(password) >= 10 and len(password) <= 30:
        result_password = True
    else:
        result_password = False
    parser_password = re.search('[#A-Za-z0-9_]+', second_password)
    if len(parser_password.group()) == len(password) and len(second_password) >= 10 and len(second_password) <= 30:
        result_second_password = True
    else:
        result_second_password = False

    return result_password and result_login and result_second_password


def registration(request):
    if 'user_id' in request.session.keys():
        return redirect('dialogs')
    else:
        if request.is_ajax() and request.method == 'POST':
            if 'login' in request.POST.keys() and 'password' in request.POST.keys() and 'second_password' in request.POST.keys() and 'address' in request.POST.keys():
                user_login = request.POST['login']
                user_password = request.POST['password']
                user_second_password = request.POST['second_password']
                address = request.POST['address']
                if validate_data(user_login, user_password,
                                 user_second_password) and user_password == user_second_password:
                    user_password = hashlib.sha256(user_password.encode()).hexdigest()
                    try:
                        user_data = Users(login=user_login, password=user_password, address=address)
                        user_data.save()
                        result = {'message': 'ok'}
                        return HttpResponse(json.dumps(result), content_type='application/json')
                    except:
                        result = {'message': 'Такой пользователь уже существует, введите другой логин'}
                        return HttpResponse(json.dumps(result), content_type='application/json')
                else:
                    result = {'message': 'Введены некорректные данные. Попробуйте снова.'}
                    return HttpResponse(json.dumps(result), content_type='application/json')
            else:
                result = {'message': 'bad'}
                return HttpResponse(json.dumps(result), content_type='application/json')
        elif request.POST:
            if 'login' in request.POST.keys() and 'password' in request.POST.keys() and 'second_password' in request.POST.keys():
                user_login = request.POST['login']
                user_password = request.POST['password']
                user_second_password = request.POST['second_password']
                address = request.POST['address']
                user_password = hashlib.sha256(user_password.encode()).hexdigest()
                if validate_data(user_login, user_password,
                                 user_second_password) and user_password == user_second_password:
                    try:
                        user_data = Users(login=user_login, password=user_password, address=address)
                        user_data.save()
                        return redirect('/login')
                    except:
                        return render(request, template_name='registration_page.html')
                else:
                    return render(request, template_name='registration_page.html')
            else:
                return render(request, template_name='registration_page.html')
        else:
            return render(request, template_name='registration_page.html')


def login(request):
    if 'user_id' in request.session.keys():
        return redirect('dialogs')
    else:
        if request.method == 'POST' and 'login' in request.POST.keys() and 'password' in request.POST.keys() and 'key_valid' in request.POST.keys():
            print(secret_message)
            user_login = request.POST['login']
            user_password = request.POST['password']
            word = request.POST['key_valid']
            user_password = hashlib.sha256(user_password.encode()).hexdigest()
            res = Users.objects.get(
                (Q(login=user_login)) & (Q(password=user_password))
            )
            user_address = res.address[2:34]
            print("Адрес", user_address)
            key_vaild = check_crypto(word, user_address, user_login)
            if res and key_vaild:
                request.session['user_id'] = res.id
                request.session['public_key'] = res.address
                print('address', request.session['public_key'])
                data = {'message': 'ok'}
                return HttpResponse(json.dumps(data), content_type='application/json')
            else:
                data = {'message': '"Неверный логин, пароль или файл для авторизации"'}
                return HttpResponse(json.dumps(data), content_type='application/json')
        elif request.method == "POST" and 'login' in request.POST.keys() and 'password' not in request.POST.keys():
            user_login = request.POST['login']
            generate_secret(user_login)
            data = {'word': secret_message, 'message': 'ok'}
            return HttpResponse(json.dumps(data), content_type='application/json')
        else:
            return render(request, template_name='login_page.html')


def dialogs(request):
    if 'user_id' in request.session.keys():
    # if request.user.is_authenticated:
        info_balance = Users.objects.get(id=request.session['user_id'])
        balance = getBalance(info_balance.address)
        if request.method == "GET" and 'did' in request.GET and 'user_id' in request.session.keys() and 'to_do' not in request.POST.keys():
            did = request.GET['did']
            res = Messages.objects.filter(did=did)
            sender_id = request.session['user_id']
            sender_login = Users.objects.get(id=sender_id)
            current_user = sender_login.login
            second_query = Dialogs.objects.get(did=did)
            if second_query.sender == current_user:
                reciever = second_query.reciever
            else:
                reciever = second_query.sender
            return render(request, template_name='messages_page.html', context={'title': 'Диалог', "messages": res, "user_login": sender_login, "reciever": reciever, "balance": balance})
        elif request.is_ajax() and request.method == 'POST' and 'to_do' in request.POST.keys() and request.POST[
            'to_do'] == 'load_messages':
            did = request.GET['did']
            res = Messages.objects.filter(did=did)
            sender_id = request.session['user_id']
            sender_login = Users.objects.get(id=sender_id)
            current_user = sender_login.login
            second_query = Dialogs.objects.get(did=did)
            if second_query.sender == current_user:
                reciever = second_query.reciever
            elif second_query.reciever == current_user:
                reciever = second_query.sender
            return render(request, template_name='messages_for_js.html', context={"messages": res, "user_login": current_user, "reciever": reciever, "balance": balance}, content_type='application/text')
        elif request.is_ajax() and request.method == "POST" and 'did' in request.GET and 'message_content' in request.POST.keys() and 'user_id' in request.session.keys():
            try:
                did = request.GET['did']
                text = request.POST['message_content']
                sender_id = request.session['user_id']
                sender_login = Users.objects.get(id=sender_id)
                login = sender_login.login
                message = Messages(did=did, sender=login, text=text)
                message.save()
                data = {'message': 'ok'}
                return HttpResponse(json.dumps(data), content_type='application/json')
            except:
                data = {'message': 'bad'}
                return HttpResponse(json.dumps(data), content_type='application/json')
        elif request.is_ajax() and 'message' in request.POST.keys() and request.POST['message'] == 'load_dialogs':
            if 'user_id' in request.session and 'did' not in request.GET.keys():
                user_login = Users.objects.get(id=request.session['user_id'])
                res = Dialogs.objects.filter(
                    (Q(sender=user_login)) | (Q(reciever=user_login))
                )
                res = res.order_by('-did')
                for i in res:
                    i.did = str(i.did)
                return render(request, template_name='dialogs_for_js.html',
                              context={"title": 'Диалоги', "user_login": user_login, "Dialogs": res, "balance": balance},
                              content_type='application/text')
            else:
                return redirect('/login')
        else:
            if 'user_id' in request.session.keys() and 'did' not in request.GET.keys():
                user_login = Users.objects.get(id=request.session['user_id'])
                res = Dialogs.objects.filter(
                    (Q(sender=user_login)) | (Q(reciever=user_login))
                )
                res = res.order_by('-did')
                for i in res:
                    i.did = str(i.did)
                # print(res[0].sender, res[0].last_mes())
                return render(request, template_name='dialogs.html',
                              context={"title": 'Диалоги', "user_login": user_login, "Dialogs": res, "balance": balance})
            else:
                return redirect('login')
    else:
        return redirect('login')


# def load_messages(request):
#     did = request.GET['did']
#     res = Messages.objects.get(did=did)
#     print(res)
#     return render(request, template_name='messages_page.html', context={"reciever": "Имя собеседника"})

def create_dialog(request):
    if 'user_id' in request.session.keys():
        info_balance = Users.objects.get(id=request.session['user_id'])
        balance = getBalance(info_balance.address)
        if request.is_ajax() and request.method == "POST" and 'reciever' in request.POST.keys():
            reciever = request.POST['reciever']
            try:
                first_query = Users.objects.get(login=reciever)
                second_query = Users.objects.get(id=request.session['user_id'])
                sender = second_query.login
                reciever = first_query.login
                res = res = Dialogs.objects.filter(
                    (Q(sender=sender)) & (Q(reciever=reciever)) | (Q(sender=reciever)) & (Q(reciever=sender))
                )
                print(res)
                if not res:
                    dialog_data = Dialogs(sender=sender, reciever=reciever)
                    dialog_data.save()
                    data = {'message': 'ok'}
                    return HttpResponse(json.dumps(data), content_type='application/json')
                else:
                    data = {'message': 'Диалог с этим пользователем уже существует'}
                    return HttpResponse(json.dumps(data), content_type='application/json')
            except:
                data = {'message': 'Такого пользователя не существует'}
                return HttpResponse(json.dumps(data), content_type='application/json')
        user_login = Users.objects.get(id=request.session['user_id'])
        return render(request, template_name='create_dialog.html', context={"title": "Создать", "user_login": user_login, "balance": balance})
    else:
        return redirect('login')


def transfer(request):
    if 'user_id' in request.session.keys():
        info_balance = Users.objects.get(id=request.session['user_id'])
        balance = getBalance(info_balance.address)
        if request.method == "GET" and 'user_id' in request.session.keys():
            user_id = request.session['user_id']
            username = Users.objects.get(id=user_id)
            return render(request, template_name='transfer.html', context={'title': 'Переводы', "user_login": username, "balance": balance})
        elif request.method == "POST" and 'balance_info' in request.POST.keys() and request.POST['balance_info'] == 'get_user_address':
            user_adr = Users.objects.get(id=request.session.get('user_id'))
            data = {'address': user_adr.address}
            return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return redirect('login')


def settings(request):
    if 'user_id' in request.session.keys():
        print(request.session['user_id'])
        info_balance = Users.objects.get(id=request.session['user_id'])
        balance = getBalance(info_balance.address)
        if request.method == 'GET':
            user_id = request.session['user_id']
            username = Users.objects.get(id=user_id)
            return render(request, template_name='settings.html',
                          context={'title': 'Настройки', "user_login": username, "balance": balance})
        elif request.method == "POST" and 'file' in request.FILES.keys():
            user = Users.objects.get(id=request.session['user_id'])
            user.avatar = request.FILES['file']
            user.save()
            data = {'info': 'ok'}
            return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return redirect('login')


def logout(request):
    if 'user_id' in request.session.keys():
        del request.session['user_id']
        print(request.session.get('user_id'))
        return redirect('login')
    else:
        return redirect('login')
