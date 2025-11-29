interface UserInfo {
  id: number;

  username: string;

  email: string;
}

interface LoginUserVo {
  userInfo: UserInfo;

  accessToken: string;

  refreshToken: string;
}
