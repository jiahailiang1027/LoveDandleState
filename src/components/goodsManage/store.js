/* jshint esversion: 6 */
export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 10,
        rows: [],
        maxpage: 0,
        total: 0,
        searchGoods: "",
        users: []

    },
    mutations: {
        getEmpByPage(state, payload) {
            Object.assign(state, payload);
        },
        setCurPage(state, payload) {
            state.curpage = payload;
        },
        setEachPage(state, payload) {
            state.eachpage = payload;
        },
        searchGoods(state, payload) {
            state.searchGoods = payload;
        },
        associatedUser(state, payload) {
            state.users = payload;
        }
    },
    actions: {
        async asyncGetEmpByPage(context, { curpage, eachpage, searchGoods,user,use } = {}) {
            const data = await fetch("/goods/show", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    page: curpage || context.state.curpage,
                    rows: eachpage || context.state.eachpage,
                    type: searchGoods || context.state.searchGoods,
                    user: user || "",
                    use:use,
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data);
        },
        async deleteGoods(context, id) {
            await fetch(`/goods/delete?id=${id}`);
        },
        async addGoods(context, obj) {
            let { goodsName, goodsPrice, goodsRegion, goodsSupplier, goodsTaste,user, goodsType, imageUrl, goodsIntro } = obj;
            await fetch("/goods/addGoods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user,goodsName, goodsPrice, goodsRegion, goodsSupplier, goodsTaste, goodsType, imageUrl, goodsIntro
                })
            })
        },
        async updataGoods(context, obj) {
            await fetch("/goods/updata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
        },
        async  associatedUser(context) {
            const data = await fetch("/users/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => res.json());
            context.commit("associatedUser", data);
        }
    },


}