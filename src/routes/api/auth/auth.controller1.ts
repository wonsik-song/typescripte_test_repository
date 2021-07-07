import {Request, Response} from 'express';
const jwt = require('jsonwebtoken');
const User = require('../../../model/user');
const {OAuth2Client} = require('google-auth-library');
const {google} = require('googleapis');
const crypto = require('crypto');
const config = require('../../../../config');

import {AuthService} from './auth.service';
import {UserDto} from '../user/userDTO';
import {UserService} from '../user/user.service';

const CLIENT_ID = '222033073305-aaef3mh2dtpbpbeaid2822f27979110n.apps.googleusercontent.com';

export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  public register(req: Request, res: Response) {
    const {email, password, token} = req.body;
    const isNewUser = false;
    const userDto: UserDto = new UserDto(token, email, password);

    try {
      const userData = this.userService.findUser(userDto.email);
      if (userData) {
        if (!this.authService.verifyAccountToken(userDto)) {
          throw new Error('email does not match with Database info');
        }
      } else {
        this.userService.registerUser(userDto);
      }

      res.json({
        message: 'registered1 successfully',
        email: userData?.email,
        // id: userData.id,
        // username: userData.username,
        // newRegister: isNewUser,
        // address: userData.address,
        // maritalStatus: userData.maritalStatus,
        // nationality: userData.nationality,
        // nationalityUriId: userData.nationalityUriId,
        // gender: userData.gender,
        // age: userData.age,
        // birthday:userData.birthday
      });
    } catch (error) {
      console.log(error.message);
      res.status(409).json({
        message: error.message,
      });
    }
  }

  public login(req: Request, res: Response) {
    const {email, password} = req.body;
    const userDto: UserDto = new UserDto('', email, password);
    const secret = req.app.get('jwt-secret');

    try {
      const userData = this.userService.findUser(userDto.email);
      if (!userData) {
        throw new Error('login failed');
      } else {
        if (this.authService.verifyPassword(userData.password, userDto.password)) {
          const token = this.authService.generateToken(userDto, secret);
          res.json({
            message: 'logged in successfully',
            token,
          });
        }
      }
    } catch (error) {
      console.log('error:', error);
      res.status(403).json({
        message: error.message,
      });
    }
    return false;
  }
}

/*
    GET /api/auth/check
*/

exports.check = (req: any, res: Response) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};

exports.delete = (req: Request, res: Response) => {
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

exports.update = (req: any, res: Response) => {
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
