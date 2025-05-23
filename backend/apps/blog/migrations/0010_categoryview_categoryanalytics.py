# Generated by Django 4.2.16 on 2025-03-15 15:40

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_alter_postanalytics_post'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryView',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ip_address', models.GenericIPAddressField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blog_category_view', to='blog.category')),
            ],
        ),
        migrations.CreateModel(
            name='CategoryAnalytics',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('views', models.PositiveIntegerField(default=0)),
                ('impressions', models.PositiveIntegerField(default=0)),
                ('clicks', models.PositiveIntegerField(default=0)),
                ('click_through_rate', models.FloatField(default=0)),
                ('avg_time_on_page', models.FloatField(default=0)),
                ('category', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='category_analytics', to='blog.category')),
            ],
        ),
    ]
