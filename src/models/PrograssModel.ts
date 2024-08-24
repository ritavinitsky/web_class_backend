import mongoose, { Document, Schema } from 'mongoose';

interface IPrograss extends Document {
    date: Date;
    passed: boolean;
    userId: string;
}

const PrograssSchema: Schema = new Schema({
    date: { type: Date, required: true },
    passed: { type: Boolean, required: true },
    userId: { type: String, required: true },
});

const Prograss = mongoose.model<IPrograss>('prograss', PrograssSchema);

export default Prograss;
