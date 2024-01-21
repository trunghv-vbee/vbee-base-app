import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from 'assets/colors';
import TextBase from 'components/TextBase';

interface FooterProps {
  title?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <TextBase size={12} center={true} color={colors.white64} marginBottom={30}>
      {props?.title || '2023 © MOBIVA'}
    </TextBase>
  );
};

export default Footer;
