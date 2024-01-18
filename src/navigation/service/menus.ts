import strings from 'assets/strings';
import Routes from 'navigation/service/Routes';
import images from 'assets/images';
import {MenuProps} from 'components/Layout/SideBar/ExpandableViewSeparate';
import HomeScreen from 'screens/home/HomeScreen';
import IntroduceScreen from 'screens/introduce/IntroduceScreen';
import GuideScreen from 'screens/guide/GuideScreen';
import TermsAndPoliciesScreen from 'screens/policies/TermsAndPoliciesScreen';

const menus: MenuProps[] = [
  {
    category_name: strings.home,
    route: Routes.HomeScreen,
    icon: images.ic_home,
    component: HomeScreen,
  },
  {
    category_name: strings.introduce,
    route: Routes.IntroduceScreen,
    icon: images.ic_info,
    component: IntroduceScreen,
    isOpacity: true,
  },
  {
    category_name: strings.guide,
    route: Routes.GuideScreen,
    icon: images.ic_book,
    component: GuideScreen,
    isOpacity: true,
  },
  {
    category_name: strings.tempsAndPolicies,
    route: Routes.TermsAndPoliciesScreen,
    icon: images.ic_policy,
    component: TermsAndPoliciesScreen,
    isOpacity: true,
  },
];

export default menus;
