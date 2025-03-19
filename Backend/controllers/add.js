import fs from "fs/promises";
import path from "path";



export const addFile = async (filePath) => {
    const repoPath = path.resolve(process.cwd(), ".repo");
    const stagingPath = path.join(repoPath, "staging");
    try{
        await fs.mkdir(stagingPath, {recursive: true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added successfully`);
    }catch(err){
        console.log("Error in adding file",err);
    }
};