const initialState = {
    components: [],
    accessories: [],
    categoryID: '',
    isLoggedIn: false,
    _id: '',
    email: '',
    name: '',
    age: 0,
    token: '',
    cart: [],
    products: [],
    product: {},
    productQuantity: 0,
    totalPrice: 0,
    detail: null,

    startIndex: 0,
    length: 5,

    order: [],
    keyword: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                token: action.payload.token,
                _id: action.payload._id,
                cart: action.payload.cart,
                isLoggedIn: action.payload.isLoggedIn
            }
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload.products
            }
        case 'SET_CATEGORYID':
            return {
                ...state,
                categoryID: action.payload.categoryID
            }
        case 'LOGOUT':
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                _id: action.payload._id,
                isLoggedIn: action.payload.isLoggedIn,
                cart: action.payload.cart,
                totalPrice: action.payload.totalPrice,
                detail: action.payload.detail,
                order: action.payload.order
            }
        case 'SET_USER_AFTER_REGISTER':
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                age: action.payload.age,
                token: action.payload.token,
                _id: action.payload._id
            }
        case 'SET_COMPONENT':
            return {
                ...state,
                components: action.payload.components
            }
        case 'SET_ACCESSORY':
            return {
                ...state,
                accessories: action.payload.accessories
            }
        case 'SET_CART':
            return {
                ...state,
                cart: action.payload.cart
            }
        case 'SET_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.payload.totalPrice
            }
        case 'SET_PRODUCT':
            return {
                ...state,
                product: action.payload.product
            }
        case 'SET_PRODUCT_QUANTITY':
            return {
                ...state,
                productQuantity: action.payload.productQuantity
            }
        case 'SET_PAGE':
            return {
                ...state,
                startIndex: action.payload.startIndex,
                length: action.payload.length
            }
        case 'SET_ORDER':
            return {
                ...state,
                order: action.payload.order
            }
        case 'SET_KEYWORD':
            return {
                ...state,
                keyword: action.payload.keyword
            }

    }
    return state
}

export default reducer
