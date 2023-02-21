import { HttpStatusCode } from '*/utilities/constants'
import { DoctorService } from '*/services/doctor.service'

const createNew = async (req, res) => {
    try {
        //const userId = req.jwtDecoded._id
        const result = await DoctorService.createNew(req.body)
        res.status(HttpStatusCode.OK).json({ stt: true, msg: 'Thêm mới thành công', data: result })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const result = await DoctorService.update(req.body)

        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}
const getListDoctors = async (req, res) => {
    try {
        const { page, itemPerpage } = req.query
        const results = await DoctorService.getListDoctors(page, itemPerpage)

        res.status(HttpStatusCode.OK).json(results)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const id = req.query.id
        const result = await DoctorService.deleteDoctor(id)

        res.status(HttpStatusCode.OK).json({ stt: true, msg: 'Xoá bác sỹ thành công', data: result })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message
        })
    }
}
export const DoctorController = {
    createNew,
    update,
    getListDoctors,
    deleteDoctor
}
