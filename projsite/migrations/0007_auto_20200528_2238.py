# Generated by Django 3.0.5 on 2020-05-28 19:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projsite', '0006_auto_20200528_2237'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='is_active',
            new_name='active',
        ),
    ]
