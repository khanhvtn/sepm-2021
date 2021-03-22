import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { CardActions, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Banner = (props) => {
    const classes = useStyles();
    const [displayCardMedia, setDisplayCardMedia] = useState(true)
    const { title, description, button, image, brand, isBanner } = props

    const readFullDescription = () => {
        setDisplayCardMedia(!displayCardMedia)
    }

    return (
        <>
            <Card className={classes.root}>
                <div className={displayCardMedia ? classes.details : classes.detailsNoMedia}>
                    <CardActions className={classes.branding}>
                        <Link to="/brand">
                            <Avatar className={classes.logo} alt='logo' src='https://source.unsplash.com/featured/?macbook' />
                        </Link>
                        <Typography className={classes.title} component="h6" variant="h6">
                            Sumo BBQ
                        </Typography>
                    </CardActions>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} component="h5" variant="h5">
                            Student now get 6% free month {title}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.description}>
                        {displayCardMedia ?
                            <Typography variant="body1" className={classes.brandDesc}>
                                Gắn liền với tên gọi của nghệ thuật nướng nổi tiếng Nhật Bản, Sumo Yakiniku là nhà hàng thịt nướng chú trọng đến nguyên liệu thượng hạng hay quá trình chuẩn bị tinh tế công phu từ bảo quản, chế biến thịt, sốt ướp, sốt chấm và kỹ thuật nướng.

                                Với Menu gọi món của Sumo, thực khách sẽ được thưởng thức trọn vẹn mỹ vị Nhật bản: từ các loại thịt cao cấp với bò Wagyu, Harami, thăn ngoại bò Mỹ, heo Iberico cho tới các loại lẩu và món ăn kèm đặc sắc. Bên cạnh đó, Sumo Yakiniku còn phục vụ menu Buffet dành cho khách hàng muốn tận hưởng thoả thích thịt nướng Nhật Bản hay Course/Combo dành cho nhóm 2-3 thực khách.
                                </Typography>
                            :
                            <Typography variant="body1" className={classes.brandDesc1}>
                                Gắn liền với tên gọi của nghệ thuật nướng nổi tiếng Nhật Bản, Sumo Yakiniku là nhà hàng thịt nướng chú trọng đến nguyên liệu thượng hạng hay quá trình chuẩn bị tinh tế công phu từ bảo quản, chế biến thịt, sốt ướp, sốt chấm và kỹ thuật nướng.

                                Với Menu gọi món của Sumo, thực khách sẽ được thưởng thức trọn vẹn mỹ vị Nhật bản: từ các loại thịt cao cấp với bò Wagyu, Harami, thăn ngoại bò Mỹ, heo Iberico cho tới các loại lẩu và món ăn kèm đặc sắc. Bên cạnh đó, Sumo Yakiniku còn phục vụ menu Buffet dành cho khách hàng muốn tận hưởng thoả thích thịt nướng Nhật Bản hay Course/Combo dành cho nhóm 2-3 thực khách.
                                </Typography>
                        }
                    </CardContent>
                    <div className={classes.controls}>
                        {isBanner ?
                            <Button className={classes.getButton} variant="outlined" color="primary">
                                Get now {button}
                            </Button>
                            :
                            <Link className={classes.readMore} onClick={readFullDescription} href="#">
                                {displayCardMedia ? `Read more` : `Read less`}
                            </Link>
                        }
                    </div>
                </div>
                {displayCardMedia ?
                    <CardMedia
                        className={classes.cover}
                        image="https://source.unsplash.com/featured/?macbook"
                        title="Live from space album cover"
                    />
                    : null
                }
            </Card>
        </>
    );
};

export default Banner;

Banner.prototype = {
    title: PropTypes.string,
    description: PropTypes.string,
    button: PropTypes.string,
    image: PropTypes.string,
    brand: PropTypes.string,
    isBanner: PropTypes.bool
}