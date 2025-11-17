import { Request, Response  } from "express";
import { ParentService } from "../../services/ParentService";
import { ParentResponseDTO } from "../../dto/ParentDTO";

const parentService = new ParentService();

export const createParent = async (req: Request, res: Response) => {
    try {
        const parent = await parentService.createParent(req.body);
        const parentDTO = new ParentResponseDTO(parent);
        res.status(201).json({ message: "Parent created successfully", parent: parentDTO });
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllParents = async (_req: Request, res: Response) => {
    try {
        const parents = await parentService.getAllParents();
        const parentDTOs = parents.map(parent => new ParentResponseDTO(parent));
        res.status(200).json(parentDTOs);
    }
    catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const getParentById = async (req: Request, res: Response) => {
    try {
        const parent = await parentService.getParentById(Number(req.params.id)) as any;
        if (!parent) {
            return res.status(404).json({ error: "Parent not found" });
        }
        const parentDTO = new ParentResponseDTO(parent);
        return res.status(200).json(parentDTO);
    }
    catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
};

export const updateParent = async (req: Request, res: Response) => {
    try {
        const parent = await parentService.updateParent(Number(req.params.id), req.body);
        const parentDTO = new ParentResponseDTO(parent);
        res.status(200).json({ message: "Parent updated successfully", parent: parentDTO });
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
