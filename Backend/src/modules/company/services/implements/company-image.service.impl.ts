import { CompanyImage } from '@prisma/client';
import { ICompanyImageService } from '../company-image.service';
import { companyService } from './company.service.impl';
import dotnev from 'dotenv';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { DeleteObjectCommand, ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '~/global/configs/s3.config';
import { companyImageRepository } from '../../repositories/implements/company-image.repository.impl';
import prisma from '~/prisma';
import { NotFoundException } from '~/global/core/error.core';

dotnev.config();

class CompanyImageService implements ICompanyImageService {
  public async addImages(companyId: number, userId: number, files: Express.Multer.File[]): Promise<void> {
    const company = await companyService.findOne(companyId, userId);

    const data = [];

    const bucketName = process.env.AWS_NAME;
    const uploadPromises = files.map(async (file) => {
      const resizeBuffer = await sharp(file.buffer)
        .resize({
          width: 960,
          height: 540,
          fit: 'cover',
          position: 'center'
        })
        .toBuffer();

      const id = uuidv4();
      const key = `uploads/${id}-${file.originalname}`;

      const params = {
        Bucket: bucketName,
        Key: key,
        Body: resizeBuffer,
        ContentType: file.mimetype,
        ACL: ObjectCannedACL.public_read // Cho public access
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      return {
        key,
        url
      };
    });

    const imageUrls = await Promise.all(uploadPromises);

    for (const img of imageUrls) {
      data.push({ companyId: company.id, imageKey: img.key, imageUrl: img.url });
    }

    await companyImageRepository.createMany(data);
  }

  public async getAll(companyId: number): Promise<CompanyImage[]> {
    const companyImages = await companyImageRepository.findMany(companyId);

    return companyImages;
  }

  public async findOne(companyId: number, companyImageId: number): Promise<CompanyImage> {
    const companyImage = await companyImageRepository.findOne(companyId, companyImageId);

    if (!companyImage) {
      throw new NotFoundException('Cannot find image');
    }

    return companyImage;
  }
  public async delete(companyId: number, userId: number, companyImageId: number): Promise<void> {
    const company = await companyService.findOne(companyId, userId);
    const image = await this.findOne(companyId, companyImageId);

    const bucketName = process.env.AWS_NAME;

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: image.imageKey
    });

    await s3.send(command);

    await companyImageRepository.deleteImage(companyId, companyImageId);
  }
}

export const companyImageService: ICompanyImageService = new CompanyImageService();
