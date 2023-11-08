import { type Request, type Response } from 'express'
import Event from '../models/Event'
import { type AuthRequest } from '../helpers'
import { Types } from 'mongoose'

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find().populate('user', 'name')
  res.json({
    ok: true,
    events
  })
}

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = new Event(req.body)
    event.user = new Types.ObjectId(req.uid)
    const savedEvent = await event.save()
    res.json({
      ok: true,
      event: savedEvent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Talk to administration'
    })
  }
}

export const updateEvent = async (req: AuthRequest, res: Response) => {
  const { id: eventId } = req.params
  const uid = req.uid
  try {
    const event = await Event.findById(eventId)
    if (event === null) {
      return res.status(404).json({
        ok: false,
        msg: 'no event for that id'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You cannot edit this event'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })
    res.json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Talk to administration'
    })
  }
}

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  const { id: eventId } = req.params
  const uid = req.uid
  try {
    const event = await Event.findById(eventId)
    if (event === null) {
      return res.status(404).json({
        ok: false,
        msg: 'no event for that id'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You cannot delete this event'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId, newEvent)
    res.json({
      ok: true,
      event: deletedEvent
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Talk to administration'
    })
  }
}
