# Generated by Django 3.2.9 on 2021-12-07 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='stream',
            field=models.CharField(default='None', max_length=30),
        ),
        migrations.AddField(
            model_name='newuser',
            name='year',
            field=models.CharField(default='FE', max_length=5),
        ),
    ]