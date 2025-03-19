import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";





const createRepository = async (req, res) => {
    const {owner, name, description, content, visibility, issues} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        if(!mongoose.Types.ObjectId.isValid(owner)){
            return res.status(httpStatus.BAD_REQUEST).send("Invalid owner id");
        }
        if(!name){
            return res.status(httpStatus.BAD_REQUEST).send("Name is required");
        }
        const newRepository = new Repository({
            owner,
            name,
            description,
            content,
            visibility,
            issues
        });
        const repository = await newRepository.save();
        res.status(httpStatus.CREATED).send({
            message: "Repository created successfully",
            repositoryId: repository._id
        });
    }catch(err){
        console.error("Error while creating repository",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getAllRepositories = async (req, res) => {
    try{
        const repositories = await Repository.find().populate("owner").populate("issues");
        res.status(httpStatus.OK).send(repositories);
    }catch(err){
        console.error("Error while fetching repositories",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const fetchRepositoryById = async (req, res) => {
    const repositoryId = req.params.id;
    try{
        const repository = await Repository.findById(repositoryId).populate("owner").populate("issues");
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        res.status(httpStatus.OK).send(repository);
    }catch(err){
        console.error("Error while fetching repository by id",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const fetchRepositoryByName = async (req, res)=>{
    const repositoryName = req.params.name;
    try{
        const repository = await Repository.findOne({
            name: repositoryName
        }).populate("owner").populate("issues");    
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        res.status(httpStatus.OK).send(repository);
    }
    catch(err){
        console.error("Error while fetching repository by name",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const fetchRepositoriesForCurrentUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const repositories = await Repository.find({
            owner: userId
        }).populate("owner").populate("issues");
        if(!repositories || repositories.length === 0){
            return res.status(httpStatus.NOT_FOUND).send("Repositories not found");
        }
        res.status(httpStatus.OK).send(repositories);
    }catch(err){
        console.error("Error while fetching repository for current user",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


const updateRepositoryById = async (req, res) => {
    const repositoryId = req.params.id;
    const { name, description, content, visibility, issues } = req.body;
    try{
        const repository = await Repository.findById(repositoryId);
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        await Repository.findByIdAndUpdate(repositoryId, {
            name,
            description,
            content,
            visibility,
            issues
        });
        res.status(httpStatus.OK).send("Repository updated successfully");
    }
    catch(err){
        console.error("Error while updating repository",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const toggleVisibilityById = async (req, res) => {
    const repositoryId = req.params.id;
    try{
        const repository = await Repository.findById(repositoryId);
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        const visibility = repository.visibility === "public" ? "private" : "public";
        await Repository.findByIdAndUpdate(repositoryId, {
            visibility
        });
        res.status(httpStatus.OK).send("Visibility updated successfully");
    }
    catch(err){
        console.error("Error while updating visibility",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


const deleteRepositoryById = async (req, res) => {
    const repositoryId = req.params.id;
    try{
        const repository = await Repository.findById(repositoryId);
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        await Repository.findByIdAndDelete(repositoryId);
        res.status(httpStatus.OK).send("Repository deleted successfully");
    }
    catch(err){
        console.error("Error while deleting repository",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


export {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById
}
