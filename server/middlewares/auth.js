import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        if (token && isCustomAuth) {
            //verify token of user from own database
            decodedData = jwt.verify(token, 'vouchy123');
            req.userId = decodedData?.id;
        } else {
            //verify token of user from google
            decodedData = jwt.verify(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
