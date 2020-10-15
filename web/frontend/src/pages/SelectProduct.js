import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import {
    SideBySideMagnifier,
    MOUSE_ACTIVATION,
} from "react-image-magnifiers";
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon
} from "react-share";
import { animateScroll as scroll } from 'react-scroll'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollProducts from '../components/ScrollProduts'
import ChatBotComponent from '../components/ChatBotComponent'

// Actions
import itemActions from '../redux/actions/itemActions'
import shoppingCartActions from '../redux/actions/shoppingCartActions'

// MaterialUI
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import authActions from '../redux/actions/authActions'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const SelectProduct = (props) => {
    
    const borrarRepe = (variants) => {
        const variantsAux = []
        if (variants === undefined) return variantsAux
        variants.forEach(vari => {
            if (variantsAux.filter(varia => varia.color === vari.color).length !== 0)
                return
            variantsAux.push(vari)
        })
        return variantsAux
    }
    const variantsAux = []
    const [bottom, setBottom] = useState(true)
    const [product, setProduct] = useState({})
    const [prod, setProd] = useState({
        _id: props.match.params.id,
        remeraActual: '', color: '', size: '', cant: 1
    })
    const [render, setRender] = useState(true)
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const [value, setValue] = useState(0)
    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        scrollToTop()
        setStars()
        const productId = props.match.params.id
        props.upViews(productId)
        props.selectProductId(productId)
            .then(prodc => {
                setProduct({ ...prodc })
                setProd({
                    ...prod,
                    remeraActual: prodc.variants[0].photo,
                    color: prodc.variants[0].color,
                    title: prodc.title,
                    price: prodc.price
                })
            })
    }, [props.match.params.id, props.productRating.stars, render])

    var arrayFiltrado2 = props.productRating.productId === props.match.params.id

    const sendRating = () => {
        props.postRating(props.match.params.id, value, props.userlogged.token)
        props.mandarRating(props.match.params.id, value)
        setRender(!render)
        handleClose()
    }

    const addProducts = () => {
        if (prod.size === "") {
            toast.error("Please choose one size")
        } else {
            props.addProduct(prod)
            setBottom(!bottom)
            toast.success("You added a product to your cart!")
        }
    }

    var arrayFiltrado = props.product.filter(e => e._id === props.match.params.id)

    const scrollToTop = () => {
        scroll.scrollToTop();
    }

    const setStars = () => {

        if (!arrayFiltrado2) {
            return arrayFiltrado2 = arrayFiltrado
        }
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const BoxSize = (props) => {
        const sizeStyle = (props.vari.size === props.size) ? { backgroundColor: 'black', color: 'whitesmoke' } :
            { backgroundColor: 'whitesmoke' }
        return (
            <button style={{ border: '1px solid #BEBEBE', ...sizeStyle }}
                onClick={(e) => props.setProd({ ...props.prod, size: e.target.value })}
                value={props.vari.size} className='buttonSize'>
                {props.vari.size}</button>
        )
    }

    var rating = (arrayFiltrado[0].stars / arrayFiltrado[0].reviews).toFixed(1)

    if (product === {}) return <></>

    return (
        <>
            <Header bott={bottom} />
            <div className="oneProduct" style={{ padding: '0.1em 1em ', margin: '0vh auto', width: '100%' }}>
                <div className="aProduct1" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '5em' }}>{borrarRepe(product?.variants).map(vari => <img style={{ paddingTop: '20px' }} onClick={() => setProd({ ...prod, remeraActual: vari.photo, color: vari.color })}
                        src={vari.photo} alt={vari.title} style={{ width: '4em', height: '5em', margin: '0.5vh 2vh', border: '1px solid #F1F1F1', cursor: 'pointer' }} />)}
                    </div>
                    <SideBySideMagnifier
                        className="input-position"
                        style={{ width: '75vh' }}
                        imageSrc={prod?.remeraActual}
                        overlayOpacity={0.4}
                        alwaysInPlace={true}
                        fillGap={false}
                        mouseActivation={MOUSE_ACTIVATION.CLICK}
                        cursorStyle={"zoom-in"}
                    />
                </div>
                <div className="aProduct2" style={{ margin: '7vh 0vh' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '54vh' }}>
                            <h4>{product.title}</h4>
                            <h4>${product.price}</h4>
                        </div>
                        <div>
                            {!arrayFiltrado2 ?
                                <div style={{ display: 'flex', margin: '2vh 0vh', cursor: 'pointer' }} onClick={handleOpen}>
                                    <p>{isNaN(rating) ? 0 : rating}</p>
                                    <Rating name="half-rating" onClick={handleOpen} defaultValue={arrayFiltrado[0].stars / arrayFiltrado[0].reviews} precision={0.1} readOnly style={{ color: '#111111' }} />
                                    <p>{`(${arrayFiltrado[0].reviews})`}</p>
                                </div>
                                :
                                <div style={{ display: 'flex', cursor: 'pointer' }} onClick={handleOpen}>
                                    <p>{rating}</p>
                                    <Rating name="half-rating" defaultValue={props.productRating.stars / props.productRating.reviews} precision={0.1} readOnly style={{ color: 'black' }} />
                                    <p>{isNaN(rating) ? 0 : rating}</p>
                                </div>
                            }
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div className={classes.paper}>
                                        <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', margin: '5vh 10vh', }}>
                                            {props.userlogged.token ?
                                                <>
                                                    {!props.rating.filter(e => e.productId === props.match.params.id).length > 0 ?
                                                        <>
                                                            <Box component="fieldset" borderColor="transparent">
                                                                <p>Did you like the product? Rate it!</p>
                                                                <Rating
                                                                    name="simple-controlled"
                                                                    value={value}
                                                                    onChange={(event, newValue) => {
                                                                        setValue(newValue)

                                                                    }}
                                                                    style={{ color: '#111111' }}
                                                                />

                                                            </Box>

                                                            <button className="addToCart" style={{ width: '15vh', height: '5vh', fontSize: '2vh' }} onClick={sendRating} >Send Rating</button> </> :
                                                        <p>You already rated this product</p>}
                                                </> 
                                                : <h2>Log in to rate this product</h2>}
                                        </div>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                        <p style={{ padding: '7px 0 20px 0', fontWeight: 'lighter', width: '55vh' }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, width: '50%' }}>
                            <div>
                                <h6 style={{ margin: '1.5vh 0vh' }}>Colors:</h6>
                                <div style={{ display: 'flex' }}>
                                    {borrarRepe(product.variants).map(variant => {
                                        return (<div id="imagenShopChica2" onClick={() => setProd({
                                            ...prod, remeraActual: variant.photo,
                                            color: variant.color
                                        })} style={{
                                            border: ` ${variant.color === 'White' && '1px solid grey'}`,
                                            backgroundColor: `${variant.color === 'Anchor' ? '#4B4545' :
                                                variant.color === 'Black' ? '#111111' :
                                                    variant.color === 'Blush' ? 'rgb(239, 193, 179)' :
                                                        variant.color === 'Brown' ? 'rgb(134, 107, 87)' :
                                                            variant.color === 'Cream' ? '#FFF0C9' :
                                                                variant.color === 'Chateau' ? 'rgb(159, 103, 52)' :
                                                                    variant.color === 'DarkGrey' ? '#34343D' :
                                                                        variant.color === 'Egg Shell' ? '#E9DFD5' :
                                                                            variant.color === 'Flint' ? '#C2B1C1' :
                                                                                variant.color === 'Golden Harvest' ? '#E6B968' :
                                                                                    variant.color === 'Stone Grey' ? 'rgb(200, 198, 198)' :
                                                                                        variant.color === 'Granite' ? '#B4AFB1' :
                                                                                            variant.color === 'Honeycomb' ? '#C98E2A' :
                                                                                                variant.color === 'Moonlight' ? 'rgb(225, 212, 197)' :
                                                                                                    variant.color === 'Military Moss' ? '#695530' :
                                                                                                        variant.color === 'Mountain Mist' ? 'rgb(169, 143, 135)' :
                                                                                                            variant.color === 'Night Owl' ? 'rgb(48, 59, 79)' :
                                                                                                                variant.color === 'Ocean Storm' ? 'rgb(93, 100, 121)' :
                                                                                                                    variant.color === 'Paloma' ? '#F2BBBE' :
                                                                                                                        variant.color === 'Red Rum' ? '#774A47' :
                                                                                                                            variant.color === 'Salt' ? '#ECE9E2' :
                                                                                                                                variant.color === 'Sage' ? '#737B7D' :
                                                                                                                                    variant.color === 'Sweet Basil' ? 'rgb(128, 125, 94)' :
                                                                                                                                        variant.color === 'Vintage' ? 'rgb(85, 99, 115)' :
                                                                                                                                            variant.color === 'Wine' ? '#44282D' :
                                                                                                                                                variant.color === 'White' ? 'whitesmoke' : ''}`
                                        }} > </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <div name="size" id="size" style={{ display: 'flex', flexDirection: 'column', width: '55vh' }}>
                                <h6 style={{ margin: '1.5vh 0vh' }}>Size: {prod.size} </h6>
                                <div style={{ display: 'flex', width: '30vw' }}>
                                    {(product?.variants?.filter(vari => vari.color === prod.color))?.map(vari => <BoxSize vari={vari}
                                        size={prod.size} prod={prod} setProd={setProd} />)}
                                    <div>
                                        {(prod.size !== '' || prod.size !== 'Choose the size') &&
                                            <>{(product?.variants?.filter(vari => (vari.color === prod.color && vari.size === prod.size))[0]?.stock < 10 && <p style={{ margin: '1vh 1vh' }}>Last units</p>)}</>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '3vh 0vh', width: '55vh' }}>
                            <h6 style={{}}>Share this product:</h6>
                            <WhatsappShareButton style={{ margin: '0vh 1vh' }}
                                url={`https://pyral.herokuapp.com/selectProduct/${props.match.params.id}`}
                                quote={"Pyral - a new way of dressing"}
                                hashtag={`Pyral`}
                            >
                                <WhatsappIcon size={35} round={true} />
                            </WhatsappShareButton>
                            <FacebookShareButton
                                url={`https://pyral.herokuapp.com/selectProduct/${props.match.params.id}`}
                                quote={"Pyral - a new way of dressing"}
                                hashtag={`Pyral`}
                            >
                                <FacebookIcon size={35} round={true} />
                            </FacebookShareButton>
                            <TwitterShareButton style={{ margin: '0vh 1vh' }}
                                url={`https://pyral.herokuapp.com/selectProduct/${props.match.params.id}`}
                                quote={"Pyral - a new way of dressing"}
                                hashtag="#Pyral"
                            >
                                <TwitterIcon size={35} round={true} />
                            </TwitterShareButton>
                            <TelegramShareButton
                                url={`https://pyral.herokuapp.com/selectProduct/${props.match.params.id}`}
                                quote={"Pyral - a new way of dressing"}
                                hashtag="#Pyral"
                            >
                                <TelegramIcon size={35} round={true} />
                            </TelegramShareButton>
                        </div>
                        <button onClick={() => addProducts()} className="addToCart" style={{ width: '54vh' }}>Add to cart</button>
                    </div>
                </div>
            </div>
            <ScrollProducts />
            <ChatBotComponent />
            <div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '3vh' }}>
                        <h3 style={{ margin: '2vh auto' }}>#wemakeit</h3>
                        <h5 className="hashtags" style={{ margin: '2vh auto', fontWeight: 'lighter', textAlign: 'center' }}>Demand versatile performance. Follow the journey for originality and expression at @pyral</h5>
                        <div className="instaDiv" style={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center', margin: '5vh 0vh' }}>
                            <div className="oneDiv">
                                <div className="instaPhotos" style={{ backgroundImage: `url(https://cdn-yotpo-images-production.yotpo.com/instagram/25/17891492716647625/standard_resolution.jpg)` }}></div>
                                <div className="instaPhotos" style={{ backgroundImage: `url(https://cdn-yotpo-images-production.yotpo.com/instagram/14/17848977176285314/standard_resolution.jpg)` }}></div>
                            </div>
                            <div className="oneDiv">
                                <div className="instaPhotos" style={{ backgroundImage: `url(https://cdn-yotpo-images-production.yotpo.com/instagram/57/17878968142792357/standard_resolution.jpg)` }}></div>
                                <div className="instaPhotos" style={{ backgroundImage: `url(https://cdn-yotpo-images-production.yotpo.com/instagram/30/17842593536342330/standard_resolution.jpg)` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

const mapDispatchToProps = {
    selectProductId: itemActions.selectProductId,
    addProduct: shoppingCartActions.addProduct,
    postRating: authActions.rating,
    mandarRating: itemActions.rating,
    upViews: itemActions.upViews
}

const mapStateToProps = state => {
    return {
        rating: state.authReducer.rating,
        productId: state.authReducer.productId,
        product: state.itemReducer.product,
        productRating: state.itemReducer.rating,
        userlogged: state.authReducer,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectProduct)
