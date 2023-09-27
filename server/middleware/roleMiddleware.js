const jwt = require('jsonwebtoken')

module.exports = (roles) => (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Token not found'})
        }
        const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY)

        let hasRole = false
        userRoles.forEach(role => {
            if (roles.includes(role)) {
                hasRole = true
            }
        })
        if (!hasRole) {
            return res.status(403).json({message: "У вас нет доступа"})
        }else{
            next()
        }

    } catch (e) {
        console.log(e)
        return res.status(401).json({message: `${e}`})

    }
}