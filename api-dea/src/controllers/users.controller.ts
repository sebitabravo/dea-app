import { Request, Response } from "express";
import { connect } from "../db";
import { User } from "../interface/User.js";

const table = 'employees'

export const getEmployees = async (_: Request, res: Response) => {
    try {
        const pool = await connect();
        const [result] = await pool.query(`SELECT * FROM ${table} GROUP BY id`)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const createEmployee = async (req: Request, res: Response) => {
    const newEmployee: User = req.body.employee;
    console.log(newEmployee);

    return res.json({
        message: 'Employee created',
    })
}

