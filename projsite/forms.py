from django import forms


class TestForm(forms.Form):
    login = forms.CharField(required=True)
    password = forms.CharField(required=True)
    confirm_password = forms.CharField(required=True)

    login.widget.attrs.update({'class': 'form-control', 'placeholder': 'Введите логин', 'id': 'login'})