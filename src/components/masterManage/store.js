export default {
  namespaced: true,
  state: {
    curPage: 1,
    eachPage: 5,
    rows: [],
    maxpage: 0,
    total: 0
  },
  mutations: {
    getMaster(state, payload) {
      Object.assign(state, payload);
    },
    filterData(state, payload) {
      Object.assign(state, {
        rows: [payload]
      });
    },
    setCurPage(state, payload) {
      state.curPage = payload;
    },
    setEachPage(state, payload) {
      state.eachPage = payload;
    }
  },
  getters: {},
  actions: {
    async asyncGetMaster(context, { curPage, eachPage } = {}) {
      const data = await fetch("/master", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          curPage: curPage || context.state.curPage,
          eachPage: eachPage || context.state.eachPage
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
    async asyncDeleteData(context, id) {
      const data = await fetch("/master/deleteData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      }).then(response => {
        return response.json();
      });
      context.commit("getMaster", data);
    },
    async asyncUpdateData(
      context,
      {
        memberAcount,
        memberAdd,
        memberArea,
        memberImg,
        memberName,
        memberPhone,
        memberPoint,
        menberCard,
        _id,
        havePet
      }
    ) {
      const data = await fetch("/master/UpdateData/" + _id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberAcount,
          memberAdd,
          memberArea,
          memberImg,
          memberName,
          memberPhone,
          memberPoint,
          menberCard,
          havePet
        })
      }).then(response => {
        return response.json();
      });
      context.commit("getMaster", data);
    },
    async asyncAddData(
      context,
      {
        memberAcount,
        memberAdd,
        memberArea,
        memberImg,
        memberName,
        memberPhone,
        memberPoint,
        menberCard,
        havePet
      }
    ) {
      const data = await fetch("/master/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          memberAcount,
          memberAdd,
          memberArea,
          memberImg,
          memberName,
          memberPhone,
          memberPoint,
          menberCard,
          havePet
        })
      }).then(response => {
        return response.json();
      });
      context.commit("getMaster", data);
    }
  }
};
