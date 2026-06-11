import * as userService from '../services/userService.js'

export const createUser = (req, res) => {
    userService.createUser(req.body, res)
}

export const updateUser = (req, res) => {
    userService.updateUser(req.params.id, req.body, res)
}

export const getUsers = (req, res) => {
    userService.getUsers(res)
}
export const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id, res)
}