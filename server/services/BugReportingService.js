import mongoose from "mongoose"
import { Timestamp } from "mongodb"
// import { stringify } from "querystring";
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _commentsSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true }
}, { timestamps: true })

let _schema = new Schema({
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  attachment: { type: String },
  state: { type: String, enum: ["new", "in_progress", "on_hold", "resolved", "closed", "canceled"], default: "new" },
  severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "low" },
  assignedTo: { type: ObjectId, ref: 'User' },
  comments: [_commentsSchema],
  createdBy: { type: ObjectId, ref: 'User', required: true },
  reportedBy: { type: ObjectId, ref: 'User', required: true },
  updatedBy: { type: ObjectId, ref: 'User' },
  siteId: { type: ObjectId, ref: 'Site', required: true },
  updated: { type: String }
}, { timestamps: true })


export default class BugReportingService {
  get repository() {
    return mongoose.model('BugReporting', _schema)
  }
}