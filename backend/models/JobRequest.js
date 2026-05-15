const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  contactName: { type: String },
  contactEmail: { 
    type: String, 
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
  },
  status: { 
    type: String, 
    enum: ["Open", "In Progress", "Closed"], 
    default: "Open" 
  },
}, { timestamps: true }); // Automatically creates createdAt [cite: 23]

module.exports = mongoose.model('JobRequest', jobRequestSchema, 'jobRequests');