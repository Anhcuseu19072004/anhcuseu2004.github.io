# Generated by Django 3.2.7 on 2021-11-17 05:09

from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('form', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_title', models.CharField(max_length=500)),
                ('question_discription', models.CharField(max_length=1000)),
                ('question_content', tinymce.models.HTMLField()),
                ('question_time', models.DateField(auto_now=True)),
                ('post_of_question', models.CharField(default='none', max_length=20)),
                ('question_img', models.CharField(default='/media/background_item.png', max_length=50)),
                ('user_of_question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form.user')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', tinymce.models.HTMLField()),
                ('post_time', models.DateField(auto_now=True)),
                ('post_img', models.TextField()),
                ('post_views', models.IntegerField(default=0)),
                ('post_type', models.CharField(default='all', max_length=50)),
                ('user_of_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form.user')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('reply_time', models.DateTimeField(auto_now=True)),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.post')),
                ('responders', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form.user')),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', tinymce.models.HTMLField()),
                ('time', models.DateTimeField(auto_now=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='form.user')),
            ],
        ),
    ]
