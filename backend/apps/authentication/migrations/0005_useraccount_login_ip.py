# Generated by Django 4.2.16 on 2025-03-18 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_useraccount_login_otp_useraccount_login_otp_used_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='login_ip',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
