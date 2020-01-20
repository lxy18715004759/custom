import api from './request'
const formData = { headers: { 'Content-Type': 'multipart/form-data' } }
const json = { headers: { 'Content-Type': 'application/json' } }

export const customerList = params => {
  return api.post('/api/customer/queryByCondition', params)
}

export const get = params => {
  return api.get('/authentication/form', { params })
}
export const get2 = params => {
  return api.get('/authentication/form', { params })
}

export const get1 = params => {
  return api.get(`/authentication/form/${params}`)
}


export const upload = params => {
  return api.post('/authentication/form', params, formData)

}


export const getAdverContent = params => {
  return api.post('other/app/adver/get_content', params)
}


// ---------------------new------------------------

export const getCodeImage = params => {
  return api.get('/code/image', { params })
}

export const login = params => {
  return api.post('/authentication/form', params)
}


export const getCustomerListPage = params => {
  return api.post('/api/customer/queryByCondition', params, json)
}

export const addCustomer = params => {
  return api.post('/api/customer', params)
}

export const getCustomer = params => {
  return api.get('/api/customer', { params })
}

export const deleteCustomer = params => {
  return api.delete('/api/customer/delete', { params })
}


export const updateCustomer = params => {
  return api.post('/api/customer/update', params)
}

export const getAllCountryCode = params => {
  return api.get('/api/countryCode/getAll', { params })
}

export const getUserInfo = params => {
  return api.get('/api/user', { params })
}

export const getMoneyCodeInCustomer = params => {
  return api.get('/api/moneyCode/getMoneyCodeInCustomer', { params })
}

export const getCustomerPayInfo = params => {
  return api.get('/api/customerPayInfo/queryByCustomerId', { params })
}

export const addCustomerPayInfo = params => {
  return api.post('/api/customerPayInfo', params)
}

export const updateCustomerPayInfo = params => {
  return api.post('/api/customerPayInfo/update', params)
}

export const deleteCustomerPayInfo = params => {
  return api.delete('/api/customerPayInfo/delete', { params })
}

export const getCustomerPeople = params => {
  return api.get('/api/customerPeople/queryByCustomerId', { params })
}

export const addCustomerPeople = params => {
  return api.post('/api/customerPeople', params)
}

export const updateCustomerPeople = params => {
  return api.post('/api/customerPeople/update', params)
}

export const deleteCustomerPeople = params => {
  return api.delete('/api/customerPeople/delete', { params })
}

export const getCustomerUnit = params => {
  return api.get('/api/customerUnit/queryByCustomerId', { params })
}

export const getCustomerUnitById = params => {
  return api.get('/api/customerUnit', { params })
}


export const addCustomerUnit = params => {
  return api.post('/api/customerUnit', params)
}

export const updateCustomerUnit = params => {
  return api.post('/api/customerUnit/update', params)
}

export const deleteCustomerUnit = params => {
  return api.delete('/api/customerUnit/delete', { params })
}

export const getCompanyOperatorUser = params => {
  return api.get('/api/user/getCompanyOperatorUser', { params })
}

export const getCompanySalesperson = params => {
  return api.get('/api/user/getCompanySalesperson', { params })
}

export const getProductListPage = params => {
  return api.post('/api/product/queryByCondition', params, json)
}

export const addProduct = params => {
  return api.post('/api/product', params)
}

export const updateProduct = params => {
  return api.post('/api/product/update', params)
}

export const getProduct = params => {
  return api.get('/api/product', { params })
}

export const deleteProduct = params => {
  return api.delete('/api/product/delete', { params })
}

export const addProductClassify = params => {
  return api.post('/api/productClassify', params)
}

export const updateProductClassify = params => {
  return api.post('/api/productClassify/update', params)
}

export const getProductClassify = params => {
  return api.get('/api/productClassify/selectByProductId', { params })
}

export const getQiNiuToken = params => {
  return api.get('/api/qiniuFileProperty/getQiNiuTokenByAppId', { params })
}

export const getProductImage = params => {
  return api.get('/api/productImage/queryByProductId', { params })
}

export const deleteProductImage = params => {
  return api.delete('/api/productImage/delete', { params })
}

export const getSimpleCustomerRo = params => {
  return api.get('/api/customer/querySimpleCustomerRo', { params })
}

export const searchGoodByCode = params => {
  return api.get('/api/good/searchGoodByCode', { params })
}

