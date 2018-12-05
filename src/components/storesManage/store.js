export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        rows: [],
        maxpage: 0,
        total: 0,
        master: []
    },
    mutations: {
        getMaster(state, payload) {
            Object.assign(state.master, payload);
        },
        async  getEmpByPage(state, payload) {
            await Object.assign(state, payload);
        },
        setCurPage(state, payload) {
            state.curpage = payload;
        },
        setEachPage(state, payload) {
            state.eachpage = payload;
        }
    },
    actions: {
        async asyncGetMaster(context, { curPage, eachPage ,userStatus } = {}) {
            const data = await fetch("/users/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curPage: curPage || context.state.curPage,
                    eachPage: eachPage || context.state.eachPage,
                    userStatus
                })
            }).then(
                response => {
                    return response.json();
                },
                err => {
                    console.log(err);
                }
            );
            context.commit("getMaster", data);
        },
        async asyncGetEmpByPage(context, { curpage, eachpage, shopName,usersId,use } = {}) {
            const data = await fetch("/stores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    page: curpage || context.state.curpage,
                    rows: eachpage || context.state.eachpage,
                    usersId:usersId||"",
                    use:use||"",
                    shopName
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data);
        },
        async delete(context, id) {
            const data = await fetch("/stores/" + id, {
                method: "DELETE",
                body: JSON.stringify({})
            })
        },
        async add(context, {
            shopName,
            shopLicenceNum,
            shopLicenceImg,
            shopAdd,
            shopLocation,
            shopCorporate,
            shopImg,
            shopTel,
            shopFeature,
            shopEmployee,
            usersId
        } = {}) {
            const data = await fetch("/stores/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shopName,
                    shopLicenceNum,
                    shopLicenceImg,
                    shopAdd,
                    shopLocation,
                    shopImg,
                    shopCorporate,
                    shopTel,
                    shopFeature,
                    shopEmployee,
                    usersId
                })
            })
        },

        async putShop(context, {
            shopName,
            shopLicenceImg,
            shopLicenceNum,
            shopAdd,
            shopLocation,
            shopCorporate,
            shopTel,
            shopImg,
            shopFeature,
            shopEmployee,
            id,
            usersId
        } = {}) {
            const data = await fetch("/stores/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shopName,
                    shopLicenceImg,
                    shopLicenceNum,
                    shopAdd,
                    shopLocation,
                    shopCorporate,
                    shopTel,
                    shopImg,
                    shopFeature,
                    shopEmployee,
                    usersId
                })
            })
        },

    }
}