export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        rows: [],
        maxpage: 0,
        total: 0,
        searchName:"",
    },
    mutations: {
        getOrderByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curpage = payload
        },
        setEachPage(state, payload) {
            state.eachpage = payload
        },
        searchName(state,payload){
            state.searchName = payload
        }
    },
    actions: {
        async asyncGetOrderByPage(context, { curpage, eachpage,name } = {}) {
            const data = await fetch("/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    curpage: curpage || context.state.curpage,
                    eachpage: eachpage || context.state.eachpage,
                    name: name || context.state.searchName, 
                })
            }).then(response => {
                return response.json();
            });
            context.commit("getOrderByPage", data)
        },

        async asyncUpdateOrder(context,{name, phone, address, goodsName, price, goodsNumber,id}) {
            const data = await fetch("order/updateData/"+id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,phone,address,goodsName,price,goodsNumber
                })
            })
        },
    }
}