export const queryGoodKeyByGoodId = params => {
  return api.get('/api/goodKey/queryByGoodId', { params })
}

export const getAllUnitCode = params => {
  return api.get('/api/unitCode/getAll', { params })
}

export const addContactCompany = params => {
  return api.post('/api/contactCompany', params)
}

export const getContactCompanyListPage = params => {
  return api.post('/api/contactCompany/queryByCondition', params, json)
}

export const updateContactCompany = params => {
  return api.post('/api/contactCompany/update', params)
}

export const getContactCompany = params => {
  return api.get('/api/contactCompany', { params })
}

export const deleteContactCompany = params => {
  return api.delete('/api/contactCompany/delete', { params })
}

export const getEmployeeListPage = params => {
  return api.post('/api/employee/queryEmployeeByCondition', params, json)
}

export const addUser = params => {
  return api.post('/api/employee', params, json)
}

export const updateEmployee = params => {
  return api.post('/api/employee/updateEmployee', params, json)
}

export const getUser = params => {
  return api.get('/api/user', { params })
}

export const deleteUser = params => {
  return api.delete('/api/employee/delete', { params })
}

export const getAllRole = params => {
  return api.get('/api/role/queryCompanyRole', { params })
}

export const getAllPortCode = params => {
  return api.get('/api/portCode/queryAll', { params })
}

export const searchPortCode = params => {
  return api.get('/api/portCode/searchPortCodeByCodeOrName', { params })
}

export const saveOrUpdateOrderFirst = params => {
  return api.post('/api/orderFirst/saveOrUpdate', params, json)
}

export const searchCompanyByType = params => {
  return api.get('/api/contactCompany/searchCompanyWithCompanyCodeAndTypeByCodeOrName', { params })
}

export const saveOrUpdateOrderSecond = params => {
  return api.post('/api/orderSecond/saveOrUpdate', params, json)
}

export const saveOrUpdateOrderThird = params => {
  return api.post('/api/orderThird/saveOrUpdate', params, json)
}

export const getOrderTotalListPage = params => {
  return api.post('/api/orderTotal/queryByCondition', params, json)
}

export const saveOrUpdateOrderFourth = params => {
  return api.post('/api/orderFourth/saveOrUpdate', params, json)
}

export const saveOrUpdateOrderFifth = params => {
  return api.post('/api/orderFifth/saveOrUpdate', params, json)
}

export const saveOrUpdateOrderSix = params => {
  return api.post('/api/orderSix/saveOrUpdate', params, json)
}

export const saveOrUpdateOrderSeventh = params => {
  return api.post('/api/orderSeventh/saveOrUpdate', params, json)
}

export const getShipInfo = params => {
  return api.get('/cdp/fob001/ships/getList', { params })
}

export const getShipInfoNetwork = params => {
  return api.get('/cdp/fob001/ships/getList/network', { params })
}

export const getCreditCode = params => {
  return api.post('/cdp/open/qicc/ECICreditCode/getCreditCodeNew', params)
}

export const getOrderFirstDetail = params => {
  return api.get('/api/orderFirst/getDetailByOrderNumber', { params })
}

export const getOrderSecondDetail = params => {
  return api.get('/api/orderSecond/getOrderSecondsByNumber', { params })
}

export const addOrderSecond = params => {
  return api.post('/api/orderSecond', params)
}

export const updateOrderSecond = params => {
  return api.post('/api/orderSecond/update', params)
}

export const getEmployee = params => {
  return api.get('/api/employee', { params })
}

export const getOrderThirdDetail = params => {
  return api.get('/api/orderThird/getByOrderNumber', { params })
}

export const getOrderFourthDetail = params => {
  return api.get('/api/orderFourth/getByOrderNumber', { params })
}

export const getOrderFifthDetail = params => {
  return api.get('/api/orderFifth/getByOrderNumber', { params })
}

export const getOrderSixDetail = params => {
  return api.get('/api/orderSix/getByOrderNumber', { params })
}

export const getOrderSeventhDetail = params => {
  return api.get('/api/orderSeventh/getByOrderNumber', { params })
}

export const getShipsList = params => {
  return api.get('/cdp/open/ships/getList', { params })
}

export const deleteOrderTotal = params => {
  return api.delete('/api/orderTotal/delete', { params })
}

export const getOrderExport = params => {
  return api.get('/api/orderTotal/export', { params })
}