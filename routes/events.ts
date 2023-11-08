import { type RequestHandler, Router } from 'express'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events'
import { checkFields, validateJWT } from '../middlewares'
import { check } from 'express-validator'
import { isDate } from '../helpers/isDate'

// Get Events.
const router = Router()
router.use(validateJWT)

router.get('/', getEvents as RequestHandler)

const eventValidation = [
  check('title', 'Title cannot be empty').not().isEmpty(),
  check('start', 'Start date cannot be empty').not().isEmpty(),
  check('start', 'Start date is not valid').custom(isDate),
  check('end', 'End date cannot be empty').not().isEmpty(),
  check('end', 'End date is not valid').custom(isDate),
  // Check end is greater than start.
  check('end', 'End date must be greater than start date').custom((end, { req }) => {
    const { start } = req.body
    if (start >= end) {
      throw new Error('End date must be greater than start date')
    }
    return true
  }),
  checkFields
]
// Createa new event
router.post('/', eventValidation, createEvent as RequestHandler)

// Update event.
router.put('/:id', eventValidation, updateEvent as RequestHandler)

// Delete event
router.delete('/:id', deleteEvent as RequestHandler)

export default router
