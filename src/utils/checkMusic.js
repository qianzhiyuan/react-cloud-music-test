export const checkMusic = (t) => { // return true/false 可以播放/不可以播放
  // 版权方要求，该歌曲仅能通过网易云音乐APP播放
  if (t.st === -300) {
    return false
  }
  if (t.fee === 4) {
    if (t.payed === 0) { // 购买
      return false;
    }
    // 版权方要求，该歌曲须下载后播放 => (t.payed > 0 && (2048 & t.flag) > 0)
    return !(t.payed > 0 && (2048 & t.flag) > 0);
  }
  if (t.fee > 0 && t.pl === 0) { // 会员
    return true;
  }
  // 唱片公司要求该歌曲须付费，打开网易云音乐购买后即可自由畅享
  if (t.fee > 0 && t.fee !== 8 && t.fee !== 32 && t.pl <= 0) {
    return false
  }
  // 由于版权保护，您所在的地区暂时无法使用 => (t.pl <= 0)
  return t.pl > 0;
}
