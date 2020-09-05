const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const models = require('../models')

require('dotenv').config()

const resolvers = {
    Query: {
        async me(_, args, { user }) {
            if(!user) throw new Error('You are not authenticated')

            return await models.User.findByPk(user.id)
        },

        async user(root, { id }, { user }) {
            try {
                if(!user) throw new Error('You are not authenticated!')
                return models.User.findByPk(id)
            } catch (error) {
                throw new Error(error.message)
            }
        },

        async allUsers(root, args, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.User.findAll()
            } catch (error) {
                throw new Error(error.message)
            }
        }
    },

    Mutation: {
        async registerUser(root, { username, email, password }) {
            try {
                const user = await models.User.create({
                    username,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
                const token = jsonwebtoken.sign(
                    { id: user.id, email: user.email},
                    process.env.JWT_SECRET,
                    { expiresIn: '1y' }
                )

                return {
                    token, id: user.id, username: user.username, email: user.email, message: "Authentication succesfull"
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },

        async login(_, { email, password }) {
            try {
                const user = await models.User.findOne({ where: { email }})

                if (!user) {
                    throw new Error('No user with that email')
                }

                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) {
                    throw new Error('Incorrect password')
                }

                // return jwt
                const token = jsonwebtoken.sign(
                    { id: user.id, email: user.email},
                    process.env.JWT_SECRET,
                    { expiresIn: '1d'}
                )
                
                return {
                   token, user
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }

    },


}

module.exports = resolvers