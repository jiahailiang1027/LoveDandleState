export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        rows: [],
        maxpage: 0,
        total: 0
    },
    mutations: {
        getEmpByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setEachPage(state, payload) {
            state.eachpage = payload
        }
    },
    actions: {
        async getEmpByAll(context, { curpage, eachpage } = {}) {
            const data = await fetch("http://localhost:8081/users/user", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    page: curpage || context.state.curpage,
                    rows: eachpage || context.state.eachpage
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data)
        },
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
                    userType: "门店管理",
                    userStatus: "1"
                })
            }).then(response => {
                return response.json();
            });
        },
        async getSearch(context, { curpage, eachpage, userAcount } = {}) {
            let page = curpage || context.state.curpage;
            let rows = eachpage || context.state.eachpage;
            let text = userAcount;
            const data = await fetch(`http://localhost:8081/users/search?page=${page}&rows=${rows}&text=${text}`, {
                method: "get",
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data)
        },
        async updateUsers(context, obj) {
            await fetch("http://localhost:8081/users/update", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: obj.id,
                    userAcount: obj.userAcount,
                    userPhone: obj.userPhone,
                    userMail: obj.userMail,
                    userName: obj.userName,
                    userType: "门店管理",
                    userStatus: obj.userStatus
                })
            })
        },
        async deletUsers(context, id) {
            await fetch("http://localhost:8081/users/delete", {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            })
        }
    }
}