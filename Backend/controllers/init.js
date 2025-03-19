import fs from 'fs/promises';
import path from 'path';




export const initRepository = async ()=>{
    const repoPath = path.resolve(process.cwd(), ".repo");
    const commitsPath = path.resolve(repoPath, "commits");
    try{
        await fs.mkdir(repoPath, {recursive: true});
        await fs.mkdir(commitsPath, {recursive: true});
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({bucket: "s3 bucket"})
        )
        console.log("Repository initialized successfully");
    }catch(err){
        console.log("Error in initialize the repository",err);
    }
}




// export default {initRepository};