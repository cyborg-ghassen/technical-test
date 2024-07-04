# Technical test

## Installation

Use the package manager [pipenv](https://pypi.org/project/pipenv/) to install foobar.

```bash
pip install pipenv
```

then install the dependencies by running:
```bash
pipenv install
```

## Running

```Django```

After activating the virtual environment using  
```bash
pipenv shell
```
- Copy the file named ```.env-example``` to a one named ```.env``` and replace the necessary environment values
- Run the migrations:
```bash
python manage.py migrate
```
- Create a super user to access the resources:
```bash
python manage.py createsuperuser
```
- Run the development server
```bash
python manage.py runserver
```

```React```

Run these commands:
```bash
npm install
```
then
```bash
npm start
```
