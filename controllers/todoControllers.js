const express = require("express");
const Todo = require("./../models/todoModel");

exports.getToDoHandler = async (req, res) => {
  try {
    //Removing the special params from the query object
    const specialParams = ["page", "sort", "limit", "field"];
    let queryObj = { ...req.query };
    specialParams.forEach((ele) => delete queryObj[ele]);

    //filtering
    let query = Todo.find(queryObj);

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    //field limiting
    if (req.query.fields) {
      const selectBy = req.query.fields.split(",").join(" ");
      query = query.select(selectBy);
    } else {
      queryObj = query.select("-__v");
    }

    //pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 50;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      if (skip >= (await Todo.countDocuments())) {
        throw new Error(
          "Cannot skip more than the number of available documents"
        );
      }
    }

    const response = await query;

    //if no documents found for request throw error
    if (response.length < 1) {
      throw new Error("No documents found");
    }

    res.status(200).json({ status: "success", data: response });
  } catch (err) {
    console.log(err); ///*************remove
    res.status(404).json({ status: "failed", message: err });
  }
};

exports.postTodoHandler = async (req, res) => {
  try {
    const response = await Todo.create(req.body);
    res.status(200).json({ status: "success", data: response });
  } catch (err) {
    console.log(err); ///*************remove
    res.status(404).json({ status: "failed", message: err });
  }
};

exports.putTodoHandler = async (req, res) => {
  try {
    const response = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({ status: "success", data: response });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "failed", message: err });
  }
};
