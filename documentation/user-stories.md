# **Feeder - User Stories**

## **Users**

### **Sign Up**
As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.

- When I'm on the `/signup` page:
  - I would like to enter my **email, username, and password** on a clearly laid-out form.
  - I would like the website to log me in upon successful completion of the sign-up form.
  - So that I can seamlessly access the site's functionality.

- When I enter invalid data on the sign-up form:
  - I would like the website to inform me of the validation errors and repopulate the form with my valid entries (except my password).
  - So that I can try again without needing to refill fields I entered correctly.

---

### **Log In**
As a registered and unauthorized user, I want to be able to log in via a login form.

- When I'm on the `/login` page:
  - I would like to enter my **email and password** on a clearly laid-out form.
  - I would like the website to log me in upon successful completion of the login form.
  - So that I can seamlessly access the site's functionality.

- When I enter invalid data on the login form:
  - I would like the website to inform me of the validation errors and repopulate the form with my valid entries (except my password).
  - So that I can try again without needing to refill fields I entered correctly.

---

### **Demo User**
As an unregistered and unauthorized user, I would like a **Demo User** button on both the `/signup` and `/login` pages so I can access the site without signing up.

- When I'm on either the `/signup` or `/login` pages:
  - I can click on a **Demo User** button to log in automatically.
  - So that I can explore the site's features without needing an account.

---

### **Log Out**
As a logged-in user, I want to be able to log out via an easy-to-find logout button on the navigation bar.

- While on any page:
  - I can click "Log Out" to end my session.
  - I will be redirected to the homepage.
  - So that I can securely log out when I am finished using the site.

---

## **Recipe Management (Full CRUD) 🍲**

### **Create a Recipe**
As a logged-in user, I want to be able to create a new recipe.

- When I'm on the `/recipes/new` page:
  - I can enter a **title, description, ingredients, and cooking instructions**.
  - I can optionally upload a **recipe image**.
  - When I submit the form, the recipe is saved and appears in my profile.
  - So that I can share my pet-friendly meals with others.

---

### **View Public Recipes**
As a logged-in or logged-out user, I want to browse and view public recipes.

- When I'm on the `/recipes` page:
  - I can see a list of recipes posted by users.
  - I can click on a recipe to view its **details, ingredients, and instructions**.
  - So that I can find meals for my pet.

---

### **Update My Recipe**
As a recipe owner, I want to edit my recipes.

- When I am on the `/recipes/:id` page (my recipe):
  - I can click the "Edit" button to modify the **title, description, ingredients, and instructions**.
  - I can update the recipe image.
  - When I submit the form, the changes are saved.
  - So that I can improve or update my recipe over time.

---

### **Delete My Recipe**
As a recipe owner, I want to delete my recipes.

- When I am on the `/recipes/:id` page (my recipe):
  - I can click the "Delete" button to remove the recipe permanently.
  - A confirmation modal appears before deletion.
  - So that I can remove outdated or unwanted recipes.

---

## **Shopping List (Full CRUD) 🛒**

### **Create a Shopping List**
As a logged-in user, I want to create a shopping list to keep track of ingredients.

- When I'm on the `/shopping-lists/new` page:
  - I can enter a **title** and add **ingredients with quantities**.
  - When I submit the form, the shopping list is saved to my profile.
  - So that I can organize my grocery shopping.

---

### **View My Shopping Lists**
As a logged-in user, I want to view my saved shopping lists.

- When I'm on the `/shopping-lists` page:
  - I can see all my shopping lists.
  - I can click on a list to view its ingredients.
  - So that I can reference my shopping plans.

---

### **Update a Shopping List**
As a shopping list owner, I want to edit my lists.

- When I am on the `/shopping-lists/:id` page:
  - I can click the "Edit" button to add, remove, or update ingredients.
  - The changes are saved upon submission.
  - So that I can adjust my grocery plans.

---

### **Delete a Shopping List**
As a shopping list owner, I want to delete my lists.

- When I am on the `/shopping-lists/:id` page:
  - I can click the "Delete" button to remove the list permanently.
  - A confirmation appears before deletion.
  - So that I can remove lists I no longer need.

---

## **XP & Pet Evolution 🐶🎮**

### **Earn XP by Engaging with the App**
As a logged-in user, I want to gain XP by interacting with the app.

- When I **create a recipe or shopping list**, I earn XP.
- When I **rate or review a recipe**, I earn XP.
- When I **complete challenges**, I earn bonus XP.
- So that I can track my contributions and unlock rewards.

---

### **Evolve My Virtual Pet**
As a logged-in user, I want my virtual pet to evolve as I earn XP.

- When I reach **XP milestones**, my pet evolves.
- I can view my **current XP and evolution stage** on my profile.
- Different evolution paths unlock based on my engagement.
- So that I stay motivated to contribute.

---

## **Favorites ❤️**

### **Favorite a Recipe**
As a logged-in user, I want to favorite recipes.

- When I am on a **recipe page**, I can click a "Favorite" button.
- The recipe is added to my **favorites list**.
- So that I can easily find my favorite meals.

---

### **View My Favorite Recipes**
As a logged-in user, I want to view my favorite recipes.

- When I go to `/favorites`, I can see all my saved recipes.
- I can click on a recipe to view details.
- So that I can revisit my favorite meals quickly.

---

## **Following Users 🔄**

### **Follow Another User**
As a logged-in user, I want to follow other users.

- When I visit a user’s profile, I can click "Follow."
- Their recipes appear in my **feed**.
- So that I can keep up with their new recipes.

---

### **Unfollow a User**
As a logged-in user, I want to unfollow users.

- When I visit a user’s profile, I can click "Unfollow."
- Their recipes are removed from my **feed**.
- So that I can control whose content I see.

---

## **Leaderboards & Achievements 🏆**

### **View the Weekly Leaderboard**
As a user, I want to see a leaderboard to track top contributors.

- When I visit `/leaderboard`, I see the **top XP earners**.
- Users are ranked based on XP and achievements.
- So that I can compete with others.

---

### **Earn Badges**
As a user, I want to earn badges for achievements.

- When I hit XP milestones, I unlock **badges**.
- I can view my badges on my **profile**.
- So that I am rewarded for my engagement.

---

## **Bonus Features (If Time Allows)**

- **Notifications:** Get notified when someone follows me or favorites my recipe.
- **Search & Filtering:** Search recipes, users, and shopping lists.

---