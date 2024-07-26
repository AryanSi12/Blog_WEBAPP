import conf from "../conf/conf";
import { Client,Databases,Storage,Query,ID } from "appwrite";
export class Service{
    client=new Client();
    database;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,Image,status,UserId})
    {
        try{
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    Image,
                    UserId,
                    status,
                    slug,
                }
            )
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async updatePost(slug,{title,Image,status,content,Likes,Dislikes,LikedBy,DislikedBy})
    {
        try{
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    Image,
                    status,
                    content,
                    Likes,
                    Dislikes,
                    LikedBy,
                    DislikedBy,
                }
            )
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async deletePost(slug)
    {
        try{
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    }

    async getPost(slug)
    {
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")])
    {
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch(error)
        {
            console.log(error);
        }

    }


    //File

    async uploadFiles(file)
    {
        try{
            return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
            )
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId)
    {
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch(error)
        {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service=new Service();
export default service;
