# Generated by Django 3.2.9 on 2022-01-20 14:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0016_auto_20220119_1158'),
    ]

    operations = [
        migrations.AddField(
            model_name='examresult',
            name='first_name',
            field=models.CharField(default='Na', max_length=50),
        ),
        migrations.AlterField(
            model_name='examresult',
            name='date',
            field=models.DateField(default=datetime.date(2022, 1, 20)),
        ),
        migrations.AlterField(
            model_name='examresult',
            name='user_name',
            field=models.CharField(default='Na', max_length=50),
        ),
    ]
