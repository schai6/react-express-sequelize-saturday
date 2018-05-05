# Express/Sequelize/React Review

Hey there! Let's review an application with Express/Sequelize on the backend and React on the front end.

We're going to build an application called `puppybook`. It's a social network for puppies, similar to...some _other_ social network for humans (the name's escaping me at the moment).

## 1. Setup

* `createdb puppybook`
* `npm install`
* `npm start`

The start script runs webpack in watch mode, and nodemon, so any changes you make to the client or server directories should cause webpack to rebuild and the server to restart, respectively. Note that you may need to wait a moment for the webpack build to complete - if you refresh the page too soon, you may not see your changes.

## 2. Back End

### 2-1. Sequelize

```
- Define a Puppy model
  - Should have a name column
    - type should be STRING
    - should be required
  - Should have an imageUrl column
    - type should be STRING
    - should have a default value of: "http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg"
  - Should have a likes column
    - type should be INTEGER
    - should have a default value of 1
  - We're going to ensure every puppy has a well formatted name (possibly against the will of its owner).
    As an example - "   sAndY    beAchEs    " should be stored as "Sandy Beaches".
    - Create a beforeCreate hook
    - In it we wish to strip out extra spaces, and make all names follow "Proper Noun Case"
    - Hint 1: you can split a string on regular expressions (for example /\s+/ is a regular expression matching one or more space characters)
    - Hint 2: strings have a trim method (myString.trim()) which remove leading & trailing whitespace
    - Hint 3: strings have toLowerCase and toUpperCase methods
    - Hint 4: strings have a substring method
  - Should have a method that allows us to find all the puppies in a specific puppy's family/pack (the other puppies that belong to a puppy's owner)
    - Create an instance method called 'findPackmates'
    - It should return a promise for all the puppies that share the same ownerId as the specific puppy
    - Hint 1: But be sure to not include the puppy itself, just its packmates/siblings
    - Hint 2: There may be a [Sequelize operator](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators) that could help!
  - Should have a method that finds only very popular puppies
    - Create a class method called 'findPopular'
    - It should return a promise for all the puppies who have 5 or more likes


- Define an Owner model
  - Should have a name column
    - type should be STRING
    - should be required
    - as with our Puppies, let's add a beforeCreate hook to ensure proper name formatting.

- Define a one-many association between Owners and Puppies
  - A Puppy belongs to an Owner
  - An Owner has many Puppies
```

### 2-2. Seed File

```
- Write a file called `seed.js`
- Using this file, write a small script that seeds your database with puppy data
  - Extra guidance:
    - This file should require your "db" object
    - It should also get any models that you need, either by requiring them directly or by accessing them from db.model('modelname')
    - You should start by saying `db.sync({force: true})`, and `then` create any Puppies/Owners you need
    - When you are done seeding, you should use `db.close` to end your connection
    - Here is an example of what this looks like: https://github.com/tmkelly28/sequelize-reference/blob/master/sandbox.js
```

#### Puppy Pictures for Seed Data:

Here are some puppy pictures that you can use to seed the `imageUrl` column on puppies:

* https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584

* http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg

* https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg

* http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg

* http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'

### 2-3. Express

```
- GET /api/puppies
  - note: when we get all puppies, we should *include* each puppy's owner!
  - responds with all of the puppies from the database
- POST /api/puppies
  - responds with the newly created puppy
  - the new puppy should also include it's owner (see the hint below for some more guidance)
- GET /api/puppies/:id
  - responds with the puppy with the matching id
- PUT /api/puppies/:id
  - responds with the updated puppy
  - the updated puppy should also include it's owner
- DELETE /api/puppies/:id
  - responds with a 204 status code

- GET /api/owners
  - responds with all of the owners
```

#### Some Notes on `include`

We can **include** (that is, "eager load") a foreign key relation when we use `findAll` or `findById`:

```
Puppy.findAll({include: [Owner]})

Puppy.findById(puppyId, {include: [Owner]})
```

Unfortunately, we cannot do this when we use `.create` (i.e. to make sure that the newly created instance has it's instance loaded in one step)! To load in the relation, we unfortunately need to make another database query to find the row again!

## 3. Front End

A static version of this UI is currently hard-coded into the index.html.

Your task is to replace the static HTML with "real live" React components.

Here is the suggested "view hierarchy":

```
<Main>
  <PuppyList>
    <PuppyProfile>
      <PuppyPicture />
      <PuppyLikes />
    </PuppyProfile>
  </PuppyList>
</Main>
```

Here is a rundown of what each component should do:

#### Main
```
- Should be a stateful component
  - Should have a list of puppies on its state
  - Should have a list of owners on its state
- Should make an AJAX request to get all puppies (GET /api/puppies) and all owners (GET /api/owners) when the component mounts
  - Should put the puppies it gets onto state
  - Should put the owners it gets onto state
- Should render the PuppyList
```

#### PuppyList
```
- Should be a stateless component
- Should receive a list of puppies as a prop
- Should render a PuppyProfile for each puppy
```

#### PuppyProfile
```
- Should be a stateless component
- Should receive a single puppy as a prop
- Should render the name of the puppy
- Should render the name of the puppy's owner
- Should render a PuppyPicture component
- Should render a PuppyLikes component
```

#### PuppyPicture
```
- Should be a stateless component
- Should receive a puppy picture as a prop
- Should render an <img> with the puppy's picture as the src
```

#### PuppyLikes
```
- Should be a stateless component
- Should receive a puppy's number of likes as a prop
- Should render the number of likes a puppy has
- Should have a button to "like" the puppy
  - Clicking the button should send a PUT to /api/puppies/:id
  - The view should update to represent the new number of likes (incremented by one)
- Should have a button to "unlike" the puppy
  - Clicking the button should send a PUT to /api/puppies/:id
  - The view should update to represent the new number of likes (decremented by one)

    - *HINT 1*: The update is a bit tricky. The response from PUT /api/puppies/:id should be
    the newly updated puppy. To update it in your state, you should replace the
    old puppy object in your array with the new puppy object. You can use `.map`
    for this (for hints on the approach to this, see hint 2). Avoid the temptation to use `.splice`.

    - *HINT 2* For each puppy in the array, if the puppy's id is equal to the
    updated puppy object's id, return the updated puppy object instead of the original.
    Otherwise, return the original.
```
