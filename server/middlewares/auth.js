import jwt from 'jsonwebtoken';
const auth = async (req, res, next) => {
    try {
        /* If clients request without authorization, then request will be denied. */
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Access Denied.' });
        }
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
        if (error.name === 'TokenExpiredError') {
            return res
                .status(401)
                .json({ ...error, message: 'User session is expired' });
        }
    }
};

export default auth;
