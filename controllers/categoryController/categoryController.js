
const Category = require('../../models/category.model');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../../errors');
const dummyCategory = require('../../db/dumy.catgory');


const getAllCategory = async(req, res)=>{
  const categories = await Category.find();
  console.log(categories);
  res.status(StatusCodes.OK).json({categories})
}

const createCatgory = async(req, res)=>{
  const {name} = req.body;
  const category = await Category.create({name})
  res.status(StatusCodes.OK).json({category});
}


// importing dummy category Hit this route only one for sample category
const populateCategory = async(req, res)=>{
  const dataset = dummyCategory.map(val=>{
    const {id, ...data} = val;
    // console.log(typeof data);
    return {
      ...data
    }
  })
  // console.log(data)
  await Category.insertMany(dataset);
  res.status(StatusCodes.OK).json({
    messgae: "successfully populated",
  })
}

module.exports ={
  getAllCategory,
  createCatgory,
  populateCategory,
}