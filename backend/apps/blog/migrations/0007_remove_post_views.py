# Generated by Django 4.2.16 on 2025-03-13 15:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_alter_post_views'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='views',
        ),
    ]
