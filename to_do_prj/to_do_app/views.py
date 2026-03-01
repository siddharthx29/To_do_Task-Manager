
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render, get_object_or_404

import json

from to_do_app.models import userslogin, Task
from .forms import login, registration, TaskForm
from django.views.decorators.http import require_http_methods


def home(request):
    return render(request, 'home.html')


def register(request):
    form = registration()
    return render(request, 'register.html', {'form': form})


def userlogin(request):
    if request.method == "POST":
        form = login(request.POST)
        user = userslogin.objects.filter(username=form.data['username'], password=form.data['password']).first()
        if user:
            return redirect("dashboard")
        else:
            return render(request, 'login.html', {'form': form})
    form = login()
    return render(request, 'login.html', {'form': form})


# to receive data from form and save in database(data from registration page)
def registrations(request):

    if request.method == "POST":
        form = registration(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            return render(request, 'home.html', {'username': username})
        else:
            return render(request, 'register.html', {'form': form})


def usernames(request):
    return JsonResponse(list(userslogin.objects.values_list("username", flat=True)), safe=False)


def dashboard(request):
    return render(request, 'dashboard.html')


@require_http_methods(["GET", "POST"])
def tasks_api(request):
    if request.method == 'GET':
        tasks = list(Task.objects.order_by('-created_at').values('id', 'title', 'completed', 'created_at'))
        return JsonResponse(tasks, safe=False)

    # POST -> create
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        data = request.POST

    title = data.get('title') if isinstance(data, dict) else None
    if not title:
        return JsonResponse({'error': 'Title is required'}, status=400)

    task = Task.objects.create(title=title)
    return JsonResponse({'id': task.id, 'title': task.title, 'completed': task.completed, 'created_at': task.created_at.isoformat()})


@require_http_methods(["POST"])
def task_toggle(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.completed = not task.completed
    task.save()
    return JsonResponse({'id': task.id, 'completed': task.completed})


@require_http_methods(["POST"])
def task_delete(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.delete()
    return JsonResponse({'deleted': True})


@require_http_methods(["POST"])
def task_update(request, pk):
    task = get_object_or_404(Task, pk=pk)
    try:
        data = json.loads(request.body.decode('utf-8'))
    except Exception:
        data = request.POST

    title = data.get('title') if isinstance(data, dict) else None
    if title is None:
        return JsonResponse({'error': 'Title is required'}, status=400)

    task.title = title
    if isinstance(data, dict) and 'completed' in data:
        task.completed = bool(data.get('completed'))
    task.save()
    return JsonResponse({'id': task.id, 'title': task.title, 'completed': task.completed, 'created_at': task.created_at.isoformat()})
 

