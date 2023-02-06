import { AccountDatabase } from "../database/AccountDatabase"
import { Account } from "../models/Account"
import { AccountDB } from "../types"


export class AccountBusiness{
    //atributos
    //método get
    public async getAccounts(){
        const accountDatabase = new AccountDatabase()
        const accountsDB: AccountDB[] = await accountDatabase.findAccounts()

        const accounts = accountsDB.map((accountDB) => new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        ))
        return accounts
    }

    //metodo post
    public async createAccount(input: any){
        const { id, ownerId } = input
    
            if (typeof id !== "string") {
                throw new Error("'id' deve ser string")
            }
    
            if (typeof ownerId !== "string") {
                throw new Error("'ownerId' deve ser string")
            }
    
            const accountDatabase = new AccountDatabase()
            const accountDBExists = await accountDatabase.findAccountById(id)
    
            if (accountDBExists) {
                throw new Error("'id' já existe")
            }
    
            const newAccount = new Account(
                id,
                0,
                ownerId,
                new Date().toISOString()
            )
    
            const newAccountDB: AccountDB = {
                id: newAccount.getId(),
                balance: newAccount.getBalance(),
                owner_id: newAccount.getOwnerId(),
                created_at: newAccount.getCreatedAt()
            }
    
            await accountDatabase.insertAccount(newAccountDB)
        return newAccount
    }

    //metodo get para balance
    public async getAccountBalance(id: any){

            const accountDatabase = new AccountDatabase()
            const accountDB = await accountDatabase.findAccountById(id)
    
            if (!accountDB) {
                throw new Error("'id' não encontrado")
            }
    
            const account = new Account(
                accountDB.id,
                accountDB.balance,
                accountDB.owner_id,
                accountDB.created_at
            )
    
            const balance = account.getBalance()
        return balance
    }
}