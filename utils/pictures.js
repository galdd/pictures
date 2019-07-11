// load libary
const { Picture } = require('../model/picture');
const multer = require('multer');
// Init multer 
const storage = multer.diskStorage({
    destination: './images',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage: storage,
}).single('image')

module.exports = {
    getPicture: (req, res) => {
        let pictureId = req.params.id;
        Picture.findOne({
            where: {id: pictureId},
          }).then(Picture => {
            console.log("Picture:", JSON.stringify(Picture, null, 2));
            return res.status(200).send(Picture);
        });

    },
    getPictures: (req, res) => {
        Picture.findAll().then(Picture => {
            console.log("All Pictures:", JSON.stringify(Picture, null, 2));
            return res.status(200).send(Picture);
        });
    },
    addPictures: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.log("err", err);
                res.send("err");
            } else {
                // If file is not selected
                if (req.file == undefined) {
                    res.send("req.file == undefined");
                }
                else {
                    
                    let title  = req.body.title;
                    let mimetype = req.file.mimetype.split('/')[1];
                    let filename = req.file.filename
                    let path = req.file.path
   
                    Picture.create({
                        
                        title: title,
                        filename: filename,
                        mimetype: mimetype,
                        file : path

                    }).then(function (Picture, error) {
                        if (Picture) {
                            console.log(Picture)
                            return res.status(200).send(Picture);
                        } else {
                            console.log("error", error)
                            return res.status(500).send(err);
                        }
                    });
                }
            }

        })
    },
    removePictures: (req, res) => {
        let pictureId = req.params.id;
        // return res.status(500).send(err);
        console.log(pictureId)

        Picture.destroy({
            where: {
                id: pictureId //this will be your id that you want to delete
            }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('Deleted successfully');
                return res.status(200).send("" + rowDeleted);
            }
        }, function (err) {
            console.log(err);
            return res.status(500).send(err);

        });
    },
    editPictures: (req, res) => {
        let pictureId = req.params.id;
        console.log(pictureId)
        Picture.update(
            { title: 'a ttw222' },
            { where: { id: pictureId } }
        ).then(function () {
            console.log(`Project with id = ${pictureId} updated successfully!`);
            return res.status(200).send(`${pictureId}`);
        }).error(function (err) {
            console.log("Project update failed !");
            return res.status(500).send(err);
        });


    },
    getFilename: (req, res) => {

        res.send("test")
    },
};
