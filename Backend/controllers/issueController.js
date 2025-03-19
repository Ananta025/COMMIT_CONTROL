import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import { validationResult } from "express-validator";
import httpStatus from "http-status";


const createIssue = async (req, res) => {
    const repositoryId = req.params.id;
    const { title, description, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        if(!mongoose.Types.ObjectId.isValid(repositoryId)){
            return res.status(httpStatus.BAD_REQUEST).send("Invalid repository id");
        }
        if(!title){
            return res.status(httpStatus.BAD_REQUEST).send("Title is required");
        }
        const newIssue = {
            title,
            description,
            status
        };
        const repository = await Repository.findById(repositoryId);
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        repository.issues.push(newIssue);
        await repository.save();
        res.status(httpStatus.CREATED).send({
            message: "Issue created successfully",
            issueId: newIssue._id
        });
    }catch(err){
        console.error("Error while creating issue",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};


const updateIssueById = async (req, res) => {
    const issueId = req.params.id;
    const { title, description, status} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        if(!mongoose.Types.ObjectId.isValid(issueId)){
            return res.status(httpStatus.BAD_REQUEST).send("Invalid issue id");
        }
        if(!title){
            return res.status(httpStatus.BAD_REQUEST).send("Title is required");
        }
        const issue = await Issue.findById(issueId);
        if(!issue){
            return res.status(httpStatus.NOT_FOUND).send("Issue not found");
        }
        issue.title = title;
        issue.description = description;
        issue.status = status;
        await issue.save();
        res.status(httpStatus.OK).send({
            message: "Issue updated successfully",
            issueId: issue._id
        });
    }catch(err){
        console.error("Error while updating issue",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const deleteIssueById = async (req, res) => {
    const issueId = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(issueId)){
            return res.status(httpStatus.BAD_REQUEST).send("Invalid issue id");
        }
        const issue = await Issue.findByIdAndDelete(issueId);
        if(!issue){
            return res.status(httpStatus.NOT_FOUND).send("Issue not found");
        }
        res.status(httpStatus.OK).send({
            message: "Issue deleted successfully",
            issueId: issue._id
        });
    }catch(err){
        console.error("Error while deleting issue",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getAllIssuesByRepositoryId = async (req, res) => {
    const repositoryId = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(repositoryId)){
            return res.status(httpStatus.BAD_REQUEST).send("Invalid repository id");
        }
        const repository = await Repository.findById(repositoryId).populate("issues");
        if(!repository){
            return res.status(httpStatus.NOT_FOUND).send("Repository not found");
        }
        res.status(httpStatus.OK).send(repository.issues);
    }catch(err){
        console.error("Error while fetching issues",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
};

const getIssueById = async (req, res) => {
    const issueId = req.params.id;
    try{
        if(!mongoose.Types.ObjectId.isValid(issueId)){
            return res.status(httpStatus.BAD_REQUEST).send("Invalid issue id");
        }
        const issue = await Issue.findById(issueId);
        if(!issue){
            return res.status(httpStatus.NOT_FOUND).send("Issue not found");
        }
        res.status(httpStatus.OK).send(issue);
    }catch(err){
        console.error("Error while fetching issue by id",err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
}

export {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssuesByRepositoryId,
    getIssueById
}