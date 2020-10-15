import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import shoppingCartActions from '../redux/actions/shoppingCartActions'

const ItemCarrito = (props) => {
    const [button, setButton] = useState(true)

    useEffect(() => {
    }, [button])

    const modStock = (cant) => {
        if (props.render !== undefined) {
            props.setRender(!props.render)
        }
        props.updateQuantity(props.product, cant)
        setButton(!button)
    }

    return (
        <>
            <div id="unelEmentoCarrito" >
                <div className="imageAndSize">
                    <img src={`${props.product.remeraActual}`}></img>
                    <div id="tituloCantidad" style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Size / {props.product.size}</p>
                        <p>{props.product.color} {props.product.title}</p>

                        <div id="cantidad">
                            <button onClick={() => modStock(-1)}
                                style={{ backgroundColor: 'white', border: 'none' }}><Remove /></button>
                            <p>{props.product.cant}</p>
                            <button onClick={() => modStock(1)}
                                style={{ backgroundColor: 'white', border: 'none' }}><Add /></button>
                        </div>
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
    removeProduct: shoppingCartActions.removeProduct,
}

export default connect(null, mapDispatchToProps)(ItemCarrito)    
