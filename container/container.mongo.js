import mongoose from 'mongoose'

class containerMongoDB{
    constructor({name, schema}){
        this.model = mongoose.model(name, schema);
    }

    async getAll(){
        return await this.model.find();
    }
    async getByID(id){
        const mongoID = mongoose.Types.ObjectId(id);
        return await this.model.findById(mongoID);
    }

    async save(prod){
        await this.model.create(prod)
    }
    async updateByID(id, newData){
        const mongoID = mongoose.Types.ObjectId(id);
        await this.model.findByIdAndUpdate(mongoID, newData);
    }

    async deleteByID(id){
        const mongoID = mongoose.Types.ObjectId(id);
        await this.model.findByIdAndDelete(mongoID);
    }

    
}

export default containerMongoDB