@echo off
echo Starting Terra Care Django Server...
echo.
echo Make sure you have:
echo 1. Installed dependencies: pip install -r requirements.txt
echo 2. Run migrations: python manage.py migrate
echo 3. Created superuser: python manage.py createsuperuser
echo 4. Copied images to static/images/
echo.
echo Starting server...
python manage.py runserver
pause
