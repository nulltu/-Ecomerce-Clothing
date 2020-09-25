import React from 'react';
import { connect } from 'react-redux'
import '../styles/carrito.css'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import shoppingCartActions from '../redux/actions/shoppingCartActions'
const ItemCarrito = (props) => {
    return (
        <>
            <div id="unelEmentoCarrito">
                <div id="imageCarrito" style={{ backgroundImage: `url(${props.product.remeraActual})`, width: "8vw", height: "8vw" }}></div>

                <div id="tituloCantidad">
                    <p>{props.product.title}</p>
                    <div id="cantidad">
                        <button onClick={() => props.updateQuantity(props.product,-1)} 
                            style={{ backgroundColor: 'white', border: 'none' }}><Remove/></button>
                        <p>{props.product.cant}</p>
                        <button onClick={() => props.updateQuantity(props.product,1)} 
                                style={{ backgroundColor: 'white', border: 'none' }}><Add/></button>
                    </div>
                </div>

                    <Tooltip onClick={() => props.removeProduct(props.product)} title="Delete" style={{ height: '50px' }} >
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    )




}

const mapDispatchToProps = {
    updateQuantity: shoppingCartActions.updateQuantity,
    removeProduct: shoppingCartActions.removeProduct
}

export default connect(null, mapDispatchToProps)(ItemCarrito)    