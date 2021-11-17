from django.shortcuts import render

# Create your views here.
# view dashboard
def quizi_dashboard(request):
    return render(request, 'quizi/quizi_home.html')
