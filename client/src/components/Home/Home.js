import useStyles from './styles';

import Carousel from 'react-material-ui-carousel'
import Banner from '../Banner/Banner'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    Typography, Button
} from '@material-ui/core';

const Home = () => {
    var items = [
        {
            Name: "Electronics",
            Caption: "Electrify your friends!",
            contentPosition: "left",
            Items: [
                {
                    Name: "Macbook Pro",
                    Image: "https://source.unsplash.com/featured/?macbook"
                },
                {
                    Name: "iPhone",
                    Image: "https://source.unsplash.com/featured/?iphone"
                }
            ]
        },
        {
            Name: "Home Appliances",
            Caption: "Say no to manual home labour!",
            contentPosition: "middle",
            Items: [
                {
                    Name: "Washing Machine WX9102",
                    Image: "https://source.unsplash.com/featured/?washingmachine"
                },
                {
                    Name: "Learus Vacuum Cleaner",
                    Image: "https://source.unsplash.com/featured/?vacuum,cleaner"
                }
            ]
        },
        {
            Name: "Decoratives",
            Caption: "Give style and color to your living room!",
            contentPosition: "right",
            Items: [
                {
                    Name: "Living Room Lamp",
                    Image: "https://source.unsplash.com/featured/?lamp"
                },
                {
                    Name: "Floral Vase",
                    Image: "https://source.unsplash.com/featured/?vase"
                }
            ]
        }
    ]

    const classes = useStyles();
    return (
        <>
            <Carousel
                navButtonsAlwaysInvisible={true}
                NextIcon={<ArrowForwardIcon/>}
            >
                {
                    items.map((item, index) => {
                        return <Banner/>
                    })            
                }
            </Carousel>
            
        </>
    )
};

export default Home;
