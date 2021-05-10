import React from 'react'
import useStyles from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom'
const SimpleBanner = ({brandInfo}) => {
    const classes = useStyles();
    const history = useHistory();
    const handleGoToBrandDetail = (id) => {
        history.push({
            pathname: `/brand-home/${id}`
           
        })
    }
    return brandInfo == null ? <></> :(
        <Card className={classes.root1} onClick={()=>handleGoToBrandDetail(brandInfo._id)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={brandInfo.brandImage}
            title={brandInfo.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center" className={classes.brandName}>
              {brandInfo.name}
            </Typography>
           
          </CardContent>
        </CardActionArea>
      </Card>
    )
}

export default SimpleBanner;
