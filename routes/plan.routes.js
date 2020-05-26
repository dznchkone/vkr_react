const {Router} = require('express')
const Plan = require('../models/Plan')
const router = Router()
const auth = require('../middleware/auth.middleware')


router.post(
  '/create', 
  auth, 
  async (req, res)=>{
  try {

    const {name, price, description} = req.body

    const plan = new Plan({name, price, description})

    await plan.save()
    
    res.status(201).json({message: 'Тариф создан'})

  } catch (e) {
    
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/', async (req, res)=>{
  try {
    const plans = await Plan.find()
    res.json(plans)

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.get('/:id', async (req, res)=>{
  try {
    const plan = await Plan.findById(req.params.id)
    res.json(plan)

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.post('/delete/:id', auth, async (req, res) =>{
  try {
    
    const plan = await Plan.deleteOne({_id: req.params.id})
    res.json({message: "Запись удалена"})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})

router.post('/edit/:id', auth, async (req, res) =>{
  try {
    
    const {name, price, description} = req.body

    const plan = await Plan.findById(req.params.id)

    plan.name = name
    plan.price = price
    plan.description = description

    plan.save()

    res.json({message: "Запись изменена"})

  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
  }
})



module.exports = router