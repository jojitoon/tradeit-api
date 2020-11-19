import User from '../models/users';

export async function createUser(req, res) {
  const { phone, email, username, location } = req.body;
  const user = new User({
    phone,
    email,
    username,
    location: { type: 'Point', coordinates: location },
  });

  try {
    // if (!user.phoneNumber || !user.countryCode)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: 'incomplete data' });

    // user.image =
    //   'https://res.cloudinary.com/dugyowd21/image/upload/v1573762163/blank-profile-picture-973460_h6smmk.png';
    // user.phoneNumber = ValidNumber(user.phoneNumber, user.countryCode);

    // if (
    //   user.phoneNumber === '+2347038589263' ||
    //   user.phoneNumber === '+2347031234560' ||
    //   user.phoneNumber === '+2349034595050'
    // ) {
    //   return res.status(201).json({
    //     success: true,
    //     user: user.phoneNumber,
    //     message: `sms successfully sent to ${user.phoneNumber}`,
    //   });
    // }

    // const userExists = await User.countDocuments({
    //   phoneNumber: user.phoneNumber,
    // });

    // if (userExists >= 1) {
    //   const data = {
    //     api_key: env.termiiKey,
    //     message_type: 'NUMERIC',
    //     to: user.phoneNumber,
    //     from: 'N-Alert',
    //     channel: 'dnd',
    //     pin_attempts: 10,
    //     pin_time_to_live: 10,
    //     pin_length: 5,
    //     pin_placeholder: '< 12345 >',
    //     message_text:
    //       'Your aabo confirmation code is < 12345 >. This code is valid for 10 minutes.',
    //     pin_type: 'NUMERIC',
    //   };

    //   var options = {
    //     method: 'POST',
    //     url: 'https://termii.com/api/sms/otp/send',
    //     headers: {
    //       'Content-Type': ['application/json', 'application/json'],
    //     },
    //     body: JSON.stringify(data),
    //   };

    //   return request(options, function (error, response) {
    //     let resBod = JSON.parse(response.body);
    //     if (error) {
    //       setLog(error, 'user', 'Token not sent. Try again', '400');
    //       return res
    //         .status(400)
    //         .json({ success: false, message: 'Token not sent. Try again' });
    //     } else {
    //       User.updateOne(
    //         { phoneNumber: user.phoneNumber },
    //         { $set: { pinId: resBod.pinId } }
    //       )
    //         .exec()
    //         .then(() => {
    //           return res.status(200).json({
    //             success: true,
    //             user: user.phoneNumber,
    //             message: `sms successfully sent to ${user.phoneNumber}`,
    //           });
    //         });
    //     }
    //   });
    // }

    // const data = {
    //   api_key: env.termiiKey,
    //   message_type: 'NUMERIC',
    //   to: user.phoneNumber,
    //   from: 'N-Alert',
    //   channel: 'dnd',
    //   pin_attempts: 10,
    //   pin_time_to_live: 10,
    //   pin_length: 5,
    //   pin_placeholder: '< 12345 >',
    //   message_text:
    //     'Your aabo confirmation code is < 12345 >. This code is valid for 10 minutes.',
    //   pin_type: 'NUMERIC',
    // };

    // var options = {
    //   method: 'POST',
    //   url: 'https://termii.com/api/sms/otp/send',
    //   headers: {
    //     'Content-Type': ['application/json', 'application/json'],
    //   },
    //   body: JSON.stringify(data),
    // };

    // request(options, function (error, response) {
    //   let resBod = JSON.parse(response.body);
    //   if (error) {
    //     setLog(error, 'user', 'Token not sent. Try again', '400');
    //     return res
    //       .status(400)
    //       .json({ success: false, message: 'Token not sent. Try again' });
    //   } else {
    //     user.pinId = resBod.pinId;
    //     user.save((error) => {
    //       if (error) {
    //         setLog(error, 'user', `${error.message}`, '400');
    //         return res.status(400).json({ message: error.message });
    //       }
    user.save((error) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
    });
    return res.status(201).json({
      success: true,
      user: user,
      message: `user successfully created`,
    });
  } catch (error) {
    return res.status(500).json(logger(`Server error: ${error}`));
  }
}
