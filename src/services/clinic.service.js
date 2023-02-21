import { ClinicModel } from '*/models/clinic.model'
import { cloneDeep } from 'lodash'
import { DEFAULT_CURRENT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '*/utilities/constants'

const createNew = async (data) => {
    try {
        const createdPK = await ClinicModel.createNew(data)
        const getNewPK = await ClinicModel.findOneById(createdPK.insertedId.toString())
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

        const updatedPK = await ClinicModel.update(id, updateData)

        return updatedPK
    } catch (error) {
        throw new Error(error)
    }
}
const deleteClinic = async (id) => {
    try {
        const updatedPK = await ClinicModel.deleteClinic(id)

        return updatedPK
    } catch (error) {
        throw new Error(error)
    }
}

const getListClinics = async (page = DEFAULT_CURRENT_PAGE, itemPerpage = DEFAULT_ITEMS_PER_PAGE) => {
    try {
        const results = await ClinicModel.getListClinics(parseInt(page), parseInt(itemPerpage))
        if (results.clinics.length > 0) {
            results.clinics.map((elm, idx) => {
                elm.id = elm._id.toString()
            })
        }
        return results
    } catch (error) {
        throw new Error(error)
    }
}

export const ClinicService = {
    createNew,
    update,
    getListClinics,
    deleteClinic
}
