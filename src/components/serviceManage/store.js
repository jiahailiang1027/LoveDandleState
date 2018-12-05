export default {
  namespaced: true,
  state: {
    curpage: 1,
    eachpage: 10,
    rows: [],
    maxpage: 0,
    total: 0,
    type: "",
    text:"",
    users:[]
  },
  mutations: {
    getServiceByPage(state, payload) {
      Object.assign(state, payload)
    },
    setCurPage(state, payload) {
      state.curpage = payload
    },
    set(state, payload) {
      state.eachpage = payload
    },
    asyncVendorName(state,payload){
      state.users = payload
    }
  },
  actions: {
    // 渲染列表 搜索
    async asyncGetServiceByPage(context, {curpage,eachpage,type,text,vendorName,use} = {}) {
      const data = await fetch("/service/service", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          page: curpage || context.state.curpage,
          rows: eachpage || context.state.eachpage,
          type: type || context.state.type,
          input: text || context.state.text,
          vendorName:vendorName||"",
          use:use||""
        })
      }).then(response => {
          return response.json();
      });
      context.commit("getServiceByPage", data);
    },
    // 添加服务
    async asyncAddService(context, obj) {
      let {
        serviceName,
        serviceType,
        serviceSchedule,
        serviceCanFor,
        serviceTime,
        serviceDetial,
        serviceLevel,
        servicePrice,
        vendorName
      } = obj
      await fetch("/service/serviceAdd", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          serviceName,
          serviceType,
          serviceSchedule,
          serviceCanFor,
          serviceTime,
          serviceDetial,
          serviceLevel,
          servicePrice,
          vendorName
        })
      })
    },
    //编辑服务
    async asyncUpdataService(context, obj) {
      await fetch("/service/serviceUpdata", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
    },
    //删除
    async asyncHandleDelete(context, id) {
      await fetch("/service/serviceDelete", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })
    },
    //商家
    async asyncVendorName(context, obj) {
      let data = await fetch("/users/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(response => {
        return response.json();
    });
    context.commit("asyncVendorName", data);
    }
  }
}