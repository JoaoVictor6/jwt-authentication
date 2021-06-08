import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../models/User";

class UserController{
  async store(req: Request, res: Response){
    const repository = getRepository(User)
    const { email, password } = req.body

    const userAlreadyExists = await repository.findOne({ where: {email} })

    if(userAlreadyExists){
      return res.sendStatus(409)
    }

    const user = repository.create({ email, password })
    await repository.save(user)

    res.json(user)
  }
}

export default new UserController()