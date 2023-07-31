import { Request, Response } from "express";
import { AccountDatabase } from "../database/AccountDatabase";
import { Account } from "../models/Account";
import { AccountDB } from "../types";
import { AccountBusiness } from "../business/AccountBusiness";

export class AccountController {
  public getAccounts = async (req: Request, res: Response) => {
    try {
      const accountBusiness = new AccountBusiness();
      const output = await accountBusiness.getAccounts();

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public getAccountBalance = async (req: Request, res: Response) => {
    try {
      const id: any = {
        id: req.params.id,
      };
      const accountBussiness = new AccountBusiness();
      const output = await accountBussiness.getBalance(id);
      res.status(200).send({ output });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createAccount = async (req: Request, res: Response) => {
    try {
      const input: any = {
        id: req.body.id,
        ownerId: req.body.ownerId,
      };

      const accountBussiness = new AccountBusiness();
      const output = await accountBussiness.createAccount(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public editAccountBalance = async (req: Request, res: Response) => {
    try {
      const input: any = {
        id: req.params.id,
        value: req.body.value,
      };
      const accountBussiness = new AccountBusiness();
      const output = await accountBussiness.editAccount(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
};