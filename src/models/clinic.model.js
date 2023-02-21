import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'
import { pagingSkipValue } from '*/utilities/algorithms'

// Define Board collection
const clinicCollectionName = 'clinics'
const boardCollectionSchema = Joi.object({
    name: Joi.string().required().min(1).max(50).trim(),
    manager: Joi.string().required().min(10).max(50).trim(),
    hotline: Joi.string().required().min(10).max(50).trim(),
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
        abortEarly: false,
    })
}

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(clinicCollectionName)
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
            .collection(clinicCollectionName)
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
            .collection(clinicCollectionName)
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
const deleteClinic = async (id) => {
    try {
        const result = await getDB()
            .collection(clinicCollectionName)
            .deleteOne({ _id: new ObjectId(id) })

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const getListClinics = async (page, itemPerpage) => {
    try {
        const queryConditions = [
            { _destroy: false },
        ]
        const query = await getDB()
            .collection(clinicCollectionName)
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
                            clinics: [
                                { $skip: pagingSkipValue(page, itemPerpage) },
                                { $limit: itemPerpage }
                            ],
                            totalClinic: [{ $count: 'countedClinics' }],
                        }
                    }
                ],
                { collation: { locale: 'en' } }
            )
            .toArray() //aggregate: tổng hợp
        const res = query[0]
        return {
            clinics: res.clinics || [],
            totalClinic: res.totalClinic[0]?.countedClinics || 0,
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const ClinicModel = {
    createNew,
    update,
    findOneById,
    getListClinics,
    clinicCollectionName,
    deleteClinic
}
