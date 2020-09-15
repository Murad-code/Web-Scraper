const express = require('express');
const { scraper } = require('./scraper.js');
const userSchema = require('../model/model.js');

exports.addFavourite = async (req, res, next) => {
  const { email, favourites } = req.body;

  try {
    await userSchema.create({ email: email, favourites: favourites });
    return res.status(200).json({
      success: true,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    }
  }

  // res.status(200).json({
  //   status: true,
  //   favourites: favourites,
  //   title: favourites[0],
  //   price: favourites[1],
  //   imgUrl: favourites[2]
  // })

}

exports.updateFavourites = async (req, res, next) => {
  try {
    const { email, favourites } = req.body;

    const result = await userSchema.updateOne({ email: email }, { $set: { favourites: favourites } });

    return res.status(200).json({
      update: true,
      user: result
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        update: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error: ' + err
      });
    }
  }
}

exports.getFavourites = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userFavourites = await userSchema.find({ email: email });
    if (userFavourites.length === 0) {
      return res.status(200).json({
        success: false,
        data: userFavourites
      })
    } else {
      return res.status(200).json({
        success: true,
        favourites: userFavourites
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error: ' + err
    })
  }
}
