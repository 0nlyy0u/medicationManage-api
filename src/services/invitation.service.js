import { InvitationModel } from '*/models/invitation.model'
import { AuthModel } from '*/models/user.model'
import { ClinicModel } from '*/models/clinic.model'
import { pickUser } from '*/utilities/transform'

const createNewBoardInvitation = async (data, userId) => {
    try {
        // Người đi mời: chính là người đang request, nên chúng ta tìm theo id lấy từ token
        const inviter = await AuthModel.findOneById(userId)
        // Người được mời: lấy từ form phía client
        const invitee = await AuthModel.findOneByEmail(data.inviteeEmail)

        const board = await ClinicModel.findOneById(data.boardId)
        if (!invitee || !inviter || !board) {
            throw new Error('Inviter, invitee or board not found!')
        }

        const invitation = {
            inviterId: userId,
            inviteeId: invitee._id.toString(),
            type: InvitationModel.INVITATION_TYPES.BOARD_INVITATION,
            boardInvitation: {
                boardId: data.boardId,
                status: InvitationModel.BOARD_INVITATION_STATUS.PENDING,
            },
        }

        const createdInvitation =
            await InvitationModel.createNewBoardInvitation(invitation)
        const getInvitation = await InvitationModel.findOneById(
            createdInvitation.insertedId.toString()
        )

        const resData = {
            ...getInvitation,
            inviter: pickUser(inviter),
            invitee: pickUser(invitee),
            board: board
        }
        return resData
    } catch (error) {
        throw new Error(error)
    }
}

const getInvitations = async (userId) => {
    try {
        const getInvitations = await InvitationModel.findByUser(userId)
        const resInvitations = getInvitations.map((i) => {
            return {
                ...i,
                inviter: i.inviter[0] || {},
                invitee: i.invitee[0] || {},
                board: i.board[0] || {},
            }
        })
        return resInvitations
    } catch (error) {
        throw new Error(error)
    }
}

const updateBoardInvitation = async (userId, invitationId, action) => { // userId = invitee (Nguoi duoc moi)
    try {
        //tìm bản ghi Invitation trong model
        const getInvitation = await InvitationModel.findOneById(invitationId)
        if (!getInvitation) {
            throw new Error('Invitation not found')
        }
        const boardId = getInvitation.boardInvitation.boardId

        // Check nếu user đã là thành viên board
        const board = await ClinicModel.findOneById(getInvitation.boardInvitation.boardId.toString())
        if (!board) {
            throw new Error('Board not found')
        }
        const boardMemberIds = board.memberIds.map((i) => i.toString())
        const boardOwnerIds = board.ownerIds.map((i) => i.toString())
        if (action === 'accept' && (boardMemberIds.includes(userId) || boardOwnerIds.includes(userId))) {
            throw new Error('You are already a member of this board')
        }

        //Khoi tạo 1 status
        let updateStatus = InvitationModel.BOARD_INVITATION_STATUS.PENDING
        if (action === 'accept') updateStatus = InvitationModel.BOARD_INVITATION_STATUS.ACCEPTED
        if (action === 'reject') updateStatus = InvitationModel.BOARD_INVITATION_STATUS.REJECTED

        const updateData = {
            boardInvitation: {
                ...getInvitation.boardInvitation,
                status: updateStatus
            }
        }
        const updatedInvitation = await InvitationModel.update(invitationId, updateData)

        // Nếu action là accepted thì sẽ phải thêm thông tin user vào
        if (updatedInvitation.boardInvitation.status === InvitationModel.BOARD_INVITATION_STATUS.ACCEPTED) {
            await ClinicModel.pushMembers(boardId, userId)
        }

        return updatedInvitation

    } catch (error) {
        throw new Error(error)
    }
}

export const InvitationService = {
    createNewBoardInvitation,
    getInvitations,
    updateBoardInvitation
}
