from djongo import models
from django.utils import timezone
from bson import ObjectId

class ObjectIdField(models.Field):
    """Custom field for handling MongoDB ObjectId."""
    def get_prep_value(self, value):
        return str(value)

    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return ObjectId(value)

    def to_python(self, value):
        if isinstance(value, ObjectId):
            return value
        return ObjectId(value)

class Image(models.Model):
    id = ObjectIdField(primary_key=True, default=ObjectId)
    image = models.ImageField(upload_to='images/')
    annotations = models.JSONField(default=list)
    uploaded_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, default='pending')

    def __str__(self):
        return self.image.name
