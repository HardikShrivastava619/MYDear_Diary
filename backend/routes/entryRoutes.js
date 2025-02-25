import express from 'express'
import { deleteEntryController, editEnteryController, getEnteredDatesController, getEnteriesController, getOldMemoriesController, getphotoController, getSearcheDatesController, imgRemoverController, writingDiaryController } from '../controllers/entryController.js'
import formidable from 'express-formidable'
import { requireSignIn } from '../Middlwares/authMiddleware.js';


const router  = express.Router()


router.post("/writingDiary", requireSignIn,formidable({ multiples: true }), writingDiaryController);

router.get("/getOldMemories/:uid" , getOldMemoriesController)

router.get('/getEnteredDates/:uid' , getEnteredDatesController)

router.get('/getEnteries/:eid' , getEnteriesController)

router.get("/entryPhoto/:id" ,  getphotoController )

router.delete("/deleteentry/:id" ,  deleteEntryController )

router.post('/editEnteries/:eid', formidable({ multiples: true }) , editEnteryController)

router.post('/getSearcheDates/:uid'  , getSearcheDatesController  )

router.post( '/imgRemover/:eid' ,  imgRemoverController )

export default router
