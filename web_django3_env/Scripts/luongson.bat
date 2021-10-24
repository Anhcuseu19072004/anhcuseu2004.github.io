@echo off
cd..
cd forum_student

if %1 == 1 (
	python manage.py migrate
	python manage.py runserver
) else (
	python manage.py runserver
)
