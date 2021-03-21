import React from 'react';
import useStyles from './styles'

const ShareLink = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
                This place is for share link
            </div>
        </>
    )
}

export default ShareLink;