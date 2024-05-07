from rest_framework import serializers
from .models import Image
from bson import ObjectId


class ObjectIdField(serializers.Field):
    """Custom serializer field for MongoDB ObjectId."""

    def to_representation(self, value):
        """Serialize ObjectId to string."""
        return str(value)

    def to_internal_value(self, data):
        """Parse a string to ObjectId."""
        try:
            return ObjectId(data)
        except Exception as e:
            raise serializers.ValidationError("Invalid ObjectId")


class ImageSerializer(serializers.ModelSerializer):
    id = ObjectIdField(read_only=True)
    image = serializers.ImageField(required=False)
    annotations = serializers.ListField(
        child=serializers.CharField(max_length=255),
        default=list,
        required=False
    )

    class Meta:
        model = Image
        fields = '__all__'
