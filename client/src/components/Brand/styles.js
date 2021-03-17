import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  media: {
    width: 2000,
    height: 400
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 15
  },
  brandImg: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: 10

  },
  action: {
    paddingTop: 20,
    color: "#4a6fe6",
    cursor: "pointer",

    '&:hover': {
      color: "#1243de",
    },

  },
  brandDesc: {
    width: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    fontSize: 20
  },

  brandDesc1: {
    fontSize: 20
  },

  brandDiscountTagSection: {
    marginTop: 30,
    marginBottom: 12,
    lineHeight: 1
  }


}));