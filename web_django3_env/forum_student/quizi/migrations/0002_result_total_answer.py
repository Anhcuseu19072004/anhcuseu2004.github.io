# Generated by Django 3.2.7 on 2021-11-27 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='total_answer',
            field=models.IntegerField(default=0),
        ),
    ]
