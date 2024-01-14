import {DrawerItem} from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerNavigationState, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {memo, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import colors from 'assets/colors';
import images from 'assets/images';
import strings from 'assets/strings';
import Routes from 'navigation/service/Routes';
import scale from 'utils/scale';

export interface MenuProps {
  isExpanded?: boolean;
  category_name: string;
  subcategory?: MenuProps[];
  isSubMenu?: boolean;
  icon: ImageSourcePropType;
  route?: string;
}
type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};
interface ExpandableItemComponentProps extends Props {
  item: MenuProps;
  onPress: () => void;
}
export const ExpandableItemComponent = memo(
  ({item, onPress, ...props}: ExpandableItemComponentProps) => {
    const onPressRoute = (itemSub: MenuProps | null) => () => {
      props.navigation.closeDrawer();

      !!itemSub?.route && props.navigation.navigate(itemSub.route);
    };
    const onPressMenu = () => {
      if (item.isSubMenu) {
        onPress && onPress();
      } else {
        onPressRoute(item)();
      }
    };
    const renderIcon = ({}) => (
      <Image
        source={item.icon}
        style={[styles.icon, {tintColor: colors.black}]}
      />
    );
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <DrawerItem
          label={item.category_name}
          icon={renderIcon}
          // focused={true}
          onPress={onPressMenu}
          style={styles.labelStyle}
          labelStyle={styles.textLabelStyle}
          {...props}
        />
        <View style={[styles.containerContent]}>
          {/*Content under the header of the Expandable List Item*/}
          {item?.isExpanded &&
            !!item.isSubMenu &&
            item?.subcategory?.map((itemDrawer, key) => (
              <DrawerItem
                {...props}
                key={key}
                label={itemDrawer.category_name}
                labelStyle={styles.labelSub}
                onPress={onPressRoute(itemDrawer)}
              />
            ))}
        </View>
      </View>
    );
  },
);

const ExpandableViewSeparate = (props: Props) => {
  const [listDataSource, setListDataSource] = useState<MenuProps[]>([
    {
      category_name: strings.home,
      route: Routes.HomeScreen,
      icon: images.ic_home,
    },
  ]);
  //Main View defined under this Class
  React.useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const updateLayout = (index: number) => () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array[index].isExpanded = !array[index].isExpanded;
    setListDataSource(array);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {listDataSource.map((item, key) => (
          <ExpandableItemComponent
            key={item.category_name}
            onPress={updateLayout(key)}
            item={item}
            {...props}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default ExpandableViewSeparate;
const styles = StyleSheet.create({
  labelSub: {
    color: colors.black,
    paddingLeft: scale(30),
  },
  containerContent: {
    overflow: 'hidden',
  },
  textLabelStyle: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 18,
  },
  labelStyle: {
    borderBottomColor: colors.white,
    borderBottomWidth: 0.2,
  },
  icon: {
    width: scale(32),
    height: scale(32),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: colors.black,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
