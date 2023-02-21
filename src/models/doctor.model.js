import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { pagingSkipValue } from '*/utilities/algorithms'

// Define Board collection
const doctorCollectionName = 'doctors'
const boardCollectionSchema = Joi.object({
    name: Joi.string().required().min(1).max(50).trim(),
    workPlace: Joi.string().min(10).max(256).trim(),
    phone: Joi.string().required().min(10).max(50).trim(),
    email: Joi.string().required().min(10).max(50).trim(),
    address: Joi.string().required().min(10).max(256).trim(),
    status: Joi.string().required().min(5).max(50).trim(),
    description: Joi.string().min(3).max(256).trim(),

    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']
const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, {
        abortEarly: false
    })
}

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(doctorCollectionName)
            .findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const createNew = async (data) => {
    try {
        const createData = await validateSchema(data)

        const result = await getDB()
            .collection(doctorCollectionName)
            .insertOne(createData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = { ...data }
        Object.keys(updateData).forEach((fieldName) => {
            if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
                delete updateData[fieldName]
            }
        })
        const result = await getDB()
            .collection(doctorCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: updateData },
                { returnDocument: 'after' }
            )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}
const deleteDoctor = async (id) => {
    try {
        const result = await getDB()
            .collection(doctorCollectionName)
            .deleteOne({ _id: new ObjectId(id) })

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const getListDoctors = async (page, itemPerpage) => {
    try {
        const queryConditions = [
            { _destroy: false }
        ]
        const query = await getDB()
            .collection(doctorCollectionName)
            .aggregate(
                [
                    {
                        $match: {
                            $and: queryConditions
                        }
                    },
                    {
                        $sort: { createdAt: -1 } // Sắp xếp dữ liệu theo title
                    },
                    {
                        $facet: {
                            doctors: [
                                { $skip: pagingSkipValue(page, itemPerpage) },
                                { $limit: itemPerpage }
                            ],
                            totalDoctor: [{ $count: 'countedDoctors' }]
                        }
                    }
                ],
                { collation: { locale: 'en' } }
            )
            .toArray() //aggregate: tổng hợp
        const res = query[0]
        console.log(res)
        return {
            doctors: res.doctors || [],
            totalDoctor: res.totalDoctor[0]?.countedDoctors || 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const DoctorModel = {
    createNew,
    update,
    findOneById,
    getListDoctors,
    doctorCollectionName,
    deleteDoctor
}
