const { Op } = require("sequelize")

const convertFiltersToWhereCondition = (filters, allowedFilterField = []) => {
	const condition = []
  for (const filter of filters) {
		const {
      field = null,
      op = 'not',
      value = null
    } = filter

    let validCheck = true

    if (!field) {
      validCheck = false
    }

    if (allowedFilterField.length > 0 && !allowedFilterField.includes(field)) {
      validCheck = false
    }
		
		if (validCheck) {
			switch (op) {
				case 'eq':
          condition.push({
            [field]: {
              [Op.eq]: value
            }
          })
					break;
				case 'ne':
          condition.push({
            [field]: {
              [Op.ne]: value
            }
          })
					break;
				case 'is':
          condition.push({
            [field]: {
              [Op.is]: value
            }
          })
					break;
				case 'not':
          condition.push({
            [field]: {
              [Op.not]: value
            }
          })
					break;
				case 'gt':
          condition.push({
            [field]: {
              [Op.gt]: value
            }
          })
					break;
				case 'gte':
          condition.push({
            [field]: {
              [Op.gte]: value
            }
          })
					break;
				case 'lt':
          condition.push({
            [field]: {
              [Op.lt]: value
            }
          })
					break;
				case 'lte':
          condition.push({
            [field]: {
              [Op.lte]: value
            }
          })
					break;
				case 'like':
          condition.push({
            [field]: {
              [Op.like]: `%${value}%`
            }
          })
					break;
				case 'ilike':
          condition.push({
            [field]: {
              [Op.iLike]: `%${value}%`
            }
          })
					break;
				case 'notlike':
          condition.push({
            [field]: {
              [Op.notLike]: `%${value}%`
            }
          })
					break;
				case 'notilike':
          condition.push({
            [field]: {
              [Op.notILike]: `%${value}%`
            }
          })
					break;
				default:
					break;
			}
		}
	}
	return condition
}

exports.generateConfig = ({
  selects = [],
  query,
  allowedFilterField = [],
  orders = [],
  extraCondition = {}
}) => {
	const {
		page = 1,
		rows = 10,
		filter = JSON.stringify([]),
	} = query

  const whereCondition = convertFiltersToWhereCondition(JSON.parse(filter), allowedFilterField)
	const offset = (parseInt(page) - 1) * rows

	let where = {
		[Op.and]: [...whereCondition]
	}

  if (Object.keys(extraCondition).length > 0) {
    where = {
      ...where,
      ...extraCondition
    }
  }
	
	let configs = {
		where,
		limit: parseInt(rows),
		offset: offset
	}

	if (selects.length > 0) {
		configs = {
			...configs,
			attributes: selects
		}
	}

	if (orders.length > 0) {
		configs = {
			...configs,
			order: [...orders]
		}
	}

	return configs
}

exports.json = (query, data) => {
  const {
    page = 1,
    rows = 10
  } = query

  return {
    total: data.count,
    page: parseInt(page),
    rows: parseInt(rows),
    results: data.rows
  }
}