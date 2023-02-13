from django.shortcuts import render
from django.shortcuts import get_object_or_404

from .models import Treatment, Customer, Bday_benefit, Appointment, Product
from .serializers import TreatmentSerializer, CustomerSerializer, AppointmentSerializer, ProductSerializer
import datetime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import logout
from rest_framework.parsers import MultiPartParser, FormParser


# ////////////////////////////////login /register
# login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_admin'] = user.is_superuser
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# register


@api_view(['POST'])
def register(req):
    username = req.data["username"]
    password = req.data["password"]
    # create a new user (encrypt password)
    try:
        User.objects.create_user(username=username, password=password)
    except:
        return Response("error")
    return Response(f"{username} registered")

# logout


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def do_logout(request):
    logout(request)
    return Response({"detail": "logout"}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def getImages(request):
#     res=[] #create an empty list
#     for img in Customer.objects.all(): #run on every row in the table...
#         res.append({"customer_id":img.customer_id,
#                 "name":img.name,
#                 "p_number":img.p_number,
#                 "age":img.page,
#                "image":str(img.image)
#                 }) #append row by to row to res list
#     return Response(res) #return array as json response


# class APIViews(APIView):
#     parser_class=(MultiPartParser,FormParser)
#     def get (self, request):
#         tasks = Customer.objects.all()
#         serializer = CustomerSerializer(tasks, many=True)
#         return Response(serializer.data)

#     def post(self, request,*args,**kwargs):
#         serializer = CustomerSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response (serializer.data, status=status.HTTP_201_CREATED)
#         return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class New_Customer(APIView):
    parser_class = (MultiPartParser, FormParser)
    permission_classes = [IsAdminUser]

    def get(self, request):
        customers = request.user.customer_set.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomerSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):

        customers = Customer.objects.get(pk=pk)
        serializer = CustomerSerializer(customers, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        customers = Customer.objects.get(pk=pk)
        customers.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@permission_classes([IsAuthenticated])
class TreatmentView(APIView):
    def get(self, request):
        my_model = Treatment.objects.all()
        serializer = TreatmentSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TreatmentSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):

        treatments = Treatment.objects.get(pk=pk)
        serializer = TreatmentSerializer(treatments, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        treatments = Treatment.objects.get(pk=pk)
        treatments.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@permission_classes([IsAuthenticated])
class AppointmentView(APIView):
    def get(self, request):
        my_model = Appointment.objects.all()
        serializer = AppointmentSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AppointmentSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):

        appointments = Appointment.objects.get(pk=pk)
        serializer = AppointmentSerializer(appointments, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        appointments = Appointment.objects.get(pk=pk)
        appointments.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@permission_classes([IsAuthenticated])
class ProductView(APIView):

    def get(self, request):

        my_model = Product.objects.all()
        serializer = ProductSerializer(my_model, many=True)
        return Response(serializer.data)

    def post(self, request):

        serializer = ProductSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):

        my_model = Product.objects.get(pk=pk)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        my_model = Product.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
