from rest_framework import serializers
from .models import Treatment, Customer, Appointment, Product
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.contrib.auth.models import User



class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')

    def validate(self, data):
        user = User (**data)
        password = data.get ('password')

        try:
            validate_password (password, user)
        except exceptions.ValidationError as e:
            serializers_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializers_errors['non_field_errors']}
            )

        return data
   
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        return user


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
    def create(self, validated_data):
        user = self.context['user']
        print(user)
        return Customer.objects.create(**validated_data,user=user)


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = "__all__"
    

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

