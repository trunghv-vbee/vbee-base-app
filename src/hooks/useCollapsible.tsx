import React from 'react';

export function useCollapsible(show?: boolean) {
  const [isShow, setIsShow] = React.useState<boolean>(show || false);

  const onPress = () => {
    setIsShow(preIsShow => !preIsShow);
  };

  return {
    onPress,
    isShow,
  };
}
