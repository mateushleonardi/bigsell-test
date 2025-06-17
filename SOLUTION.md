# **Solution Description**
This fullstack project (Node.js + React) was designed with performance, scalability, and clean code in mind. Below is a breakdown of each requirement and how it was solved:

# 🛠 Backend (Node.js)
## 🔄 Refactor Blocking I/O
The initial code used fs.readFileSync. I refactored it to use fs.promises.readFile with async/await, making file reads non-blocking and more efficient.

## 🚀 Stats Caching
The GET /api/stats endpoint recalculated data on every request. I added in-memory caching, invalidated via fs.watchFile, so the stats only refresh when the data file changes. This boosts performance significantly.

## 🧪 Testing
I added Jest unit tests for the item routes:

Happy paths (GET /items, GET /items/:id)

Error cases (not found, file read errors)

# 💻 Frontend (React)
## 🧼 Memory Leak Fix
The Items.js component could cause a memory leak if the fetch completed after unmount. I used AbortController and properly cleaned up the useEffect.

## 🔎 Pagination + Search
Implemented server-side pagination and search using the ?q= parameter. The frontend queries with filters and pagination, and the backend responds accordingly.

## ⚡ Performance with Virtualization
I integrated react-window to virtualize the item list and ensure smooth scrolling even with large datasets.

## 🎨 UI/UX Polish
Used Material UI (MUI) for consistent styling. Added loading states, accessibility improvements, and better UX throughout the interface.