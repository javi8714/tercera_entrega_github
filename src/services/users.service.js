<<<<<<< HEAD
import { usersService } from "../dao/index.js";

export class UsersService{
    static getUserByEmail = async(email)=>{
        return await usersService.getByEmail(email)
    };

    static saveUser = async(newUser)=>{
        return await usersService.save(newUser)
    };

    static getUserByID = async(id)=>{
        return await usersService.getById(id);
=======
import { usersDao } from "../dao/managers/index.js";

export class UsersService{
    static getUserByEmail = async(email)=>{
        return await usersDao.getByEmail(email)
    };

    static saveUser = async(newUser)=>{
        return await usersDao.save(newUser)
    };

    static getUserByID = async(id)=>{
        return await usersDao.getById(id);
>>>>>>> e352251ab31b9a2df224bdcf58a0b0d77932742a
    };
}