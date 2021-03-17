import React, { useState } from 'react'
import useStyles from './styles'
import { Card, CardContent, Typography, Avatar, CardActions, ButtonBase } from '@material-ui/core'
import logo from '../../images/sumo-logo.jpeg'
import brandImg from '../../images/sumo-brand.jpeg'
import CardMedia from '@material-ui/core/CardMedia'




const Brand = () => {
    const classes = useStyles();
    const [read, setRead] = useState(true)
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <div className={classes.brand}>
                        <Avatar alt="Sumo BBQ Logo" src={logo} className={classes.brandImg} />
                        <Typography component="h4" variant="h4">
                            Sumo BBQ
                    </Typography>
                    </div>


                    {read ? <Typography variant="body1" className={classes.brandDesc}>
                        Gắn liền với tên gọi của nghệ thuật nướng nổi tiếng Nhật Bản, Sumo Yakiniku là nhà hàng thịt nướng chú trọng đến nguyên liệu thượng hạng hay quá trình chuẩn bị tinh tế công phu từ bảo quản, chế biến thịt, sốt ướp, sốt chấm và kỹ thuật nướng.

                        Với Menu gọi món của Sumo, thực khách sẽ được thưởng thức trọn vẹn mỹ vị Nhật bản: từ các loại thịt cao cấp với bò Wagyu, Harami, thăn ngoại bò Mỹ, heo Iberico cho tới các loại lẩu và món ăn kèm đặc sắc. Bên cạnh đó, Sumo Yakiniku còn phục vụ menu Buffet dành cho khách hàng muốn tận hưởng thoả thích thịt nướng Nhật Bản hay Course/Combo dành cho nhóm 2-3 thực khách.
                    </Typography> :
                        <Typography variant="body1" className={classes.brandDesc1}>
                            Gắn liền với tên gọi của nghệ thuật nướng nổi tiếng Nhật Bản, Sumo Yakiniku là nhà hàng thịt nướng chú trọng đến nguyên liệu thượng hạng hay quá trình chuẩn bị tinh tế công phu từ bảo quản, chế biến thịt, sốt ướp, sốt chấm và kỹ thuật nướng.

                            Với Menu gọi món của Sumo, thực khách sẽ được thưởng thức trọn vẹn mỹ vị Nhật bản: từ các loại thịt cao cấp với bò Wagyu, Harami, thăn ngoại bò Mỹ, heo Iberico cho tới các loại lẩu và món ăn kèm đặc sắc. Bên cạnh đó, Sumo Yakiniku còn phục vụ menu Buffet dành cho khách hàng muốn tận hưởng thoả thích thịt nướng Nhật Bản hay Course/Combo dành cho nhóm 2-3 thực khách.

                </Typography>}


                    <Typography component="h6" variant="h6" className={classes.action} onClick={() => setRead(!read)}>
                        {read ? "Read more" : "Read less"}
                    </Typography>
                </CardContent>
            </div>

            {read ? <CardMedia
                className={classes.media}
                component="img"
                alt="Contemplative Reptile"
                image={brandImg}
                title="Contemplative Reptile"
            /> : <div></div>}

        </Card>
    )
}

export default Brand;
