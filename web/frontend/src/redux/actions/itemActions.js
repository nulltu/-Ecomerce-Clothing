import axios from 'axios'

var path = 'http://localhost:4000/api'

const itemActions = {

    addItem: formItem => {

        return async(dispatch, getState) => {
            const response = await axios.post(path+`/nombreBackend`, formItem, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const item = response.data
            if (!response.data.success) {
                alert('Something went wrong')
            } else {
                dispatch({
                    type: 'ADD_ITEM',
                    payload: { title: item.title, description: item.description, photo: item.photo, price: item.price, stock: item.stock, type: item.type }
                })
            }
        }
    }
}

export default itemActions