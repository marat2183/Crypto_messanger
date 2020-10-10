from django.db import models

# Create your models here.


class Users(models.Model):
    login = models.CharField(max_length=25, unique=True)
    address = models.CharField(max_length=65, unique=True, default='None' )
    password = models.CharField(max_length=300)
    avatar = models.ImageField(upload_to='images/', null=True, blank=True, default='images/default-avatar.jpg')

    def __str__(self):
        return self.login

class Messages(models.Model):
    did = models.PositiveIntegerField()
    sender = models.CharField(max_length=25, default='None')
    text = models.TextField(max_length=200)
    date = models.DateTimeField(unique_for_date=True, auto_now_add=True)

    def __str__(self):
        return self.sender


class Dialogs(models.Model):
    did = models.AutoField(primary_key=True)
    sender = models.CharField(max_length=25)
    reciever = models.CharField(max_length=25)

    def last_mes(self, *args, **kwargs):
        mes = Messages.objects.filter(did=self.did)
        if len(mes) >= 1:
            lenght = len(mes)
            return mes[lenght - 1].text
        else:
            return "Пока нет ни одного сообщения"

    def get_avatar(self, *args, **kwargs):
        user = Users.objects.get(login=self.sender)
        user1 = Users.objects.get(login=self.reciever)
        return [user.avatar.url, user1.avatar.url]

    def __str__(self):
        return self.sender



