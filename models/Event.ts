import { Schema, model } from 'mongoose'

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

EventSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  return { ...object, id: _id }
})

export default model('Event', EventSchema)
