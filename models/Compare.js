const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompareSchema = new Schema({
   query: {
       type: String,
       required: true,
       index: true,
   },
   type: {
    type: String,
    required: true
   },
   data: {
       type: Array,
       required: true
   },
   date: {
       type: Date
   }
});

const Compare = mongoose.model('compare', CompareSchema);
module.exports = Compare;