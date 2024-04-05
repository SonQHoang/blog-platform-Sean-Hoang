# Getting Started

1. Instlal dependencies

 ```
  pipenv install -r requirements.txt
 ```

2. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```

To run the React App in development, checkout the README inside the react-app directory.
