const Sauce = require('../models/sauce');
const fs = require('fs');

exports.likeSauce = (req, res, next) => {
    // let sauce = new Sauce({ _id: req.params.id });
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            console.log(req.body.like);
            if (req.body.like == 1) {
                    sauce.likes++;
                    sauce.usersLiked.push(req.body.userId);
                
                // Sauce.findOne({ _id: req.params.id }).then(
                //     (sauce) => {
                //         sauce.likes++;
                //         sauce.usersLiked.push(req.body.userId);
                //         // console.log(sauce.usersLiked);
                //         res.status(201).json({
                //             message: 'Post liked!'
                //         });
                //         // for (i = 0; i < sauce.usersLiked.length; i++) {
                //         //     if (req.body.id == usersLiked[i]) {
        
                //         //     };
                //         // };
                //     }
        
                // ).catch(
                //     (error) => {
                //         res.status(400).json({
                //             error: error
                //         });
                //     }
                // );
        
            } else if (req.body.like == -1) {
                console.log('Like: ', sauce.dislikes);
                sauce.dislikes++;
                sauce.usersDisliked.push(req.body.userId);
                console.log(sauce);
        
                // Sauce.findOne({ _id: req.params.id }).then(
                //     (sauce) => {
                //         sauce.dislikes++;
                //         sauce.usersDisliked.push(req.body.userId);
                //         // console.log(sauce.usersLiked);
                //         res.status(201).json({
                //             message: 'Post liked!'
                //         });
                //         // for (i = 0; i < sauce.usersLiked.length; i++) {
                //         //     if (req.body.id == usersLiked[i]) {
        
                //         //     };
                //         // };
                //     }
        
                // ).catch(
                //     (error) => {
                //         res.status(400).json({
                //             error: error
                //         });
                //     }
                // );
        
            } else {
                console.log('Like: ', 'Neutral!');
                
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        let idKeyStart = sauce.usersLiked.indexOf(req.body.userId);
                        let idKeyEnd = idKeyStart + 1;
                        // console.log(idKeyEnd, sauce.usersLiked);
                        sauce.usersLiked.splice(idKeyStart, idKeyEnd);
                        sauce.likes--;
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        let idKeyStart = sauce.usersDisliked.indexOf(req.body.userId);
                        let idKeyEnd = idKeyStart + 1;
                        // console.log(idKeyStart, sauce.usersDisliked);
                        sauce.usersDisliked.splice(idKeyStart, idKeyEnd);
                        sauce.dislikes--;
                    };
                    console.log(sauce);
                    
                // Sauce.findOne({ _id: req.params.id }).then(
                //     (sauce) => {
                //         if (sauce.usersLiked.includes(req.body.userId)) {
                //             let idKey = sauce.usersLiked.indexOf(req.body.userId);
                //             sauce.usersLiked.splice(idKey, idKey);
                //             sauce.likes--;
                //         } else {
                //             let idKey = sauce.usersDisliked.indexOf(req.body.userId);
                //             sauce.usersDisliked.splice(idKey, idKey);
                //             sauce.dislikes--;
                //             sauce.users
                //         }
                //         res.status(201).json({
                //             message: 'Likes updated!'
                //         });
                //     }
                // ).catch(
                //     (error) => {
                //         res.status(400).json({
                //             error: error
                //         });
                //     }
                // );
            };
            Sauce.updateOne({ _id: req.params.id }, sauce).then(
                () => {
                    res.status(201).json({
                        message: 'Liked!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    );
};

exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        mainPepper: req.body.sauce.mainPepper,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Created!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    );
}

exports.updateSauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params.id });
    if (req.file) {
        // Sauce.findOne({ _id: req.body.id }).then(
        //     (sauce) => {
        //         console.log('line: 56', sauce);
        //         const filename = sauce.imageUrl.split('/images/')[1];
        //         fs.unlink('images/' + filename, () => {
        //             console.log('line: 59', 'Deleted Last Image');
        //         });
        //     }
        // ).catch(
        //     (error) => {
        //         console.log('line: 64', error);
        //     }
        // );
        
        // console.log('line: 68', sauce);
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            imageUrl: url + '/images/' + req.file.filename,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        };

    } else {
        sauce = {
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            imageUrl: req.body.imageUrl,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        };
    }

    //

    Sauce.updateOne({ _id: req.params.id }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('No such thing!')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
        }
    )
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
}

exports.allSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};