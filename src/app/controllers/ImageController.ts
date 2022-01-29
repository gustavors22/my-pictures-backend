import { Request, Response } from "express";
import imageRepository from "../repositories/imageRepository";

class ImageController {
    public async index(request: Request, response: Response) {
        const id = request.userId;

        const images = await imageRepository.getByUserId(id);

        if(!images){
            return response.status(400).json({
                'message': 'Images not found!'
            });
        }

        return response.json(images);
    }

    public async store(request: Request, response: Response) {
        const { link } = request.body;
        const  userId  = request.userId;

        const image = await imageRepository.save({link, userId});

        if(!image){
            return response.status(400).json({
                'message': 'Image not saved!'
            });
        }

        return response.json(image);
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params;

        const image = await imageRepository.getById(parseInt(id));

        if(!image){
            return response.status(400).json({
                'message': 'Image not found!'
            });
        }

        return response.json(image);
    }

    public async delete(request: Request, response: Response){
        const { id } = request.params;

        const image = await imageRepository.delete(parseInt(id));

        if(!image){
            return response.status(400).json({
                'message': 'Image not deleted!'
            });
        }

        return response.json(image);
    }
}

export default new ImageController();