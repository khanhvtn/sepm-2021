import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createBrand, updateBrand } from '../../../actions/brands';

const initialBrandData = {
    name: '',
    title: '',
    description: '',
    category: '',
    image: '',
};
const BrandForm = ({ currentId, setCurrentId }) => {
    const [brandData, setBrandData] = useState(initialBrandData);
    const dispatch = useDispatch();
    const classes = useStyles();
    const brand = useSelector((state) =>
        currentId
            ? state.brands.find((brand) => brand._id === currentId)
            : null
    );

    useEffect(() => {
        if (brand) {
            setBrandData(brand);
        }
    }, [brand]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updateBrand(currentId, brandData));
        } else {
            dispatch(createBrand(brandData));
        }
        clear();
    };
    const clear = () => {
        setBrandData(initialBrandData);
        if (currentId) {
            setCurrentId(null);
        }
    };
    return (
        <Paper className={classes.paper}>
            <form
                className={`${classes.root} ${classes.form}`}
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? 'Editting' : 'Creating'} a Brand
                </Typography>
                <TextField
                    fullWidth
                    name="name"
                    variant="outlined"
                    label="Name"
                    value={brandData.name}
                    onChange={(e) =>
                        setBrandData({ 
                            ...brandData, 
                            name: e.target.value 
                        })
                    }
                />
                <TextField
                    fullWidth
                    name="title"
                    variant="outlined"
                    label="Title"
                    value={brandData.title}
                    onChange={(e) =>
                        setBrandData({
                            ...brandData,
                            title: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    name="description"
                    variant="outlined"
                    label="Description"
                    value={brandData.description}
                    onChange={(e) =>
                        setBrandData({
                            ...brandData,
                            description: e.target.value,
                        })
                    }
                />
                <TextField
                    fullWidth
                    name="category"
                    variant="outlined"
                    label="Category"
                    value={brandData.category}
                    onChange={(e) =>
                        setBrandData({
                            ...brandData,
                            category: e.target.value,
                        })
                    }
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setBrandData({ 
                                ...brandData, 
                                image: base64 
                            })
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    fullWidth
                >
                    {currentId ? 'Edit' : 'Create'}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default BrandForm;
