import * as express from 'express';
const jwt = require('jsonwebtoken');
const User = require('../../../model/user');
const {OAuth2Client} = require('google-auth-library');
const {google} = require('googleapis');
const crypto = require('crypto');
const config = require('../../../../config');

const CLIENT_ID = '222033073305-aaef3mh2dtpbpbeaid2822f27979110n.apps.googleusercontent.com';

exports.checkToken = (req: express.Request, res: express.Response) => {
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.query.token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload, payload['email']);
  }

  const respond = () => {
    res.json({
      message: 'registered successfully',
    });
  };

  // run when there is an error (username exists)
  const onError = (error: any) => {
    console.log(error.message);
    res.status(409).json({
      message: error.message,
    });
  };

  verify().then(respond).catch(onError);
};

exports.register = (req: express.Request, res: express.Response) => {
  const {email, password, googleToken} = req.body;
  let isNewUser = false;
  const userRequestInfo = {
    email: '',
    password: password,
    id: '',
  };

  const verifyGoogleAccountToken = (userDbInfo: any) => {
    if (userDbInfo) {
      const p = new Promise((resolve, reject) => {
        new OAuth2Client(CLIENT_ID).verifyIdToken(
          {
            idToken: googleToken,
            audience: CLIENT_ID,
          },
          // tslint:disable-next-line:only-arrow-functions
          function (e: any, login: any) {
            const decodedUserInfo = login.getPayload();
            if (decodedUserInfo['email'] !== userDbInfo.email) {
              throw new Error('email does not match with Database info');
            } else {
              resolve(userDbInfo);
            }
          },
        );
      });
      return p;
    } else {
      isNewUser = true;
      return User.create(req);
    }
  };

  const saveUserInfo = (userInfo: any, data: any) => {
    console.log(data);
    userInfo.email = data.email;
    // userInfo.password = data.password;
    userInfo.id = data.id;
    return userInfo;
  };

  const respond = (userInfoData: any) => {
    console.log('respond:' + isNewUser + userInfoData.username);
    res.json({
      message: 'registered1 successfully',
      email: userInfoData.email,
      id: userInfoData.id,
      username: userInfoData.username,
      newRegister: isNewUser,
      address: userInfoData.address,
      maritalStatus: userInfoData.maritalStatus,
      nationality: userInfoData.nationality,
      nationalityUriId: userInfoData.nationalityUriId,
      gender: userInfoData.gender,
      age: userInfoData.age,
      birthday: userInfoData.birthday,
    });
  };

  // run when there is an error (username exists)
  const onError = (error: any) => {
    console.log(error.message);
    res.status(409).json({
      message: error.message,
    });
  };

  User.findOneByEmail(email).then(verifyGoogleAccountToken).then(respond).catch(onError);
};

exports.login = (req: express.Request, res: express.Response) => {
  const {email, password} = req.body;
  const secret = req.app.get('jwt-secret');

  console.log('login:', email, password);
  // check the user info & generate the jwt
  const check = (user: any) => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
    } else {
      console.log(user.email, user.password);
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username,
              email: user.email,
              id: user.id,
              userType: user.userType,
            },
            secret,
            {
              expiresIn: '7d',
              issuer: 'sws.com',
              subject: 'userInfo',
            },
            (err: any, token: any) => {
              if (err) reject(err);
              resolve(token);
            },
          );
        });
        return p;
      } else {
        throw new Error('login failed');
      }
    }
  };

  // respond the token
  const respond = (token: any) => {
    res.json({
      message: 'logged in successfully',
      token,
    });
  };

  // error occured
  const onError = (error: any) => {
    res.status(403).json({
      message: error.message,
    });
  };

  // find the user
  User.findOneByEmail(email).then(check).then(respond).catch(onError);
};

/*
    GET /api/auth/check
*/

exports.check = (req: any, res: express.Response) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};

exports.delete = (req: express.Request, res: express.Response) => {
  const respond = (token: any) => {
    res.json({
      message: 'delete is in successfully',
      token,
    });
  };

  // error occured
  const onError = (error: any) => {
    res.status(403).json({
      message: error.message,
    });
  };

  User.delete(req).then(respond).catch(onError);
};

exports.update = (req: any, res: express.Response) => {
  const respond = () => {
    res.json({
      message: 'update is in successfully',
    });
  };
  // count the number of the user
  const update = (user: any) => {
    (user.address = req.body.address),
      (user.maritalStatus = req.body.maritalStatus),
      (user.nationality = req.body.nationality),
      (user.nationalityUriId = req.body.nationalityUriId),
      (user.gender = req.body.gender),
      (user.age = req.body.age),
      (user.birthday = req.body.birthday);
    return user.save();
  };

  const onError = (error: any) => {
    res.status(403).json({
      message: error.message,
    });
  };

  User.findOneByEmail(req.decoded.email).then(update).then(respond).catch(onError);
};
