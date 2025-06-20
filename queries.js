//Task 2 - Basic CRUD operations
// 📘 Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// 📗 Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// 📕 Find books by a specific author
db.books.find({ author: "George Orwell" })

// 💰 Update the price of a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 14.99 } }
)

// ❌ Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })


//Task 3 - Advanced queries
// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: show only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort by price ascending
db.books.find().sort({ price: 1 })

// Sort by price descending
db.books.find().sort({ price: -1 })

// Pagination: 5 books per page
db.books.find().skip(0).limit(5) // Page 1
db.books.find().skip(5).limit(5) // Page 2


//Task  4 - Aggregation Pipelines
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [ { $toString: { $multiply: ["$_id", 10] } }, "s" ] },
      count: 1
    }
  }
])


//Task 5 - Indexing
// Create index on title
db.books.createIndex({ title: 1 }) 

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to show query performance improvement
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")
