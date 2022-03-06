import { Asset } from 'expo-asset'

// svg
import Logo from '../../assets/images/logo.svg'
// Tab bar icons
const Home = require('../../assets/images/icons/tab-icon/Home.svg')
import Home1 from '../../assets/images/icons/tab-icon/Home-1.svg'
import Star from '../../assets/images/icons/tab-icon/Star.svg'
import Star1 from '../../assets/images/icons/tab-icon/Star-1.svg'
import Cart from '../../assets/images/icons/tab-icon/Buy.svg'
import Cart1 from '../../assets/images/icons/tab-icon/Buy-1.svg'
import Discovery from '../../assets/images/icons/tab-icon/Discovery.svg'
import Discovery1 from '../../assets/images/icons/tab-icon/Discovery-1.svg'
import Profile from '../../assets/images/icons/tab-icon/Profile.svg'
import Profile1 from '../../assets/images/icons/tab-icon/Profile-1.svg'
// Auth Form icons
import User from '../../assets/images/icons/auth-icon/Profile.svg'
import Lock from '../../assets/images/icons/auth-icon/Lock.svg'
import Email from '../../assets/images/icons/auth-icon/email.svg'

export const svgs = {
  logo: Logo,
  tabBarIcons: {
    Home,
    Home1,
    Cart,
    Cart1,
    Profile,
    Profile1,
  },
}

// png/jpeg
export const images = {
  logo_sm: require('../../assets/images/logo-sm.png'),
  logo_lg: require('../../assets/images/logo-lg.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key]).downloadAsync(),
)
