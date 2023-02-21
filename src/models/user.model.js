import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Users collection
const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
    email: Joi.string().required().trim(), // also ObjectId when create new
    userName: Joi.string().required().trim(), // also ObjectId when create new
    password: Joi.string().required().min(8).trim(),
    displayName: Joi.string(),
    avatar: Joi.string(),

    role: Joi.string().default('admin'),
    isActive: Joi.boolean().default(true),
    verifyToken: Joi.string(),
    currentRefreshToken: Joi.array(),
    currentAccessToken: Joi.array(),

    createdAt: Joi.date().timestamp('javascript').default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null)
})

const INVALID_UPDATE_FIELDS = ['_id', 'email', 'userName', 'createdAt']
const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const findOneByEmail = async (email) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ email: email })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const findOneByUsername = async (username) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ userName: username })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const register = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const result = await getDB().collection(userCollectionName).insertOne(validatedValue)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = { ...data }
        Object.keys(updateData).forEach(fieldName => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData[fieldName]
            }
        })
        const result = await getDB().collection(userCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * @param {Array of string card id} ids
 */
const deleteMany = async (ids) => {
    try {
        const transformIds = ids.map(i => ObjectId(i))
        const result = await getDB().collection(userCollectionName).updateMany(
            { _id: { $in: transformIds } },
            { $set: { _destroy: true } }
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const AuthModel = {
    userCollectionName,
    findOneByEmail,
    findOneByUsername,
    register,
    deleteMany,
    update,
    findOneById
}
