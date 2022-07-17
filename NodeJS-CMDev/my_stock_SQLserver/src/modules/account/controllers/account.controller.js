import AccountService from "../services/account.service";

export default {
  register: async (req, res) => {
    const result = await AccountService.register(req.body)
    res.status(201).json({
      success: true,
      data: result,
    })
  },
  login: async (req, res) => {
    const { username, password } = req.body
    const token = await AccountService.login(username, password)
    if (!token) {
        res.status(401).json({
            success: true,
            data: 'invalid username or password',
        })
    }

    res.status(200).json({
      success: true,
      token: token,
    })
  },
  profileInfo: (req, res) => {
    res.status(200).json({
      username: req.sub,
      role: req.role
    })
  }
};
