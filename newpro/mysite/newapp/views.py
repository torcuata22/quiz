from django.shortcuts import render
from .models import Movies
from django.core.paginator import Paginator

# Create your views here.

def movie_list(request):
    movie_objects = Movies.objects.all()

    movie_name=request.GET.get('movie_name') #same name as the inout field in the search form on the template
    if movie_name != '' and movie_name is not None:
        movie_objects = movie_objects.filter(name__icontains = movie_name) #name__icontains returns match that contains items from search, not exact match

    paginator = Paginator(movie_objects,4)
    page = request.GET.get('page')
    movie_objects = paginator.get_page(page)

    return render(request, 'newapp/movie_list.html', {'movie_objects': movie_objects} )