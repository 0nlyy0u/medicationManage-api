import { HttpStatusCode } from '*/utilities/constants'
import { ClinicService } from '*/services/clinic.service'

const createNew = async (req, res) => {
    try {
        const userId = req.jwtDecoded._id
        const result = await ClinicService.createNew(req.body)
        res.status(HttpStatusCode.OK).json({ stt: true, msg: 'Thêm mới thành công', data: result })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const result = await ClinicService.update(req.body)

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}
const getListClinics = async (req, res) => {
    try {
        const { page, itemPerpage } = req.query
        const results = await ClinicService.getListClinics(page, itemPerpage)

        res.status(HttpStatusCode.OK).json(results)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const deleteClinic = async (req, res) => {
    try {
        const id = req.query.id
        const result = await ClinicService.deleteClinic(id)

        res.status(HttpStatusCode.OK).json({ stt: true, msg: 'Xoá phòng khám thành công', data: result })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}
export const ClinicController = {
    createNew,
    update,
    getListClinics,
    deleteClinic
}
