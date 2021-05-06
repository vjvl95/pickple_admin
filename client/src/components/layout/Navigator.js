import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom"
const categories = [
  {
    id: '관리',
    children: [
      { id: '태그 관리', icon: <SettingsEthernetIcon />},
      { id: '모집글 관리', icon: <DnsRoundedIcon /> },
      { id: '신고 관리', icon: <PermMediaOutlinedIcon /> },
      { id: '지원 관리', icon: <PublicIcon /> },
      { id: '사용자 관리', icon: <PeopleIcon /> },
      { id: '프로필 관리', icon: <SettingsInputComponentIcon /> },
    ],
  },
];


const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

const Navigator = (props) => {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          관리자 페이지
        </ListItem>
       
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
          
            <Link to="/admin/">
                    <ListItem button className={clsx(classes.item, classes.itemActiveItem)}>
                          <ListItemIcon className={classes.itemIcon}><HomeIcon /></ListItemIcon>
                            <ListItemText classes={{primary: classes.itemPrimary}}>
                            {"홈"}
                          </ListItemText> 
                    </ListItem>
            </Link>




           <Link to="/admin/tag">
                    <ListItem
                          button
                          className={clsx(classes.item, classes.itemActiveItem)}>
                          <ListItemIcon className={classes.itemIcon}><SettingsEthernetIcon /></ListItemIcon>
                            <ListItemText classes={{primary: classes.itemPrimary}}>
                            {"태그 관리"}
                          </ListItemText> 
                    </ListItem>
            </Link>

                <Link to="/admin/board">
                          <ListItem button className={clsx(classes.item, classes.itemActiveItem)}>
                                  <ListItemIcon className={classes.itemIcon}><DnsRoundedIcon /></ListItemIcon>
                                    <ListItemText  classes={{primary: classes.itemPrimary }}>
                                    {"모집글 관리"}
                                  </ListItemText> 
                          </ListItem>
                </Link>
                
                <Link to="/admin/report">
                <ListItem button className={clsx(classes.item, classes.itemActiveItem)}>
                    <ListItemIcon className={classes.itemIcon}><PermMediaOutlinedIcon /></ListItemIcon>
                      <ListItemText classes={{primary: classes.itemPrimary}}>
                      {"신고 관리"}
                    </ListItemText> 

            </ListItem>
                </Link>
                <Link to="/admin/apply">
                <ListItem
                    button
                    className={clsx(classes.item, classes.itemActiveItem)}>
                    <ListItemIcon className={classes.itemIcon}><PublicIcon /></ListItemIcon>
                      <ListItemText classes={{primary: classes.itemPrimary}}>
                      {"지원 관리"}
                    </ListItemText> 
            </ListItem>
                </Link>
                <Link to="/admin/user">
                <ListItem button className={clsx(classes.item, classes.itemActiveItem)}>
                    <ListItemIcon className={classes.itemIcon}><PeopleIcon /></ListItemIcon>
                      <ListItemText classes={{primary: classes.itemPrimary}}>
                      {"사용자 관리"}
                    </ListItemText> 
            </ListItem>
                </Link>
                <Link to="/admin/profile">
                <ListItem
                    button
                    className={clsx(classes.item, classes.itemActiveItem)}>
                    <ListItemIcon className={classes.itemIcon}><SettingsInputComponentIcon /></ListItemIcon>
                      <ListItemText classes={{primary: classes.itemPrimary}}>
                      {"프로필 관리"}
                    </ListItemText> 
            </ListItem>
                </Link>

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);