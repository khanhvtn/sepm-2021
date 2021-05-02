import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom';


const categories = [
    {
        id: 'Develop',
        children: [
            { id: 'Authentication', icon: <PeopleIcon />, link: '/dashboard/admin/users' },
            { id: 'Database', icon: <DnsRoundedIcon />, link: '/dashboard/admin/vouchers' },
            { id: 'Functions', icon: <SettingsEthernetIcon />, link: '/dashboard/admin/voucher-state' },
        ],
    },
];

function Navigator(props) {
    const location = useLocation();
    const { ...other } = props;
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState();

    useEffect(() => {
        setSelectedIndex(location.pathname)
    });

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    Vouchy
                </ListItem>
                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon className={classes.itemIcon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}>
                        <Link to="/dashboard/admin">
                            Dashboard
                        </Link>
                    </ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <React.Fragment key={id}>
                        <ListItem
                            className={classes.categoryHeader}

                        >
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, link }) => (
                            <ListItem
                                key={childId}
                                button
                                className={selectedIndex === link ? classes.itemActiveItem : classes.item}
                            >
                                <ListItem component={Link} to={link}>
                                    <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>
                            </ListItem>
                        ))}

                        <Divider className={classes.divider} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

export default Navigator;