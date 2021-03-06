const { Schema, model } = require('mongoose');

const TodoSchema = Schema({

    message: {
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

TodoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Todo', TodoSchema );
