import { Document } from 'mongoose';

export type MongoUser = User & Document;
export type MongoProject = Project & Document;
export type MongoProjectQuery = ProjectQuery & Document;
