import { Request, Response  } from "express";
import { ParentService } from "../../services/ParentService";

const parentService = new ParentService();

export const createParent = async (req: Request, res: Response) => {
    try {
        const parent = await parentService.createParent(req.body);
        res.status(201).json({ message: "Parent created successfully", parent});
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllParents = async (_req: Request, res: Response) => {
    try {
        const parents = await parentService.getAllParents();
        res.status(200).json(parents);
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getParentById = async (req: Request, res: Response) => {
    try {
        const parent = await parentService.getParentById(Number(req.params.id));
        res.status(200).json(parent);
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const updateParent = async (req: Request, res: Response) => {
    try {
        const parent = await parentService.updateParent(Number(req.params.id), req.body);
        res.status(200).json({ message: "Parent updated successfully", parent });
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteParent = async (req: Request, res: Response) => {
    try {
        const result = await parentService.deleteParent(Number(req.params.id));
        res.status(200).json(result);
    }
    catch (err: any) {
        res.status(404).json({ error: err.message });
    }
};
