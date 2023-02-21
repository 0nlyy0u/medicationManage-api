import { DoctorModel } from '*/models/doctor.model'
import { cloneDeep } from 'lodash'
import { DEFAULT_CURRENT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '*/utilities/constants'

const createNew = async (data) => {
    try {
        const createdPK = await DoctorModel.createNew(data)
        const getNewPK = await DoctorModel.findOneById(createdPK.insertedId.toString())
        return getNewPK
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (data) => {
    try {
        const updateData = {
            ...data,
            updatedAt: Date.now()
        }
        const id = updateData._id
        if (updateData._id) delete updateData._id

        const updatedPK = await DoctorModel.update(id, updateData)

        return updatedPK
    } catch (error) {
        throw new Error(error)
    }
}
const deleteDoctor = async (id) => {
    try {
        const updatedPK = await DoctorModel.deleteDoctor(id)

        return updatedPK
    } catch (error) {
        throw new Error(error)
    }
}

const getListDoctors = async (page = DEFAULT_CURRENT_PAGE, itemPerpage = DEFAULT_ITEMS_PER_PAGE) => {
    try {
        const results = await DoctorModel.getListDoctors(parseInt(page), parseInt(itemPerpage))
        if (results.doctors.length > 0) {
            results.doctors.map((elm, idx) => {
                elm.id = elm._id.toString()
            })
        }
        return results
    } catch (error) {
        throw new Error(error)
    }
}

export const DoctorService = {
    createNew,
    update,
    getListDoctors,
    deleteDoctor
}
