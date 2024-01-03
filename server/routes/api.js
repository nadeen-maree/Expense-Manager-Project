const express = require('express')
const router = express.Router()
const moment = require('moment')

const Expense = require('../model/Expense')

router.get('/expenses', (req, res) => {
    const { d1, d2 } = req.query
    const currentDate = moment()
  
    const date1 = d1 ? moment(d1, 'YYYY-MM-DD') : null
    const date2 = d2 ? moment(d2, 'YYYY-MM-DD') : null
  
    let query = {}
  
    if (date1 && date2) {
      query = { date: { $gte: date1.toDate(), $lte: date2.toDate() } }
    } else if (date1) {
      query = { date: { $gte: date1.toDate(), $lte: currentDate.toDate() } }
    }
  
    Expense.find(query)
      .sort({ date: 'desc' })
      .then((expenses) => {
        res.send(expenses)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
})

  
router.post('/expense', (req, res) => {
    const { item, amount, group, date } = req.body
  
    const formattedDate = date ? moment(date, 'YYYY-MM-DD').format('LLLL') : moment().format('LLLL')
  
    const newExpense = new Expense({
      item,
      amount,
      group,
      date: formattedDate,
    })
  
    newExpense.save()
      .then((expense) => {
        console.log(`Expense of $${expense.amount} for ${expense.item} added to ${expense.group}`)
        res.status(201).json(expense)
      })
      .catch((err) => {
        res.status(400).json({ message: err.message })
      })
})

router.put('/update/:group1/:group2', (req, res) => {
    const { group1, group2 } = req.params
  
    Expense.findOne({ group: group1 })
      .then((expense) => {
        if (!expense) {
          res.status(404).send('Expense not found for the specified group')
        } else {
          expense.group = group2
          return expense.save()
        }
      })
      .then((updatedExpense) => {
        if (updatedExpense) {
          res.send(`Expense ${updatedExpense.item} group changed to ${group2}`)
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
})

router.get('/expenses/:group', (req, res) => {
    const { group } = req.params;
    const total = req.query.total === 'true'
  
    if (total) {
      Expense.aggregate([
        { $match: { group } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
      ])
        .then((result) => {
          if (result.length > 0) {
            res.json({ totalAmount: result[0].totalAmount })
          } else {
            res.json({ totalAmount: 0 })
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message })
        })
    } else {
      Expense.find({ group })
        .then((expenses) => {
          res.json(expenses)
        })
        .catch((err) => {
          res.status(500).json({ message: err.message })
        })
    }
  })


module.exports = router