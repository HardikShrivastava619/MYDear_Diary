import mongoose from "mongoose"
import entryModel from "../models/entryModel.js"
import  fs from "fs"



export const writingDiaryController = async (req, res) => {
  try {
    const { todayStory, special, date, user, rating } = req.fields;
    const { photos } = req.files;


    const userId = new mongoose.Types.ObjectId(user);

    const enteredEntry = await entryModel.findOne({ date, user: userId });
    if (enteredEntry) {
      return res.status(404).send({
        success: false,
        message: "You have already done entry for this date",
      });
    }

    if (!todayStory) {
      return res.status(500).send({ success: false, message: 'todayStory is required' });
    }
    if (!date) {
      return res.status(500).send({ success: false, message: 'date is required' });
    }

    const entry = new entryModel({ ...req.fields, user: userId });

    if (photos) {
      const photoArray = Array.isArray(photos) ? photos : [photos]; // Ensure photos is an array
      entry.photos = photoArray.map((photo) => ({
        data: fs.readFileSync(photo.path),   // Read the file content
        contentType: photo.type,             // Get the MIME type of the photo
      }));
    }

    await entry.save();

    res.status(200).send({
      success: true,
      message: "Great! Your Today's Memory is now safe with us 👌",
      entry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server side error in entry 🙁",
    });
  }
};

 export const getOldMemoriesController = async(req,res)=>{

try {
   const oldEntries = await entryModel.find({user}).populate("user")
   res.status(200).send({
      success:true,
      message:"old Entries are get",
      oldEntries
   })
} catch (error) {
   console.log(error)
   console.log(error)
        res.status(500).send({
            success:false,
            message:"Server side  error in getting old entries 🙁 "
        })
   
}

 }


 export const getEnteredDatesController = async (req,res) =>{
   try {

const uid = new mongoose.Types.ObjectId(req.params.uid)
 
      const entries = await entryModel.find({user:uid}).sort({date:-1})
      res.status(200).send({
         success:true,
         message:"old Entries are taken",
         entries 
      })  
   } catch (error) {
      console.log(error)
      res.status(500).send({
           success:false,
            message:"Server side  error in getting old entries 🙁"
      })
      
   }
 }


 export const getEnteriesController = async(req,res)=>{
   try {
   const {eid} = req.params 
   
   const  entry  =  await  entryModel.findOne( { _id: eid } )
res.status(202).send({
   success:true,
   message:"entry is recieved",
   entry
})} catch (error) {
   console.log(error);
  res.status(500).send({
   success:false,
   message:"error in server",
   
  }) 
}


 }





 export const getphotoController = async (req,res) => {
  try {
    const eid = new mongoose.Types.ObjectId(req.params.id)
    
        if (!eid) {
          return res.status(400).send({
            success: false,
            message: "ID is required",
          });
        }
    
        if (!mongoose.Types.ObjectId.isValid(eid)) {
          return res.status(400).send({
            success: false,
            message: "Invalid ID format",
          });
        }
    
        const entry = await entryModel.findById(eid).select("photos");
    
        if (!entry) {
          return res.status(404).send({
            success: false,
            message: "Entry not found",
          });
        }
        if (!entry.photos || entry.photos.length === 0) {
          return res.status(404).send({
            success: false,
            message: "No photos found",
          });
        }
        const photosArray = entry.photos.map((photo) => ({
          contentType: photo.contentType,
          data: photo.data.toString("base64"), // Convert binary data to Base64
           id:photo._id
        }));

        res.status(200).send({
        success: true,
        message: "Photos fetched successfully",
        photosArray,
          
        });
        } catch (error) {
        console.error(error);
        res.status(500).send({
        success: false,
        message: "Error while getting photos",
        error,
        });
      }}


 export const deleteEntryController =async (req,res)=>{

   try {
const {id}  =  req.params
      const deletedentry = await entryModel.findByIdAndDelete(id)
      res.status(200).send({
           message:`Entry Deleted Succesfully `  ,
            success:true,
         })
   }catch(error){
      console.log(error)
      res.status(500).send({
         message:" Server error in Deleting Entry",
         success:false,
         error})
      
   }
 }






 export const  editEnteryController =async (req,res)=>{

  try {

    const { todayStory, special, date, user, rating } = req.fields;
    const { photos } = req.files;
    const {eid}  =  req.params

    if (!todayStory) {
      return res.status(500).send({ success: false, message: 'todayStory is required' });
    }
    if (!date) {
      return res.status(500).send({ success: false, message: 'date is required' });
    }if (!user) {
      return res.status(500).send({ success: false, message: 'user is required' });
    }
console.log(rating)


const userID = new mongoose.Types.ObjectId(user)
     const editentry = await entryModel.findById(eid )

     if (!editentry) {
  return res.status(404).send({message:"entry not found"})
}

editentry.todayStory = todayStory
editentry.special = special
editentry.date = date
editentry.user = userID
editentry.rating = rating


if (photos) {
  const photoArray = Array.isArray(photos) ? photos : [photos]; // Ensure photos is an array
  const newPhotos= photoArray.map((photo) => ({
    data: fs.readFileSync(photo.path),   // Read the file content
    contentType: photo.type,             // Get the MIME type of the photo
  }));

  editentry.photos = [...editentry.photos, ...newPhotos];

}

// Save the entry to the database
await editentry.save();


     res.status(200).send({
          message:`Your have edited entry Succesfully `  ,
           success:true,
           editentry
        })
  } catch (error) {
     console.log(error)
     res.status(500).send({
        message:" Server error in editing Entry",
        success:false,
        error})
     
  }
}
 
export const getSearcheDatesController = async (req, res) => {
  try {
    const { isoDate } = req.body;
    const { uid } = req.params;

    const userID = new mongoose.Types.ObjectId(uid);

    // Perform the search query
    const searchEntry = await entryModel.findOne({ date: isoDate, user: userID });

    if (!searchEntry) {
      return res.status(404).send({ success: false, message: "Entry with this date does not exist"  });
    }

    res.status(202).send({
      success: true,
      message: "Here is your entry",
      searchEntry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server Error in Searching",
    });
  }
};


export const imgRemoverController = async (req, res) => {
  const { eid } = req.params; // Entry ID
  const { photoidToRemove } = req.body; // ID of the photo to remove

  try {
    // Find the entry by its ID
    const entry = await entryModel.findById(eid);

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Entry not found' });
    }

    // Remove the photo with the given photoId
    const photoIndex = entry.photos.findIndex(photo => photo._id.toString() === photoidToRemove);

    if (photoIndex === -1) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }

    // Remove the photo from the photos array
    entry.photos.splice(photoIndex, 1);

    // Save the updated entry
    await entry.save();

    return res.status(200).json({ success: true, message: 'Photo removed successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error removing photo' });
  }};
