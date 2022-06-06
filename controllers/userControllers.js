const express = require("express");
const User = require("./../models/usersModel");

exports.getUsersHandler = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json({ status: "success", data: response });
  } catch (err) {
    res.status(400).json({ status: "failure", message: err });
  }
};

exports.createUserHandler = async (req, res) => {
  try {
    const response = await User.create(req.body);
    res.status(200).json({ status: "success", data: response });
  } catch (err) {
    res.status(400).json({ status: "failure", message: err });
  }
};

exports.updateUserHabndler = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({ status: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "failed", message: err });
  }
};
