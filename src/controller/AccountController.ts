import { Request, Response } from "express"
import { AccountDatabase } from "../database/AccountDatabase"
import { Account } from "../models/Account"
import { AccountDB, AccountDBPost } from "../types"
import { AccountBusiness } from "../business/AccountBusiness"

export class AccountController {
    public getAccounts = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const accountBusiness = new AccountBusiness()
            const accountDatabase = new AccountDatabase()

            const balance = await accountBusiness.getAccountBalance(id)
    
            res.status(200).send({balance})
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getAccountBalance = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
    
            const accountDatabase = new AccountDatabase()
            const accountDB = await accountDatabase.findAccountById(id)
    
            res.status(200).send({ accountDB })
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createAccount = async (req: Request, res: Response) => {
        try {
            const { id, owner_id }: AccountDBPost = req.body
            const input = {
                id,
                owner_id
            }

            const accountBusiness = new AccountBusiness()
            const result = await accountBusiness.createAccount(input)
    
            res.status(201).send("Pessoa usuária criada com sucesso!")
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editAccountBalance = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const value = req.body.value

            const accountBusiness = new AccountBusiness()
            const result = await accountBusiness.editAccountBalance({id, value})
            
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}