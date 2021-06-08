import { Request, response, Response } from "express"
import { getRepository } from "typeorm"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/User"

class AuthController{
  index(req: Request, res: Response){ 
    return res.send({user: req.userId})
   }

  async authenticate(req: Request, res: Response){
    const repository = getRepository(User)
    const { email, password } = req.body
    
    const user = await repository.findOne({ where: {email} })
    
    if(!user){
      return res.sendStatus(401)
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if(!isValidPassword){
      return res.sendStatus(401)
    }
    
    const token = jwt.sign({ id: user.id }, 
      'This string should be in DOTEN_ENV file and never must uploaded in github',
      { expiresIn: '10m' }
    )

    res.json({
      email: user.email,
      id: user.id,
      token
    })
  }
}

export default new AuthController()