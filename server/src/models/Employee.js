const {Schema, model } = require('mongoose')

const employeeSchema = new Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    office: {type: String, required: true},
    salary: {type: Number, required: true},
}, {
    timestamps: true, // automaticamente pone las fechas de creación
    versionKey: false, // hace que no ponga algunos caracteres __V
})

module.exports = model('Employee', employeeSchema)