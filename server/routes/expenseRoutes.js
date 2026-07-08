const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
 addExpense,
 getExpenses,
 deleteExpense
} = require("../controllers/expenseController");



// ADD EXPENSE
router.post(
"/add",
authMiddleware,
addExpense
);



// GET EXPENSES
router.get(
"/",
authMiddleware,
getExpenses
);



// DELETE EXPENSE  👈 ADD HERE
router.delete(
"/delete/:id",
authMiddleware,
deleteExpense
);



module.exports = router;