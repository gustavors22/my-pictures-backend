import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Image {
    link: string;
    userId: number;
}

class ImageRepository {
    public async save(image: Image): Promise<Image> {
        const user = await prisma.user.findUnique({
            where: {
                id: image.userId,
            },
          });
        
        if (!user) {
            return {} as Image;
        }

        const imageSaved = await prisma.image.create({
            data: {
                link: image.link,
                userId: image.userId
            }
        });

        return imageSaved;
    }

    public async getByUserId(userId: number): Promise<Image[]> {
        const images = await prisma.image.findMany({
            where: {
                userId: userId,
            },
        });

        return images;
    }

    public async getById(id: number){
        const image = await prisma.image.findUnique({
            where: {
                id: id,
            },
        });

        return image;
    }

    public async delete(id: number){
        const image = await prisma.image.delete({
            where: {
                id: id,
            },
        });

        return image;
    }

}

export default new ImageRepository();