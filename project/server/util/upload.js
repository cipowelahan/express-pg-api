const fs = require('fs')
const path = require('path')

exports.store = async (file, {
	dirUpload = ''
}) => {
	const uploadPath = 'public/uploads'
	const timestamp = new Date().getTime()
	const extension = file.originalname.split('.').pop()
	const pathName = `${dirUpload}/${timestamp}.${extension}`
	const checkDirUpload = `${uploadPath}/${dirUpload}`

	try {
		if (!fs.existsSync(checkDirUpload)) {
			fs.mkdirSync(checkDirUpload, { recursive: true })
		}

		fs.copyFileSync(file.path, `${uploadPath}/${pathName}`)
		fs.unlinkSync(file.path)
		return {
			success: true,
			pathName,
		}
	} catch (error) {
		fs.unlinkSync(file.path)
		return {
			success: false,
			error
		}
	}

}