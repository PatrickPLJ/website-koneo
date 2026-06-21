import { menuImgUrl } from '../utils/imgUrl'

export default function KoneoLogo() {
  return (
    <div className="koneo-logo-wrap">
      <img
        src={menuImgUrl('/logo-mascot-v2.png')}
        alt="Koneo mascot logo"
        className="koneo-logo-img"
      />
    </div>
  )
}
