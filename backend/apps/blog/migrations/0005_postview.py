# Generated by Django 4.2.16 on 2025-03-13 13:42

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_post_views'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostView',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ip_address', models.GenericIPAddressField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post_view', to='blog.post')),
            ],
        ),
    ]
