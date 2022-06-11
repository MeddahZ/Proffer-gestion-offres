const express = require('express')
const router = express.Router()
const Offer = require('../models/offer')
const auth = require('../middleware/auth')
// const multer = require('multer')
// const Sharp = require('sharp')


router.post('/offers/add', auth, async (req,res) => {
    const offer = new Offer({
        ...req.body,
        owner: req.admin._id
    
    })

    try{
        await offer.save()
        res.status(201).send(offer)

    } catch(e) {
        res.status(400).send(e)

    }
})

//GET /offers?limit=10&skip=20
//GET /offers?sortBy=createdAt_asc
router.get('/offers', auth, async (req,res) => {
    const sort = {}

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        //const lots = await Lot.find({})
        await req.admin.populate({
            path: 'offers',
            options: {
                limit : parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.admin.offers)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/offers/:id', auth, async (req,res) =>{
    const _id = req.params.id
    try{
        // const offer = await Offer.findById(req.params.id)
        const offer = await Offer.findOne({_id, owner: req.admin._id})
        if(!offer) {
            return res.status(404).send()
        }

        res.send(offer)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/offers/edit/:id', auth, async(req,res) =>{
    updates = Object.keys(req.body)
    allowedUpdates = ['name','dDay']
    isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate) {
        res.status(400).send({error: 'unvalid update!'})
    }
    try {
        //const offer = await Offer.findById(req.params.id)
        const offer = await Offer.findOne({ _id: req.params.id, owner: req.admin._id })
        if (!offer) {
            return res.status(404).send()
        }
        updates.forEach((update) => offer[update] = req.body[update]);
        await offer.save()

        res.send(offer)

    } catch (e) {
        res.status(400).send()
        
    }
})

router.delete('/offers/delete/:id', auth, async(req,res) => {
    try {
        //const offer = await Offer.findByIdAndDelete(req.params.id)
        const offer = await Offer.findOneAndDelete({ _id: req.params.id, owner: req.admin._id })
        if(!offer) {
            return res.status(404).send()
        }
        return res.send(offer)

    } catch (error) {
        res.status(500).send()
    }
    
})



module.exports = router