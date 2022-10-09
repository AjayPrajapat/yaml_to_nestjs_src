
import * as mongoose from 'mongoose';
export const PortfolioSchema = new mongoose.Schema({
    
                cvId: Number,
        cvTemplateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CVTemplate',
            require: false,
            unique: false,
            default: '',
        },

        vCardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VCard',
            require: true,
            unique: false,
            default: '',
        },

        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            require: true,
            unique: false,
            default: '',
        },

}).set('timestamps', true);
