from django import forms

from to_do_app.models import userslogin, Task

class registration(forms.ModelForm):
    class Meta:
        model = userslogin
        fields = ['username', 'email', 'password']

class login(forms.ModelForm):
    class Meta:    
        model = userslogin 
        fields = ['username', 'password']
        widgets = {
            'password': forms.PasswordInput(),
            "username": forms.TextInput(attrs={'id': 'username-input'})
        }


#import to views, views to html


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'completed']