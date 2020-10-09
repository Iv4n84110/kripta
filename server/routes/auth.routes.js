const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')

router.post(
	'/login',
	[
		check('email', 'Введите корректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.empty)
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему',
				})

			const { email, password } = req.body
			const user = await User.findOne({ email })

			if (!user)
				return res.status(400).json({
					message: 'Ошибка в логине или пароле. Попробуйте, пожалуйста, снова',
				})

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch)
				return res.status(400).json({
					message: 'Ошибка в логине или пароле. Попробуйте, пожалуйста, снова',
				})

			const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
				expiresIn: '1h',
			})

			res.json({ token, userId: user.id })
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так, попробуйте снова.',
			})
		}
	}
)

module.exports = router
