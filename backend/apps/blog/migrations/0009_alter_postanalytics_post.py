# Generated by Django 4.2.16 on 2025-03-15 15:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_postanalytics'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postanalytics',
            name='post',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='post_analytics', to='blog.post'),
        ),
    ]
