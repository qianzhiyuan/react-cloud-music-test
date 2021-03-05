import React, {memo, useState} from 'react';
import "./login.scss";
import {useDispatch} from "react-redux";
import {useToast} from "../../utils/useToast";
import {getLoginData} from "../../server/getServerData";
import {setLocalStorage} from "../../utils/stroge";
import {setLoginInfo} from "../../store/login";

function Login(props) {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {showToast} = useToast()

  function changeInput(e) {
    let name = e.target.name
    let value = e.target.value
    if (name === 'phone') {
      setPhone(value)
    } else {
      setPassword(value)
    }
  }

  async function login() {
    /*let res = {
      "loginType": 1,
      "code": 200,
      "account": {
        "id": 448205058,
        "userName": "1_13631923739",
        "type": 1,
        "status": 0,
        "whitelistAuthority": 0,
        "createTime": 1490955286082,
        "salt": "[B@2211301f",
        "tokenVersion": 0,
        "ban": 0,
        "baoyueVersion": 1,
        "donateVersion": 0,
        "vipType": 11,
        "viptypeVersion": 1613276880747,
        "anonimousUser": false
      },
      "token": "db84b0c6c9ca26f9c284feca7c7b902a0bfc59249e16da2a8ae63cf898c79dad33a649814e309366",
      "profile": {
        "city": 441300,
        "djStatus": 0,
        "backgroundImgId": 109951163848526350,
        "nickname": "谁言吋心",
        "birthday": 796492800000,
        "avatarImgId": 109951163729870420,
        "avatarImgIdStr": "109951163729870413",
        "expertTags": null,
        "authStatus": 0,
        "userType": 0,
        "experts": {},
        "mutual": false,
        "remarkName": null,
        "backgroundImgIdStr": "109951163848526350",
        "followed": false,
        "backgroundUrl": "http://p3.music.126.net/2XWRhBP28ZDWkZpU7BO_gg==/109951163848526350.jpg",
        "detailDescription": "",
        "description": "",
        "defaultAvatar": false,
        "province": 440000,
        "userId": 448205058,
        "vipType": 11,
        "gender": 1,
        "accountStatus": 0,
        "avatarUrl": "https://p3.music.126.net/7cquopgesxsAn_fKJx7UXQ==/109951163729870413.jpg",
        "signature": "",
        "authority": 0,
        "avatarImgId_str": "109951163729870413",
        "followeds": 3,
        "follows": 5,
        "eventCount": 0,
        "avatarDetail": null,
        "playlistCount": 4,
        "playlistBeSubscribedCount": 0
      },
      "bindings": [{
        "tokenJsonStr": "{\"countrycode\":\"\",\"cellphone\":\"13631923739\",\"hasPassword\":true}",
        "refreshTime": 1490955286,
        "expired": false,
        "userId": 448205058,
        "url": "",
        "expiresIn": 2147483647,
        "bindingTime": 1490955286083,
        "id": 3000117167,
        "type": 1
      }, {
        "tokenJsonStr": "{\"uid\":\"2876016722\",\"expires_in\":2603818,\"access_token\":\"2.00U1TdID0Gg461d7b8d8a0f52l73LD\",\"id\":2876016722,\"idstr\":\"2876016722\",\"class\":1,\"screen_name\":\"潜_3\",\"name\":\"潜_3\",\"province\":\"44\",\"city\":\"13\",\"location\":\"广东 惠州\",\"url\":\"\",\"profile_image_url\":\"http://tva3.sinaimg.cn/crop.0.0.720.720.50/ab6c8852jw8f2rvii52y5j20k00k0act.jpg\",\"cover_image_phone\":\"http://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg\",\"profile_url\":\"u/2876016722\",\"domain\":\"\",\"weihao\":\"\",\"gender\":\"m\",\"followers_count\":66,\"friends_count\":37,\"pagefriends_count\":1,\"statuses_count\":12,\"video_status_count\":0,\"favourites_count\":0,\"created_at\":\"Sat Jul 21 12:23:36 +0800 2012\",\"following\":false,\"allow_all_act_msg\":false,\"geo_enabled\":true,\"verified\":false,\"verified_type\":-1,\"remark\":\"\",\"insecurity\":{\"sexual_content\":false},\"ptype\":0,\"allow_all_comment\":true,\"avatar_large\":\"http://tva3.sinaimg.cn/crop.0.0.720.720.180/ab6c8852jw8f2rvii52y5j20k00k0act.jpg\",\"avatar_hd\":\"http://tva3.sinaimg.cn/crop.0.0.720.720.1024/ab6c8852jw8f2rvii52y5j20k00k0act.jpg\",\"verified_reason\":\"\",\"verified_trade\":\"\",\"verified_reason_url\":\"\",\"verified_source\":\"\",\"verified_source_url\":\"\",\"follow_me\":false,\"like\":false,\"like_me\":false,\"online_status\":0,\"bi_followers_count\":2,\"lang\":\"zh-cn\",\"star\":0,\"mbtype\":0,\"mbrank\":0,\"block_word\":0,\"block_app\":0,\"credit_score\":80,\"user_ability\":33555456,\"urank\":5,\"story_read_state\":-1,\"vclub_member\":0,\"is_teenager\":0,\"is_guardian\":0,\"is_teenager_list\":0,\"description\":\"\",\"status\":{\"created_at\":\"Tue Nov 06 20:21:48 +0800 2018\",\"id\":4303454241219203,\"idstr\":\"4303454241219203\",\"mid\":\"4303454241219203\",\"can_edit\":false,\"show_additional_indication\":0,\"text\":\"Ig牛逼！\",\"source_allowclick\":0,\"source_type\":2,\"source\":\"<a href=\\\"http://weibo.com/\\\" rel=\\\"nofollow\\\">iPhone客户端</a>\",\"favorited\":false,\"truncated\":false,\"in_reply_to_status_id\":\"\",\"in_reply_to_user_id\":\"\",\"in_reply_to_screen_name\":\"\",\"pic_urls\":[],\"geo\":null,\"is_paid\":false,\"mblog_vip_type\":0,\"annotations\":[{\"mapi_request\":true}],\"reposts_count\":0,\"comments_count\":0,\"attitudes_count\":0,\"pending_approval_count\":0,\"isLongText\":false,\"reward_exhibition_type\":0,\"hide_flag\":0,\"mlevel\":0,\"visible\":{\"type\":0,\"list_id\":0},\"biz_feature\":0,\"hasActionTypeCard\":0,\"darwin_tags\":[],\"hot_weibo_tags\":[],\"text_tag_tips\":[],\"mblogtype\":0,\"rid\":\"0\",\"userType\":0,\"more_info_type\":0,\"positive_recom_flag\":0,\"content_auth\":0,\"gif_ids\":\"\",\"is_show_bulletin\":2,\"comment_manage_info\":{\"comment_permission_type\":-1,\"approval_comment_type\":0}}}",
        "refreshTime": 1552193143,
        "expired": true,
        "userId": 448205058,
        "url": "http://weibo.com/u/2876016722",
        "expiresIn": 2603818,
        "bindingTime": 1549640582609,
        "id": 6794436327,
        "type": 2
      }, {
        "tokenJsonStr": "{\"access_token\":\"F16EB72658F0D1BEB6F92EDAAFAF6F5A\",\"refresh_token\":\"808B9C9506D162687A666BBCA7AC5898\",\"unionid\":\"UID_BDFC16EC1A43DF674395A78CB9FACD5A\",\"openid\":\"086D7D2BA29530E72239A20812BE934D\",\"nickname\":\"潜の缘\",\"expires_in\":7776000}",
        "refreshTime": 1544943173,
        "expired": true,
        "userId": 448205058,
        "url": "",
        "expiresIn": 7776000,
        "bindingTime": 1544943173390,
        "id": 6752642005,
        "type": 5
      }, {
        "tokenJsonStr": "{\"access_token\":\"18_8KNtSGFOxJmZJ-XIJoVP_Osy47oYzvs0kxaYFHlSgCHQ3GLFxIMrz3umdB4ZWIsl4KGNZP9q4ILfDWOq0YxMKuA84T0ej-TiK0d0VnDargY\",\"refresh_token\":\"18_ZqZwcQ29LdbYgNraprKDlMnlSFAxzghJ9issKv6lqF3o7UJGu1xvPplJuLFuqJFhNfv8Yy9hlPygomFRmBuEQuhRd1Ba9TKmtPP2Vv3qyHk\",\"unionid\":\"oZoefuEuWUkjNfEzfMXXmipA5Nu8\",\"openid\":\"okvmMju4_8mQX6l0MBFIVIkxItpM\",\"scope\":\"snsapi_userinfo\",\"name\":\"潜(⊙o⊙)…\",\"nickname\":\"潜(⊙o⊙)…\",\"expires_in\":7200}",
        "refreshTime": 1549640570,
        "expired": true,
        "userId": 448205058,
        "url": "",
        "expiresIn": 7200,
        "bindingTime": 1549640570044,
        "id": 6794518762,
        "type": 10
      }],
      "cookie": "__remember_me=true; Max-Age=1296000; Expires=Fri, 12 Mar 2021 13:49:10 GMT; Path=/;;MUSIC_U=db84b0c6c9ca26f9c284feca7c7b902a0bfc59249e16da2a8ae63cf898c79dad33a649814e309366; Max-Age=1296000; Expires=Fri, 12 Mar 2021 13:49:10 GMT; Path=/;;__csrf=f10bcc01c768fff625f4758ba9412589; Max-Age=1296010; Expires=Fri, 12 Mar 2021 13:49:20 GMT; Path=/;;NMTID=00O76x__F18BgbMLEEEhHG3uHdo6P0AAAF32XNUjg; Max-Age=315360000; Expires=Sun, 23 Feb 2031 13:49:10 GMT; Path=/;"
    }
    if (res.code) {
      setLocalStorage('loginInfo', res)
      dispatch(setLoginInfo(res))
      close()
      return
    }*/
    let isCheckObj = {
      [password.length < 5]: '请输入正确的账号密码',
      [!/^[1][3456789][0-9]{9}$/.test(phone)]: '请输入正确的手机号码',
      [phone.length !== 11]: '请输入正确的手机号码'
    }
    if (isCheckObj[true]) {
      showToast(isCheckObj[true])
      return
    }
    // console.log(phone, password);
    try {
      let res = await getLoginData(phone, password)
      if (res?.code === 200) {
        setLocalStorage('loginInfo', res)
        dispatch(setLoginInfo(res))
        close()
      } else {
        showToast('账号或密码错误，请重试')
      }
    } catch (e) {
      showToast('登录异常，请稍后重试')
    }
  }

  function close() {
    props.close()
  }

  return (
    <div className="login-container">
      <p className="login-top flex-between-center">
        <span onClick={close}>く</span>
        登录
        <span>
        </span>
      </p>
      <div className="input-login-ctx">
        <p>登录体验更多精彩-仅支持账号密码登录</p>
        <p className="input-login-div">
          <input type="tel" maxLength={11}
                 name={'phone'} value={phone}
                 onChange={e => changeInput(e)}
                 placeholder="请输入手机号码"/>
        </p>
        <p className="input-login-div">
          <input type="password" maxLength={20}
                 name={'password'} value={password}
                 onChange={e => changeInput(e)}
                 placeholder="请输入账号密码"/>
        </p>
        {/* login-btn */}
        <p className={`input-login-btn 
          ${phone.length === 11 &&
        password.length > 5 ? 'active' : ''}`}
           onClick={() => login()}>
          登 录
        </p>
      </div>
    </div>
  );
}

export default memo(Login);
