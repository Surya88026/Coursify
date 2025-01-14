const JWT_admin_PASSWORD = process.env.JWT_admin_PASSWORD
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
MONGO_URL = process.env.MONGO_URL

module.exports = ({
    JWT_admin_PASSWORD,
    JWT_USER_PASSWORD,
    MONGO_URL
})