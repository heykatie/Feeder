# **Feeder - MVP Document**

## **Objective**
Feeder is a pet-focused recipe and meal-planning app designed to help pet owners create nutritious meals for their pets. The app enables users to save and share recipes, generate shopping lists, and gamify their experience by earning XP and evolving a virtual pet sous-chef.

---

## **MVP Features**

### **1. User Authentication & Authorization**
- **Sign Up / Log In / Log Out:**
  - Users can create an account, log in, and log out.
  - Demo user for quick access without signing up.
- **Protected Routes:**
  - Authenticated users can access their personal recipes and shopping lists.
  - Prevent unauthorized access to restricted features.

---

### **2. Recipe Management (Full CRUD) 🍲**
- **Create Recipe:**
  - Users can add new recipes with ingredients, instructions, and images.
- **Read Recipes:**
  - Any user can browse public recipes.
  - Logged-in users can view their own private recipes.
- **Update Recipe:**
  - Users can modify their existing recipes.
- **Delete Recipe:**
  - Users can remove their recipes.

---

### **3. Shopping List Management (Full CRUD) 🛒**
- **Create Shopping List:**
  - Users can generate a shopping list from selected recipes.
- **Read Shopping Lists:**
  - Users can view their personal shopping lists.
  - Public shopping lists can be accessed by any user.
- **Update Shopping List:**
  - Users can edit quantities or remove items.
- **Delete Shopping List:**
  - Users can remove their shopping lists.

---

### **4. XP & Pet Evolution System 🐶🎮**
- **Earning XP:**
  - Users gain XP by adding recipes, cooking meals, and interacting with the app.
- **Virtual Pet Growth:**
  - Users are assigned a pet sous-chef that evolves as XP is earned.
  - Evolution stages depend on the user's cooking history (e.g., carnivore, vegetarian, balanced diet).
- **Customization:**
  - Users can choose their pet’s initial type and track its progress.

---

### **5. Ratings & Reviews (Partial CRUD) ⭐**
- **Rate Recipes:**
  - Users can rate recipes from 1-5 stars.
- **Leave Comments:**
  - Users can comment on recipes.
- **Edit/Delete Reviews:**
  - Users can modify or delete their own reviews.

---

### **6. Favorites System ❤️**
- **Save Favorites:**
  - Logged-in users can favorite recipes and shopping lists for quick access.
- **Manage Favorites:**
  - Users can remove recipes or lists from favorites.

---

### **7. Following System (Social Feature) 🔄**
- **Follow Users:**
  - Users can follow and unfollow other users.
- **View Followers:**
  - Users can see their followers and who they follow.

---

### **8. Leaderboards & Achievements 🏆**
- **Leaderboard Tracking:**
  - Weekly leaderboards highlight top recipe creators and XP earners.
- **Achievements & Badges:**
  - Users earn milestones (e.g., first recipe added, reaching 1,000 XP).

---

## **🌟 Bonus Features (If Time Allows)**

### **9. Notifications System 🔔**
- **Follow Alerts:**
  - Users receive a notification when someone follows them.
- **Favorites Alerts:**
  - Users get notified when their recipe is favorited.

---

### **10. Search & Filtering 🔎**
- **Search Functionality:**
  - Users can search for recipes, users, and shopping lists.
- **Filters:**
  - Sort by popularity, dietary preferences, and preparation time.

---

### **11. AI Integration (Future Feature) 🤖**
- **Smart Recipe Suggestions:**
  - AI recommends meals based on pet diet history.
- **Auto-Generated Shopping Lists:**
  - AI compiles ingredient lists for balanced meals.

---

## **Technical Stack**
- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React, Redux, Vite
- **Authentication:** JSON Web Tokens (JWT)
- **Database ORM:** Sequelize
- **Deployment:** Render
- **External APIs:** Pet nutrition API (future feature)

---

## **MVP Goals**
- **Usability:** Ensure a simple, intuitive, and engaging user experience.
- **Performance:** Optimize for fast response times and smooth UI interactions.
- **Scalability:** Structure the backend to support future expansions and additional features.
- **Gamification:** Encourage engagement through XP, leaderboards, and pet evolution.

---

## **Timeline**
| **Phase**   | **Tasks**                                   | **Duration**  |
|-------------|---------------------------------------------|---------------|
| **Planning** | Finalize schema, wireframes, and API docs   | 1-2 days      |
| **Backend**  | Implement backend routes and database setup | 3-4 days      |
| **Frontend** | Implement UI components and forms           | 4-5 days      |
| **Integration** | Implement XP system, pet evolution       | 2 days        |
| **Testing**  | Unit tests, manual testing                  | 2 days        |
| **Deployment** | Deploy app to Render and Netlify          | 1 day         |

---

## **MVP Success Criteria**
- Users can create, update, and delete recipes and shopping lists.
- XP and pet evolution system functions correctly.
- Users can follow others, favorite recipes, and interact with the leaderboard.
- The app runs smoothly with no major errors after testing.

---