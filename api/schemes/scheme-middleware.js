const db = require('../../data/db-config')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  try{
    const idExists = await db('schemes as sc').where('sc.scheme_id', scheme_id)
    if(!idExists){
      next({ status: 404, message: `scheme with scheme_id ${scheme_id} not found` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if(!scheme_name || 
    scheme_name.length === 0 || 
    typeof scheme_name !== 'string'
    ) {
      next({ status: 400, message: "invalid scheme_name" })
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if(!instructions || instructions.length === 0 || typeof instructions !== 'string' ||
    isNaN(step_number) === true
  ) {
    next({ status: 400, message: 'invalid step' })
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
