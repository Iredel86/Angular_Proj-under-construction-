from django.contrib import admin
from .models import Treatment,Appointment,Customer,Bday_benefit,Product

# Register your models here.

admin.site.register(Treatment)
admin.site.register(Appointment)
admin.site.register(Customer)
admin.site.register(Bday_benefit)
admin.site.register(Product)