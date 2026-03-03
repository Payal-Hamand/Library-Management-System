const Book = require("../models/book");


exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        success: false,
        message: "Title, author and publishedYear are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      publishedYear,
    //   status: "available",
    });

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};


exports.getBooks = async (req, res) => {
  try {
   
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};



exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        success: false,
        message: "Title, author and publishedYear are required",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;

    await book.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};



exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["available", "borrowed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'available' or 'borrowed'",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.status = status;
    await book.save();

    return res.status(200).json({
      success: true,
      message: `Book marked as ${status}`,
      data: book,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};


