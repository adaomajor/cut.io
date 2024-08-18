import mongoose, { Model, Schema, Document } from "mongoose";
import Shortener from '../utils/encoder' 

interface CLink extends Document{
    id: number;
    title: string;
    url: string;
    short: string;
    views: Number;
    user: mongoose.Types.ObjectId;
    created?: Date
}

const linkSchema: Schema<CLink> = new Schema({
    id: { type: Number, required: true},
    title: { type: String, required: true},
    url: { type: String, required: true},
    short: { type: String},
    views: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true}
})

linkSchema.pre('save', async function(next){
    const link = this as CLink
    link.short = Shortener.encode(this.id)
    return next() 
})

const linkModel: Model<CLink> = mongoose.model<CLink>('Links', linkSchema)
export default linkModel