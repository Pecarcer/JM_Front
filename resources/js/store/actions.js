import axios from "axios"

let actions = {
    createUser({commit}, user){
        axios.post('/api/users', user)
        .then(res => {
            commit('CREATE_USER', res.data)
        }).catch(err =>{
            console.log(err)
        })
    },
    fetchUsers({commit}){
        axios.get('/api/users')
        .then(res =>{
            commit('FETCH_USERS' , res.data)
        }).catch(err => {
            console.log(err)
        })
    },
    deleteUser({commit}, user){
        axios.delete('/api/posts/${user.id}')
        .then(res => {
            if (res.data === 'ok')
            commit('DELETE_USER', user)
        }).catch(err =>{
            console.log(err)
        })
    }
}

export default actions