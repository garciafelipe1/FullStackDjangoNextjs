# Generated by Django 4.2.16 on 2025-03-19 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_alter_useraccount_login_otp_used'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='login_otp_used',
            field=models.BooleanField(default=False),
        ),
    ]
