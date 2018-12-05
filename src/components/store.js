export default {
    namespaced: true,
    state:{},
    mutations: {
        getUse(state, payload) {
           state.reg = payload[0]
        }
    },
    actions: {
        async addUsers(context, obj) {
            await fetch("http://localhost:8081/users/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userAcount: obj.userAcount,
                    userPhone: obj.userPhone,
                    userMail: obj.userMail,
                    userName: obj.userName,
                    userType: obj.userType,
                    usePwd: obj.usePwd,
                    use:obj.use,
                    userStatus: obj.userStatus
                })
            })
        },
        async getUsers(context,obj) {
            const data = await fetch(`http://localhost:8081/users/getUser?userPhone=${obj.userPhone}&usePwd=${obj.usePwd}`, {
                method: "get",
            }).then(response => {
                return response.json();
            });
            if(data.length>0){
                context.commit("getUse", data)
            }
        }
    }
}