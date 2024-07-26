import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    account;
    client=new Client();
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password});
            }
            else return userAccount
        }
        catch(error){
            throw error;
        }   
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("get current user error"+error);
        }
        return null;
    }

    async logout(current){
        try{
            await this.account.deleteSession(current);
        }
        catch(error){
            throw console.log("Logout"+error);
        }
    }
}

const authservice=new AuthService();

export default authservice
