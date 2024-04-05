# Getting Started with setting up the Flask Backend

1. Install dependencies

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

# Setting up the React Frontend

1. Install dependencies
2. Navigate to the react-app directory and run the start command
   
```
npm start
```

# Technical Considerations / Challenges

1. For the likes counter, I chose to use local storage to persist whether the post has been liked or the like has been removed due to time constraints. I believe that the more ideal solution would have been to use Redux to manage the state so that the likes counter and its value would persist regardless of user changes or device switches.

2. One bug that I'm aware of, that I wasn't able to patch was that as you create more posts or comments, the content that is visible gets continually pushed up and subsequently buried underneath the header, which has css position styling of "fixed" in order to keep it at the top of the page.
> My understanding of this fix would be to determine the space that the header is taking and then to add the same space through "padding-top" to offset the content below so that it doesn't get buried but for some reason despite calculating this, the content would continually be pushed underneathe the fixed header. Even through setting up a dynamic calculation with 'height: calc(100vh - header_space) did not resolve the issue.

> A short-term I would have implemented would have been to use page pagination and limit the results of the posts to just 3, which is about the amount that can fit inside of the viewport before this issue begins to show.

