import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Container from 'components/Layout/Container';
import ButtonText from 'components/Button/ButtonText';
import colors from 'assets/colors';
import TextBase from 'components/TextBase';
import strings from 'assets/strings';
import Image from 'components/Image';
import images from 'assets/images';
import stylesCommon from 'assets/stylesCommon';
import TextInputBase from 'components/TextInputBase';
import ButtonIcon from 'components/Button/ButtonIcon';
import {Dropdown} from 'react-native-element-dropdown';
import scale from 'utils/scale';
import {onLogout} from 'middleware/actions/persist/AuthAction';
import Routes from 'navigation/service/Routes';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {MainParamList} from 'navigation/service/NavigationParams';
import {useAppDispatch} from 'middleware/stores';

interface ProfileScreenProps {}

const ProfileScreen = (props: ProfileScreenProps) => {
  const [state, setState] = useState();
  const navigation = useNavigation<NavigationProp<MainParamList>>();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(onLogout());
    navigation.navigate(Routes.WelcomeScreen, {});
  };
  const renderIconRight = () => {
    return (
      <Image
        source={images.ic_dropdown}
        style={{resizeMode: 'contain', height: 12, width: 12}}
      />
    );
  };
  return (
    <Container
      isHideFooter={true}
      showHeaderHome={true}
      renderTitle={() => {
        return (
          <TextBase color={colors.white} size={20} fontWeight={'500'}>
            {strings.myProfile}
          </TextBase>
        );
      }}
      buttonRight={
        <ButtonText
          title={'Lưu'}
          backgroundColor={colors.white32}
          titleColor={colors.primary}
          textProps={{fontWeight: '600'}}
        />
      }
      style={styles.container}>
      <View style={[{alignItems: 'center'}, stylesCommon.flex1]}>
        <TouchableOpacity style={{marginTop: 30}}>
          <Image source={images.ic_avatar} />
        </TouchableOpacity>
        <TextInputBase
          containerStyle={{marginLeft: 20, marginTop: 16}}
          placeholder={'Nhập tên thường gọi'}
          inputStyle={{
            minWidth: '50%',
            maxWidth: '80%',
            textAlign: 'center',
            fontSize: 20,
          }}
          selectionColor={colors.white}
          iconRight={images.ic_edit}
          isShowIconRight={true}
        />
        <TextBase color={colors.white} size={16} lineHeight={24}>
          0987654321
        </TextBase>
        <View
          style={[
            stylesCommon.flexRow,
            {paddingHorizontal: 16, marginTop: 16},
          ]}>
          <Dropdown
            style={[styles.containerSelected]}
            selectedTextStyle={styles.selectedItem}
            containerStyle={{borderRadius: 4}}
            itemTextStyle={{color: colors.text}}
            placeholderStyle={styles.selectedItem}
            renderRightIcon={renderIconRight}
            onChange={() => {}}
            data={[
              {
                value: '1',
                label: 'Nam',
              },
              {
                value: '0',
                label: 'Nữ',
              },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={strings.gender}
          />
          <Dropdown
            style={[styles.containerSelected, stylesCommon.ml16]}
            selectedTextStyle={styles.selectedItem}
            containerStyle={{borderRadius: 4}}
            itemTextStyle={{color: colors.text}}
            placeholderStyle={styles.selectedItem}
            renderRightIcon={renderIconRight}
            onChange={() => {}}
            data={[
              {
                value: '1',
                label: 'Nam',
              },
              {
                value: '0',
                label: 'Nữ',
              },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={strings.name}
          />
        </View>
      </View>
      <ButtonText
        backgroundColor={colors.white16}
        titleColor={colors.white}
        title={strings.logout}
        style={{marginHorizontal: 16, marginBottom: 30}}
        onPress={logout}
        height={48}
      />
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {},
  error: {borderColor: colors.red, borderWidth: 2},
  containerSelected: {
    backgroundColor: colors.white08,
    borderRadius: 12,
    borderColor: colors.white16,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    flex: 1,
  },
  selectedItem: {color: colors.white, fontSize: scale(16)},
});
