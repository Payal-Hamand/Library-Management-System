const router = require("express").Router();
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  updateStatus,
} = require("../controllers/bookController");

const { authenticate, authorize } = require("../middlware/authMiddlware");


router.get("/get", authenticate, getBooks);
router.post("/", authenticate, authorize(["admin"]), createBook);
router.put("/:id", authenticate, authorize(["admin"]), updateBook);
router.delete("/:id", authenticate, authorize(["admin"]), deleteBook);
router.patch("/:id/status", authenticate, updateStatus);

module.exports = router;